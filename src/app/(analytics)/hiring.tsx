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
import { useGetHiringAnalytics } from "@/services/apiService";
import { StatCard } from "./components/StatCard";
import { ProgressBarChart } from "./components/ProgressBarChart";
import { BarChart } from "./components/BarChart";
import colors from "@/theme/Colors";
import styles from "./styles";

export default function HiringAnalyticsScreen() {
  const router = useRouter();
  const { data: analytics, isLoading, error } = useGetHiringAnalytics();

  const roleDistribution = useMemo(() => {
    if (!analytics?.roleDistribution) return [];
    return analytics.roleDistribution
      .slice(0, 8)
      .map((item: any) => ({ name: item.role, value: item.count }));
  }, [analytics?.roleDistribution]);

  const maxRoleDist =
    roleDistribution.length > 0
      ? Math.max(...roleDistribution.map((d: any) => d.value))
      : 0;

  const locationBreakdown = useMemo(() => {
    if (!analytics?.locationBreakdown) return [];
    return analytics.locationBreakdown
      .slice(0, 15)
      .map((item: any) => ({ name: item.location, value: item.count }));
  }, [analytics?.locationBreakdown]);

  const maxLocDist =
    locationBreakdown.length > 0
      ? Math.max(...locationBreakdown.map((d: any) => d.value))
      : 0;

  const salaryByRole = useMemo(() => {
    if (!analytics?.salaryByRole) return [];
    return analytics.salaryByRole.map((item: any) => ({
      label:
        item.role.length > 8 ? item.role.substring(0, 8) + ".." : item.role,
      value: item.avg,
    }));
  }, [analytics?.salaryByRole]);

  const maxSalary =
    salaryByRole.length > 0
      ? Math.max(...salaryByRole.map((d: any) => d.value))
      : 0;

  const jobTypeBreakdown = useMemo(() => {
    if (!analytics?.jobTypeBreakdown) return [];
    return analytics.jobTypeBreakdown.map((item: any) => ({
      name: item.type,
      value: item.count,
    }));
  }, [analytics?.jobTypeBreakdown]);

  const maxJobType =
    jobTypeBreakdown.length > 0
      ? Math.max(...jobTypeBreakdown.map((d: any) => d.value))
      : 0;

  const topBatches = useMemo(() => {
    if (!analytics?.topBatches) return [];
    return analytics.topBatches.map((item: any) => ({
      name: item.batch,
      value: item.count,
    }));
  }, [analytics?.topBatches]);

  const maxTopBatches =
    topBatches.length > 0 ? Math.max(...topBatches.map((d: any) => d.value)) : 0;

  if (isLoading || !analytics) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.appColors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading hiring analytics data.</Text>
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
        <Text style={[styles.commandText, { color: colors.defaults.ORANGE }]}>
          $ fetch --jobs --analytics
        </Text>
        <Text style={styles.title}>Hiring Market Intelligence</Text>
        <Text style={styles.subtitle}>
          Real-time insights from {analytics.totalJobs?.toLocaleString() || 0}{" "}
          jobs at {analytics.totalCompanies || 0} YC companies
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="avg salary"
            value={
              analytics.avgSalary
                ? `$${(analytics.avgSalary / 1000).toFixed(0)}K`
                : "N/A"
            }
            iconName="cash"
            color={colors.defaults.GREEN}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="total jobs"
            value={analytics.totalJobs?.toLocaleString() || 0}
            iconName="briefcase"
            color={colors.defaults.ORANGE}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="% remote"
            value={`${analytics.remoteStats?.remotePercentage || 0}%`}
            iconName="globe"
            color={colors.appColors.brandBlue}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="companies"
            value={analytics.totalCompanies?.toLocaleString() || 0}
            iconName="business"
            color={colors.defaults.PURPLE}
          />
        </View>
      </View>

      {/* Salary Insights */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="cash"
            size={18}
            color={colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Avg Salary by Role</Text>
        </View>
        <BarChart
          data={salaryByRole}
          maxValue={maxSalary}
          color={colors.defaults.GREEN}
          height={180}
        />
      </View>

      {/* Highest Paying Roles */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="trending-up"
            size={18}
            color={colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Paying Roles</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>role</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>jobs</Text>
          <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: "right" }]}>avg salary</Text>
        </View>
        {analytics?.highestPayingRoles?.slice(0, 8).map((role: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableRowText, { flex: 1.5, color: colors.defaults.ORANGE }]} numberOfLines={1}>
              {role.role}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1, textAlign: "right", color: colors.appColors.grayMuted }]}>
              {role.jobCount}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1.5, textAlign: "right", fontWeight: "bold" }]}>
              ${(role.avgSalary / 1000).toFixed(0)}K
            </Text>
          </View>
        ))}
      </View>

      {/* Top Paying Companies */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="business"
            size={18}
            color={colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Paying Companies</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>company</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>batch</Text>
          <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: "right" }]}>avg salary</Text>
        </View>
        {analytics?.topPayingCompanies?.slice(0, 8).map((company: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableRowText, { flex: 1.5 }]} numberOfLines={1}>
              {company.name}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1, textAlign: "right", color: colors.appColors.grayMuted }]}>
              {company.batch}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1.5, textAlign: "right", fontWeight: "bold", color: colors.defaults.ORANGE }]}>
              ${(company.avgSalary / 1000).toFixed(0)}K
            </Text>
          </View>
        ))}
      </View>

      {/* Role Distribution */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="pie-chart"
            size={18}
            color={colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Role Distribution</Text>
        </View>
        <ProgressBarChart
          data={roleDistribution}
          maxValue={maxRoleDist}
          color={colors.defaults.PURPLE}
        />
      </View>

      {/* Top 10 Locations */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="map"
            size={18}
            color={colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Hiring Locations</Text>
        </View>
        <ProgressBarChart
          data={locationBreakdown}
          maxValue={maxLocDist}
          color={colors.appColors.brandBlue}
        />
      </View>

      {/* Job Type Distribution */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="briefcase"
            size={18}
            color={colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Job Type Distribution</Text>
        </View>
        <ProgressBarChart
          data={jobTypeBreakdown}
          maxValue={maxJobType}
          color={colors.defaults.PURPLE}
        />
      </View>

      {/* Remote vs On-site */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="desktop"
            size={18}
            color={colors.defaults.ORANGE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Remote vs On-site</Text>
        </View>
        <ProgressBarChart
          data={[
            { name: "Remote", value: analytics.remoteStats?.remote || 0 },
            { name: "On-site", value: analytics.remoteStats?.onsite || 0 },
          ]}
          maxValue={
            (analytics.remoteStats?.remote || 0) +
            (analytics.remoteStats?.onsite || 0)
          }
          color={colors.defaults.ORANGE}
        />
      </View>

      {/* Early Stage Hiring Stats */}
      {analytics?.earlyStageStats && (
        <View style={styles.card}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="flash"
              size={18}
              color={colors.defaults.ORANGE}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Early Stage Hiring</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted, fontFamily: "SpaceMono-Regular" }}>early companies</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.defaults.ORANGE }}>{analytics.earlyStageStats.earlyStageCompanies}</Text>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted }}>{analytics.earlyStageStats.earlyStagePercentage}%</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted, fontFamily: "SpaceMono-Regular" }}>early jobs</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.defaults.ORANGE }}>{analytics.earlyStageStats.earlyStageJobs}</Text>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted }}>of {analytics.totalJobs}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted, fontFamily: "SpaceMono-Regular" }}>growth jobs</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.defaults.ORANGE }}>{analytics.earlyStageStats.growthStageJobs}</Text>
              <Text style={{ fontSize: 10, color: colors.appColors.grayMuted }}>of {analytics.totalJobs}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Top Batches by Jobs */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="rocket"
            size={18}
            color={colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top 10 Batches by Jobs</Text>
        </View>
        <ProgressBarChart
          data={topBatches}
          maxValue={maxTopBatches}
          color={colors.appColors.brandBlue}
        />
      </View>

      {/* Top Hiring Companies */}
      <View style={styles.card}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="people"
            size={18}
            color={colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top 10 Hiring Companies</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>company</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>batch</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>jobs</Text>
        </View>
        {analytics?.topHiringCompanies?.map((company: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableRowText, { flex: 2 }]} numberOfLines={1}>
              {company.name}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1, textAlign: "right", color: colors.appColors.grayMuted }]}>
              {company.batch}
            </Text>
            <Text style={[styles.tableRowText, { flex: 1, textAlign: "right", fontWeight: "bold", color: colors.defaults.ORANGE }]}>
              {company.jobCount}
            </Text>
          </View>
        ))}
      </View>

      <Text
        style={[
          styles.commandText,
          { textAlign: "center", marginTop: 16, marginBottom: 8 },
        ]}
      >
        Last updated:{" "}
        {analytics.lastUpdated
          ? new Date(analytics.lastUpdated).toLocaleDateString()
          : "N/A"}
      </Text>
    </ScrollView>
  );
}
