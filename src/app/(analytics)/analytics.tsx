import React, { useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetStats } from "@/services/apiService";
import colors from "@/theme/Colors";
import { getSortedBatches, batchToShortFormat } from "@/utils/batchUtils";
import { StatCard } from "./components/StatCard";
import { ProgressBarChart } from "./components/ProgressBarChart";
import { BarChart } from "./components/BarChart";
import styles from "./styles";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnalyticsScreen() {
  const router = useRouter();
  const { data: stats, isLoading, isError } = useGetStats();
  const insets = useSafeAreaInsets();

  const activeCompanies = stats?.by_status?.["Active"] || 0;
  const totalBatches = stats?.by_batch ? Object.keys(stats.by_batch).length : 0;
  const totalCountries = stats?.by_country
    ? Object.keys(stats.by_country).length
    : 0;
  const totalIndustries = stats?.by_industry
    ? Object.keys(stats.by_industry).length
    : 0;

  // Prepare industry data (top 10)
  const industryData = useMemo(() => {
    if (!stats?.by_industry) return [];
    return Object.entries(stats.by_industry)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([industry, count]) => ({ name: industry, value: count as number }));
  }, [stats?.by_industry]);

  const maxIndustryValue =
    industryData.length > 0 ? Math.max(...industryData.map((d) => d.value)) : 0;

  // Prepare country data (top 10)
  const countryData = useMemo(() => {
    if (!stats?.by_country) return [];
    return Object.entries(stats.by_country)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([country, count]) => ({ name: country, value: count as number }));
  }, [stats?.by_country]);

  const maxCountryValue =
    countryData.length > 0 ? Math.max(...countryData.map((d) => d.value)) : 0;

  // Status distribution
  const statusData = useMemo(() => {
    if (!stats?.by_status) return [];
    return Object.entries(stats.by_status).map(([status, count]) => ({
      name: status,
      value: count as number,
    }));
  }, [stats?.by_status]);

  const maxStatusValue =
    statusData.length > 0 ? Math.max(...statusData.map((d) => d.value)) : 0;

  // Prepare batch timeline data (last 20 batches)
  const batchTimelineData = useMemo(() => {
    if (!stats?.by_batch) return [];
    return getSortedBatches(stats.by_batch)
      .slice(0, 20) // Get the 20 most recent
      .reverse() // Reverse to show oldest to newest
      .map((b) => ({ label: batchToShortFormat(b.name), value: b.count }));
  }, [stats?.by_batch]);

  const maxBatchValue =
    batchTimelineData.length > 0
      ? Math.max(...batchTimelineData.map((d) => d.value))
      : 0;

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.appColors.primary} />
      </View>
    );
  }

  if (isError || !stats) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading analytics data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.appTitleText}>ExploreYC</Text>
      </View>

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>YC Portfolio Analytics</Text>
          <Text style={styles.subtitle}>
            Insights and trends across the Y Combinator portfolio
          </Text>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCardWrapper}>
            <StatCard
              title="active"
              value={activeCompanies.toLocaleString()}
              iconName="trending-up"
              color={colors.defaults.GREEN}
            />
          </View>
          <View style={styles.statCardWrapper}>
            <StatCard
              title="industries"
              value={totalIndustries}
              iconName="business"
              color={colors.defaults.ORANGE}
            />
          </View>
          <View style={styles.statCardWrapper}>
            <StatCard
              title="countries"
              value={totalCountries}
              iconName="earth"
              color={colors.defaults.PURPLE}
            />
          </View>
          <View style={styles.statCardWrapper}>
            <StatCard
              title="batches"
              value={totalBatches}
              iconName="calendar"
              color={colors.defaults.BLUE}
            />
          </View>
        </View>

        {/* Banners Grid */}
        <View style={styles.bannersGrid}>
          <TouchableOpacity
            style={[
              styles.bannerCard,
              { borderColor: "rgba(251, 101, 30, 0.3)" },
            ]}
            onPress={() => router.push("/(analytics)/batches")}
          >
            <View style={styles.bannerHeader}>
              <Text style={styles.bannerTitle}>All Batches Analytics</Text>
              <View
                style={[
                  styles.bannerBadge,
                  {
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  },
                ]}
              >
                <Text style={[styles.bannerBadgeText, { color: "#34d399" }]}>
                  NEW
                </Text>
              </View>
            </View>
            <Text style={styles.bannerDesc}>
              Comprehensive trends and insights across all {totalBatches} YC
              batches
            </Text>
            <View style={{ marginTop: 12 }}>
              <Ionicons name="sparkles" size={20} color="#FB651E" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bannerCard,
              { borderColor: "rgba(59, 130, 246, 0.3)" },
            ]}
            onPress={() => router.push("/(analytics)/hiring")}
          >
            <View style={styles.bannerHeader}>
              <Text style={styles.bannerTitle}>Hiring Board Analytics</Text>
              <View
                style={[
                  styles.bannerBadge,
                  {
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                  },
                ]}
              >
                <Text style={[styles.bannerBadgeText, { color: "#60a5fa" }]}>
                  LIVE
                </Text>
              </View>
            </View>
            <Text style={styles.bannerDesc}>
              Salary insights, hiring trends, and job market intelligence
            </Text>
            <View style={{ marginTop: 12 }}>
              <Ionicons name="briefcase" size={20} color="#3b82f6" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Detailed Analytics Section */}
        <View style={styles.detailedAnalyticsHeader}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.detailedAnalyticsTitle}>Detailed Analytics</Text>
        </View>

        {/* Batch Growth Timeline */}
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="trending-up"
              size={18}
              color={colors.defaults.ORANGE}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Batch Growth Timeline</Text>
            <Text
              style={[styles.subtitle, { marginLeft: "auto", fontSize: 10 }]}
            >
              last 20
            </Text>
          </View>
          <BarChart
            data={batchTimelineData}
            maxValue={maxBatchValue}
            color={colors.defaults.ORANGE}
            height={150}
          />
          <Text style={[styles.commandText, { marginTop: 16 }]}>
            &gt; Peak: {maxBatchValue} companies
          </Text>
        </View>

        {/* Top Industries */}
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="business"
              size={18}
              color={colors.appColors.brandBlue}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Top Industries</Text>
          </View>
          <ProgressBarChart
            data={industryData}
            maxValue={maxIndustryValue}
            color={colors.appColors.brandBlue}
          />
        </View>

        {/* Company Status */}
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="briefcase"
              size={18}
              color={colors.defaults.GREEN}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Company Status</Text>
          </View>
          <ProgressBarChart
            data={statusData}
            maxValue={maxStatusValue}
            color={colors.defaults.GREEN}
          />
        </View>

        {/* Geographic Distribution */}
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="earth"
              size={18}
              color={colors.defaults.PURPLE}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Geographic Distribution</Text>
            <Text
              style={[styles.subtitle, { marginLeft: "auto", fontSize: 10 }]}
            >
              top 10
            </Text>
          </View>
          <ProgressBarChart
            data={countryData}
            maxValue={maxCountryValue}
            color={colors.defaults.PURPLE}
          />
        </View>
      </ScrollView>
    </View>
  );
}
