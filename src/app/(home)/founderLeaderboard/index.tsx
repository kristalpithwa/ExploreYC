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
import { Ionicons } from "@expo/vector-icons";
import { Responsive } from "@/theme";

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

  const renderFounderCard = ({ item, index }: { item: any; index: number }) => {
    const { founder, rank, highlight_stat } = item;
    const name = founder?.full_name || "Unknown";
    const title = founder?.title || "";
    const avatarUrl = founder?.avatar_url;
    const avatarTheme = getAvatarTheme(name);

    return (
      <Pressable
        style={styles.founderCard}
        onPress={() => {
          if (founder?.slug) {
            router.push({
              pathname: "/(home)/founderDetails",
              params: { slug: founder.slug },
            });
          }
        }}
      >
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{rank}</Text>
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
          <View style={styles.founderStatPill}>
            <Text style={styles.founderStatText}>{highlight_stat}</Text>
          </View>
        </View>
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
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.appColors.primary} />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No founders found.</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {METRICS.map((metric) => (
            <Pressable
              key={metric.id}
              style={[
                styles.filterPill,
                selectedMetric === metric.id && styles.filterPillActive,
              ]}
              onPress={() => setSelectedMetric(metric.id)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedMetric === metric.id && styles.filterPillTextActive,
                ]}
              >
                {metric.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
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
