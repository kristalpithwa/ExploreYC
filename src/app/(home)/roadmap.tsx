import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors, Fonts, Responsive } from "@/theme";
import { ROADMAP_FEATURES, RoadmapFeature } from "@/types/roadmap";
import {
  useGetRoadmapVotes,
  useGetUserVotes,
  useVoteRoadmapFeature,
  useUnvoteRoadmapFeature,
} from "@/services/apiService";

// Generate a random user ID for this session since we don't have persistent auth yet
const SESSION_USER_ID = `user-${Math.random().toString(36).substring(2, 9)}`;

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  shipped: { label: "Shipped", color: Colors.appColors.success, icon: "checkmark-circle" },
  "in-progress": { label: "In Progress", color: Colors.defaults.BLUE, icon: "time" },
  planned: { label: "Planned", color: Colors.defaults.ORANGE, icon: "rocket" },
  "under-consideration": { label: "Considering", color: Colors.appColors.grayDark, icon: "bulb" },
};

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  viral: { label: "Viral Growth", color: "#DB2777", icon: "trending-up" },
  engagement: { label: "Engagement", color: "#9333EA", icon: "people" },
  data: { label: "Data & Insights", color: "#2563EB", icon: "bar-chart" },
  tools: { label: "Founder Tools", color: "#059669", icon: "briefcase" },
};

