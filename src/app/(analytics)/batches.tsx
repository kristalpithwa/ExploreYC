import React, { useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGetStats } from "@/services/apiService";
import { getSortedBatches, batchToShortFormat } from "@/utils/batchUtils";
import { StatCard } from "./components/StatCard";
import { BarChart } from "./components/BarChart";
import { ProgressBarChart } from "./components/ProgressBarChart";
import { StackedBarChart } from "./components/StackedBarChart";
import colors from "@/theme/Colors";
import styles from "./styles";

export default function BatchesAnalyticsScreen() {
  const router = useRouter();
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
      sortedBatches[0]
    );
    const smallestBatch = sortedBatches.reduce(
      (min, b) => (b.count < min.count ? b : min),
      sortedBatches[0]
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
    industryTrends.length > 0 ? Math.max(...industryTrends.map((i) => i.value)) : 0;

  const countryTrends = useMemo(() => {
    if (!stats?.by_country) return [];
    return Object.entries(stats.by_country)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([country, count]) => ({ name: country, value: count as number }));
  }, [stats?.by_country]);
  const maxCountryValue =
    countryTrends.length > 0 ? Math.max(...countryTrends.map((c) => c.value)) : 0;

  const industryMixData = useMemo(() => {
    if (!stats?.by_batch_industry || !sortedBatches.length) return [];

    const INDUSTRY_COLORS = [
      '#FB651E', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
      '#EF4444', '#06B6D4', '#EC4899', '#84CC16', '#F97316',
      '#6366F1', '#14B8A6', '#E11D48', '#A855F7', '#0EA5E9',
      '#D946EF', '#22C55E', '#FACC15', '#64748B', '#78716C',
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
        <ActivityIndicator size="large" color={colors.appColors.primary} />
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
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Ionicons
          name="arrow-back"
          size={16}
          color={colors.appColors.grayMuted}
        />
        <Text style={[styles.commandText, { marginLeft: 8, marginBottom: 0 }]}>
          $ cd ../analytics
        </Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.commandText}>$ analyze --all-batches --verbose</Text>
        <Text style={styles.title}>All Batches Analytics</Text>
        <Text style={styles.subtitle}>
          Comprehensive trends and insights across all YC batches
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="batches"
          value={batchStats.totalBatches}
          iconName="calendar"
          color={colors.defaults.ORANGE}
        />
        <StatCard
          title="avg size"
          value={batchStats.avgBatchSize}
          iconName="people"
          color={colors.appColors.brandBlue}
        />
        <StatCard
          title="growth"
          value={`${batchStats.growthRate > 0 ? "+" : ""}${batchStats.growthRate.toFixed(1)}%`}
          iconName="trending-up"
          color={colors.defaults.GREEN}
        />
        <StatCard
          title="largest"
          value={batchStats.largestBatch.count}
          iconName="business"
          color={colors.defaults.PURPLE}
        />
      </View>

      {/* Batch Size Evolution Chart */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="trending-up"
            size={18}
            color={colors.defaults.ORANGE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Batch Size Evolution</Text>
        </View>
        {/* Render a subset if there are too many batches to fit on mobile */}
        <BarChart
          data={chartData.slice(-15)} 
          maxValue={maxBatchSize}
          color={colors.defaults.ORANGE}
          height={150}
        />
        <Text style={[styles.commandText, { marginTop: 16 }]}>
          &gt; Range: {batchStats.smallestBatch.count} -{" "}
          {batchStats.largestBatch.count} companies
        </Text>
      </View>

      {/* Top Industries */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="briefcase"
            size={18}
            color={colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Industries</Text>
        </View>
        <ProgressBarChart
          data={industryTrends}
          maxValue={maxIndustryValue}
          color={colors.appColors.brandBlue}
        />
      </View>

      {/* Top Countries */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="earth"
            size={18}
            color={colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Countries</Text>
        </View>
        <ProgressBarChart
          data={countryTrends}
          maxValue={maxCountryValue}
          color={colors.defaults.PURPLE}
        />
      </View>

      {/* Industry Mix by Batch */}
      {industryMixData.length > 0 && (
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="layers"
              size={18}
              color={colors.appColors.brandBlue}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Industry Mix by Batch</Text>
            <Text style={[styles.subtitle, { marginLeft: "auto", fontSize: 10 }]}>
              recent 8
            </Text>
          </View>
          <StackedBarChart data={industryMixData} />
        </View>
      )}

      {/* Complete Batch History */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="calendar"
            size={18}
            color={colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Complete Batch History</Text>
        </View>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>#</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>batch</Text>
          <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: "right" }]}>companies</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>%</Text>
        </View>
        
        {sortedBatches.map((batch, index) => {
          const percentage = ((batch.count / batchStats.totalCompanies) * 100).toFixed(1);
          return (
            <View key={batch.name} style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 0.5, color: colors.appColors.grayMuted }]}>{index + 1}</Text>
              <Text style={[styles.tableRowText, { flex: 1 }]}>{batchToShortFormat(batch.name)}</Text>
              <Text style={[styles.tableRowText, { flex: 1.5, textAlign: "right" }]}>{batch.count.toLocaleString()}</Text>
              <Text style={[styles.tableRowText, { flex: 1, textAlign: "right", color: colors.appColors.grayMuted }]}>{percentage}%</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
