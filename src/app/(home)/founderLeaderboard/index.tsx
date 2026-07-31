import { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors } from "@/theme";
import { getAvatarTheme } from "@/utils/common";
import { useGetFoundersLeaderboardInfinite } from "@/services/apiService";
import { BASE_URL } from "@/network/config";
import { Ionicons } from "@expo/vector-icons";

const getImageUrl = (url?: string) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return BASE_URL.replace("/api", "") + url;
};

const METRICS = [
  { id: "funded", label: "Top Funded" },
  { id: "serial", label: "Serial Founders" },
  { id: "exits", label: "Top Exits" },
  { id: "unicorns", label: "Unicorns" },
];

export default function FounderLeaderboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedMetric, setSelectedMetric] = useState("funded");

  const queryPayload = useMemo(() => {
    return {
      limit: 15,
      metric: selectedMetric,
    };
  }, [selectedMetric]);

  const {
    data: leaderboardData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetFoundersLeaderboardInfinite(queryPayload);

  const foundersList = useMemo(() => {
    return leaderboardData?.pages?.flatMap((page: any) => page.results) || [];
  }, [leaderboardData]);

  const renderFilterCard = ({ item: metric }: { item: any }) => {
    return (
      <Pressable
        style={[
          styles.proFilterPill,
          selectedMetric === metric.id && styles.proFilterPillActive,
        ]}
        onPress={() => setSelectedMetric(metric.id)}
      >
        <Text
          style={[
            styles.proFilterPillText,
            selectedMetric === metric.id && styles.proFilterPillTextActive,
          ]}
        >
          {metric.label}
        </Text>
      </Pressable>
    );
  };

  const renderFounderCard = ({ item, index }: { item: any; index: number }) => {
    const { founder, rank, headline_stat } = item;
    const name = founder?.full_name || "Unknown";
    const title = founder?.title || "";
    const avatarUrl = getImageUrl(founder?.avatar_url);
    const avatarTheme = getAvatarTheme(name);

    let badgeColor = Colors.appColors.primary;
    if (rank === 1) badgeColor = "#FFD700";
    else if (rank === 2) badgeColor = "#C0C0C0";
    else if (rank === 3) badgeColor = "#CD7F32";

    return (
      <Pressable
        style={styles.proFounderCard}
        onPress={() => {
          if (founder?.slug) {
            router.push({
              pathname: "/(home)/founderDetails",
              params: { slug: founder.slug },
            });
          }
        }}
      >
        <View style={[styles.proRankBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.proRankText}>{rank}</Text>
        </View>

        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <Text
            style={[
              styles.avatarInitial,
              {
                color: avatarTheme.text,
                backgroundColor: avatarTheme.background,
              },
            ]}
          >
            {name.charAt(0).toUpperCase()}
          </Text>
        )}

        <View style={styles.founderInfo}>
          <Text style={styles.founderName} numberOfLines={1}>
            {name}
          </Text>
          {title ? (
            <Text style={styles.founderTitle} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>

        {headline_stat && (
          <View style={styles.proStatContainer}>
            <Text style={styles.proStatValue} numberOfLines={1}>
              {headline_stat.value}
            </Text>
            <Text style={styles.proStatLabel} numberOfLines={2}>
              {headline_stat.label}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={Colors.appColors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.proEmptyContainer}>
          <ActivityIndicator size="large" color={Colors.appColors.primary} />
        </View>
      );
    }
    return (
      <View style={styles.proEmptyContainer}>
        <View style={styles.proEmptyIconWrapper}>
          <Ionicons name="search" size={40} color={Colors.appColors.primary} />
        </View>
        <Text style={styles.proEmptyTitle}>No Founders Found</Text>
        <Text style={styles.proEmptySub}>
          We couldn't find any founders matching the current criteria. Try
          selecting a different filter.
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Founders</Text>
          <Text style={styles.headerSub}>Leaderboard</Text>
        </View>
      </View>

      {/* Metrics Filter */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
          data={METRICS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFilterCard}
        />
      </View>

      {/* List */}
      <FlatList
        data={foundersList}
        renderItem={renderFounderCard}
        keyExtractor={(item, idx) => `founder-${item?.founder?.id || idx}`}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
