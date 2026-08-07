import React, { useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetStats } from "@/services/apiService";
import { getSortedBatches, batchToShortFormat } from "@/utils/batchUtils";
import { StatCard } from "./components/StatCard";
import { BarChart } from "./components/BarChart";
import { ProgressBarChart } from "./components/ProgressBarChart";
import { StackedBarChart } from "./components/StackedBarChart";
import { Colors, Responsive } from "@/theme";
import styles from "./styles";

export default function BatchesAnalyticsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: stats, isLoading, isError } = useGetStats();

  const sortedBatches = useMemo(() => {
    return stats?.by_batch ? getSortedBatches(stats.by_batch) : [];
  }, [stats?.by_batch]);

  const batchStats = useMemo(() => {
    if (!sortedBatches.length) return null;

    const totalCompanies = sortedBatches.reduce((sum, b) => sum + b.count, 0);
    const avgBatchSize = Math.round(totalCompanies / sortedBatches.length);
    const largestBatch = sortedBatches.reduce(
      (max, b) => (b.count > max.count ? b : max),
      sortedBatches[0],
    );
    const smallestBatch = sortedBatches.reduce(
      (min, b) => (b.count < min.count ? b : min),
      sortedBatches[0],
    );

    const oldestBatch = sortedBatches[sortedBatches.length - 1];
    const newestBatch = sortedBatches[0];
    const growthRate =
      oldestBatch.count > 0
        ? ((newestBatch.count - oldestBatch.count) / oldestBatch.count) * 100
        : 0;

    return {
      totalBatches: sortedBatches.length,
      totalCompanies,
      avgBatchSize,
      largestBatch,
      smallestBatch,
      growthRate,
    };
  }, [sortedBatches]);

  const chartData = useMemo(() => {
    // Show oldest to newest
    return [...sortedBatches]
      .reverse()
      .map((b) => ({ label: batchToShortFormat(b.name), value: b.count }));
  }, [sortedBatches]);

  const maxBatchSize =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;

  const industryTrends = useMemo(() => {
    if (!stats?.by_industry) return [];
    return Object.entries(stats.by_industry)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([industry, count]) => ({ name: industry, value: count as number }));
  }, [stats?.by_industry]);

  const maxIndustryValue =
    industryTrends.length > 0
      ? Math.max(...industryTrends.map((i) => i.value))
      : 0;

  const countryTrends = useMemo(() => {
    if (!stats?.by_country) return [];
    return Object.entries(stats.by_country)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([country, count]) => ({ name: country, value: count as number }));
  }, [stats?.by_country]);

  const maxCountryValue =
    countryTrends.length > 0
      ? Math.max(...countryTrends.map((c) => c.value))
      : 0;

  const industryMixData = useMemo(() => {
    if (!stats?.by_batch_industry || !sortedBatches.length) return [];

    const INDUSTRY_COLORS = [
      "#FB651E",
      "#3B82F6",
      "#8B5CF6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#06B6D4",
      "#EC4899",
      "#84CC16",
      "#F97316",
      "#6366F1",
      "#14B8A6",
      "#E11D48",
      "#A855F7",
      "#0EA5E9",
      "#D946EF",
      "#22C55E",
      "#FACC15",
      "#64748B",
      "#78716C",
    ];

    // get all unique industries across all batches
    const allIndustries = new Set<string>();
    Object.values(stats.by_batch_industry).forEach((industries: any) => {
      Object.keys(industries).forEach((ind) => allIndustries.add(ind));
    });

    const allIndustriesArray = Array.from(allIndustries);
    const colorMap: Record<string, string> = {};
    allIndustriesArray.forEach((ind, i) => {
      colorMap[ind] = INDUSTRY_COLORS[i % INDUSTRY_COLORS.length];
    });

    // We'll show the top 8 recent batches for mobile layout
    return sortedBatches.slice(0, 8).map((batch) => {
      const industries = (stats.by_batch_industry as any)[batch.name] || {};

      const segments = Object.entries(industries).map(([key, value]) => ({
        key,
        value: value as number,
        color: colorMap[key],
      }));

      // Sort segments by value descending
      segments.sort((a, b) => b.value - a.value);

      return {
        label: batchToShortFormat(batch.name),
        segments,
      };
    });
  }, [stats?.by_batch_industry, sortedBatches]);

  if (isLoading || !batchStats) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.appColors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading batch analytics data.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + Responsive.heightPercentageToDP(2) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={Responsive.convertFontScale(16)}
          color={Colors.appColors.grayMuted}
        />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>All Batches Analytics</Text>
        <Text style={styles.subtitle}>
          Comprehensive trends and insights across all YC batches
        </Text>
      </View>

      <Animated.View
        style={styles.statsGrid}
        entering={FadeInDown.delay(100).springify()}
      >
        <View style={styles.statCardWrapper}>
          <StatCard
            title="batches"
            value={batchStats.totalBatches}
            iconName="calendar"
            color={Colors.defaults.ORANGE}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="avg size"
            value={batchStats.avgBatchSize}
            iconName="people"
            color={Colors.appColors.brandBlue}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="growth"
            value={`${batchStats.growthRate > 0 ? "+" : ""}${batchStats.growthRate.toFixed(1)}%`}
            iconName="trending-up"
            color={Colors.defaults.GREEN}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="largest"
            value={batchStats.largestBatch.count}
            iconName="business"
            color={Colors.defaults.PURPLE}
          />
        </View>
      </Animated.View>

      {/* Batch Size Evolution Chart */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(200).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="trending-up"
            size={18}
            color={Colors.defaults.ORANGE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Batch Size Evolution</Text>
        </View>
        {/* Render a subset if there are too many batches to fit on mobile */}
        <BarChart
          data={chartData.slice(-15)}
          maxValue={maxBatchSize}
          color={Colors.defaults.ORANGE}
          height={Responsive.heightPercentageToDP(18)}
        />
        <Text
          style={[
            styles.commandText,
            { marginTop: Responsive.heightPercentageToDP(2) },
          ]}
        >
          &gt; Range: {batchStats.smallestBatch.count} -{" "}
          {batchStats.largestBatch.count} companies
        </Text>
      </Animated.View>

      {/* Top Industries */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(300).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="briefcase"
            size={18}
            color={Colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Industries</Text>
        </View>
        <ProgressBarChart
          data={industryTrends}
          maxValue={maxIndustryValue}
          color={Colors.appColors.brandBlue}
        />
      </Animated.View>

      {/* Top Countries */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(400).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="earth"
            size={18}
            color={Colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Countries</Text>
        </View>
        <ProgressBarChart
          data={countryTrends}
          maxValue={maxCountryValue}
          color={Colors.defaults.PURPLE}
        />
      </Animated.View>

      {/* Industry Mix by Batch */}
      {industryMixData.length > 0 && (
        <Animated.View
          style={styles.card}
          entering={FadeInDown.delay(500).springify()}
        >
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="layers"
              size={18}
              color={Colors.appColors.brandBlue}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Industry Mix by Batch</Text>
            <Text
              style={[
                styles.subtitle,
                {
                  marginLeft: "auto",
                  fontSize: Responsive.convertFontScale(10),
                },
              ]}
            >
              recent 8
            </Text>
          </View>
          <StackedBarChart data={industryMixData} />
        </Animated.View>
      )}

      {/* Complete Batch History */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(600).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="calendar"
            size={18}
            color={Colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Complete Batch History</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>#</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>batch</Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1.5, textAlign: "right" }]}
          >
            companies
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}
          >
            %
          </Text>
        </View>

        {sortedBatches.map((batch, index) => {
          const percentage = (
            (batch.count / batchStats.totalCompanies) *
            100
          ).toFixed(1);
          return (
            <View key={batch.name} style={styles.tableRow}>
              <Text
                style={[
                  styles.tableRowText,
                  { flex: 0.5, color: Colors.appColors.grayMuted },
                ]}
              >
                {index + 1}
              </Text>
              <Text style={[styles.tableRowText, { flex: 1 }]}>
                {batchToShortFormat(batch.name)}
              </Text>
              <Text
                style={[styles.tableRowText, { flex: 1.5, textAlign: "right" }]}
              >
                {batch.count.toLocaleString()}
              </Text>
              <Text
                style={[
                  styles.tableRowText,
                  {
                    flex: 1,
                    textAlign: "right",
                    color: Colors.appColors.grayMuted,
                  },
                ]}
              >
                {percentage}%
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </ScrollView>
  );
}