export default function RoadmapScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [filter, setFilter] = useState<"all" | RoadmapFeature["status"]>("all");
  const [sortBy, setSortBy] = useState<"votes" | "priority">("votes");
  const [pendingFeatureId, setPendingFeatureId] = useState<string | null>(null);

  // Queries
  const { data: votesData, isLoading: isLoadingVotes } = useGetRoadmapVotes();
  const { data: userVotesData } = useGetUserVotes(SESSION_USER_ID);

  const votes = votesData || {};
  const userVotes = userVotesData || new Set<string>();

  // Mutations
  const { mutate: voteMutation } = useVoteRoadmapFeature();
  const { mutate: unvoteMutation } = useUnvoteRoadmapFeature();

  const handleVote = useCallback(
    (featureId: string) => {
      if (pendingFeatureId) return;

      const hasVoted = userVotes.has(featureId);
      setPendingFeatureId(featureId);

      // Optimistic update
      queryClient.setQueryData(["roadmap-votes"], (old: any) => ({
        ...old,
        [featureId]: hasVoted ? Math.max(0, (old?.[featureId] || 0) - 1) : (old?.[featureId] || 0) + 1,
      }));

      queryClient.setQueryData(["roadmap-user-votes", SESSION_USER_ID], (old: any) => {
        const next = new Set(old || []);
        if (hasVoted) next.delete(featureId);
        else next.add(featureId);
        return next;
      });

      const mutation = hasVoted ? unvoteMutation : voteMutation;
      
      mutation(
        { featureId, userIdentifier: SESSION_USER_ID },
        {
          onSettled: () => {
            setPendingFeatureId(null);
            queryClient.invalidateQueries({ queryKey: ["roadmap-votes"] });
            queryClient.invalidateQueries({ queryKey: ["roadmap-user-votes", SESSION_USER_ID] });
          },
        }
      );
    },
    [pendingFeatureId, userVotes, queryClient, voteMutation, unvoteMutation]
  );

  const filteredAndSortedFeatures = useMemo(() => {
    let result = ROADMAP_FEATURES;
    
    if (filter !== "all") {
      result = result.filter((f) => f.status === filter);
    }

    return [...result].sort((a, b) => {
      if (sortBy === "votes") {
        return (votes[b.id] || 0) - (votes[a.id] || 0);
      }
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [filter, sortBy, votes]);

  const renderFilterChips = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.filterContainer}
      contentContainerStyle={styles.filterScroll}
    >
      <TouchableOpacity 
        style={[styles.chip, filter === "all" && styles.chipActive]}
        onPress={() => setFilter("all")}
      >
        <Text style={[styles.chipText, filter === "all" && styles.chipTextActive]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.chip, filter === "planned" && styles.chipActive]}
        onPress={() => setFilter("planned")}
      >
        <Text style={[styles.chipText, filter === "planned" && styles.chipTextActive]}>Planned</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.chip, filter === "in-progress" && styles.chipActive]}
        onPress={() => setFilter("in-progress")}
      >
        <Text style={[styles.chipText, filter === "in-progress" && styles.chipTextActive]}>In Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.chip, filter === "under-consideration" && styles.chipActive]}
        onPress={() => setFilter("under-consideration")}
      >
        <Text style={[styles.chipText, filter === "under-consideration" && styles.chipTextActive]}>Considering</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSortChips = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      <TouchableOpacity 
        style={[styles.sortChip, sortBy === "votes" && styles.sortChipActive]}
        onPress={() => setSortBy("votes")}
      >
        <Text style={[styles.sortChipText, sortBy === "votes" && styles.sortChipTextActive]}>Most Voted</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.sortChip, sortBy === "priority" && styles.sortChipActive]}
        onPress={() => setSortBy("priority")}
      >
        <Text style={[styles.sortChipText, sortBy === "priority" && styles.sortChipTextActive]}>Priority</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFeatureCard = ({ item, index }: { item: RoadmapFeature; index: number }) => {
    const hasVoted = userVotes.has(item.id);
    const voteCount = votes[item.id] || 0;
    const isPending = pendingFeatureId === item.id;
    const statusConfig = STATUS_CONFIG[item.status];
    const categoryConfig = CATEGORY_CONFIG[item.category];

    return (
      <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
        <View style={[styles.card, hasVoted && styles.cardVoted]}>
          <View style={styles.cardHeader}>
            <TouchableOpacity 
              style={[
                styles.voteButton, 
                hasVoted && styles.voteButtonActive,
                isPending && styles.voteButtonDisabled
              ]}
              onPress={() => handleVote(item.id)}
              disabled={isPending}
            >
              <Ionicons 
                name={hasVoted ? "chevron-up" : "chevron-up-outline"} 
                size={24} 
                color={hasVoted ? Colors.appColors.white : Colors.appColors.secondary} 
              />
              <Text style={[styles.voteCount, hasVoted && styles.voteCountActive]}>
                {voteCount}
              </Text>
            </TouchableOpacity>

            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              
              <View style={styles.badgeRow}>
                <View style={[styles.badge, { backgroundColor: statusConfig.color + "20" }]}>
                  <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} style={{ marginRight: 4 }} />
                  <Text style={[styles.badgeText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
                </View>
                {item.eta && (
                  <Text style={styles.etaText}>ETA: {item.eta}</Text>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.cardFooter}>
            <View style={styles.categoryBadge}>
              <Ionicons name={categoryConfig.icon} size={12} color={categoryConfig.color} style={{ marginRight: 4 }} />
              <Text style={[styles.categoryText, { color: categoryConfig.color }]}>{categoryConfig.label}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderStats = () => {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    const shipped = ROADMAP_FEATURES.filter(f => f.status === "shipped").length;
    const planned = ROADMAP_FEATURES.filter(f => f.status === "planned").length;
    
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Colors.appColors.success }]}>{shipped}</Text>
          <Text style={styles.statLabel}>Shipped</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Colors.defaults.ORANGE }]}>{planned}</Text>
          <Text style={styles.statLabel}>Planned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Colors.defaults.BLUE }]}>{totalVotes}</Text>
          <Text style={styles.statLabel}>Total Votes</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.appColors.secondary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>Product Roadmap</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.controlsSection}>
        {renderFilterChips()}
        {renderSortChips()}
      </View>

      {isLoadingVotes ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.defaults.ORANGE} />
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedFeatures}
          keyExtractor={(item) => item.id}
          renderItem={renderFeatureCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderStats}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  backButton: {
    padding: Responsive.widthPercentageToDP(2),
    marginLeft: -Responsive.widthPercentageToDP(2),
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  controlsSection: {
    backgroundColor: Colors.appColors.white,
    paddingBottom: Responsive.heightPercentageToDP(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  filterContainer: {
    // Removed maxHeight to prevent clipping
  },
  filterScroll: {
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    gap: 8,
  },
  chip: {
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1), // Increased padding
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    backgroundColor: Colors.appColors.white,
  },
  chipActive: {
    backgroundColor: Colors.defaults.ORANGE,
    borderColor: Colors.defaults.ORANGE,
  },
  chipText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.grayDark,
  },
  chipTextActive: {
    color: Colors.appColors.white,
    fontFamily: Fonts.semiBold,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    marginTop: Responsive.heightPercentageToDP(1),
    gap: 8,
  },
  sortLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  sortChip: {
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(0.8), // Increased padding
    borderRadius: 8,
    backgroundColor: Colors.opacityColors.blackOpacity4,
  },
  sortChipActive: {
    backgroundColor: Colors.defaults.ORANGE + "20", // 20% opacity
  },
  sortChipText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayDark,
  },
  sortChipTextActive: {
    color: Colors.defaults.ORANGE,
    fontFamily: Fonts.semiBold,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Responsive.heightPercentageToDP(10), // Adjust for bottom tab bar
  },
  listContent: {
    padding: Responsive.widthPercentageToDP(4),
    paddingBottom: Responsive.heightPercentageToDP(10),
  },
  card: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(4),
    padding: Responsive.widthPercentageToDP(4),
    marginBottom: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardVoted: {
    borderColor: Colors.defaults.ORANGE + "50",
    backgroundColor: Colors.defaults.ORANGE + "05", // Very light orange tint
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  voteButton: {
    width: Responsive.widthPercentageToDP(12),
    height: Responsive.heightPercentageToDP(7),
    backgroundColor: Colors.appColors.lightBackground,
    borderRadius: Responsive.widthPercentageToDP(3),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(3),
  },
  voteButtonActive: {
    backgroundColor: Colors.defaults.ORANGE,
    borderColor: Colors.defaults.ORANGE,
  },
  voteButtonDisabled: {
    opacity: 0.5,
  },
  voteCount: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
  },
  voteCountActive: {
    color: Colors.appColors.white,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(10),
    textTransform: "uppercase",
  },
  etaText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.grayDark,
    lineHeight: Responsive.convertFontScale(20),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.opacityColors.blackOpacity4,
    paddingTop: Responsive.heightPercentageToDP(1.5),
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(5),
    borderRadius: Responsive.widthPercentageToDP(4),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    marginTop: Responsive.heightPercentageToDP(2),
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(24),
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
});
