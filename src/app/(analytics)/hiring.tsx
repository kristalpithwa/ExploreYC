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
import { useGetHiringAnalytics } from "@/services/apiService";
import { StatCard } from "./components/StatCard";
import { ProgressBarChart } from "./components/ProgressBarChart";
import { BarChart } from "./components/BarChart";
import { Colors, Responsive } from "@/theme";
import styles from "./styles";

export default function HiringAnalyticsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    topBatches.length > 0
      ? Math.max(...topBatches.map((d: any) => d.value))
      : 0;

  if (isLoading || !analytics) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.appColors.primary} />
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
        <Text style={styles.title}>Hiring Market Intelligence</Text>
        <Text style={styles.subtitle}>
          Real-time insights from {analytics.totalJobs?.toLocaleString() || 0}{" "}
          jobs at {analytics.totalCompanies || 0} YC companies
        </Text>
      </View>

      <Animated.View
        style={styles.statsGrid}
        entering={FadeInDown.delay(100).springify()}
      >
        <View style={styles.statCardWrapper}>
          <StatCard
            title="avg salary"
            value={
              analytics.avgSalary
                ? `$${(analytics.avgSalary / 1000).toFixed(0)}K`
                : "N/A"
            }
            iconName="cash"
            color={Colors.defaults.GREEN}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="total jobs"
            value={analytics.totalJobs?.toLocaleString() || 0}
            iconName="briefcase"
            color={Colors.defaults.ORANGE}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="% remote"
            value={`${analytics.remoteStats?.remotePercentage || 0}%`}
            iconName="globe"
            color={Colors.appColors.brandBlue}
          />
        </View>
        <View style={styles.statCardWrapper}>
          <StatCard
            title="companies"
            value={analytics.totalCompanies?.toLocaleString() || 0}
            iconName="business"
            color={Colors.defaults.PURPLE}
          />
        </View>
      </Animated.View>

      {/* Salary Insights */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(200).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="cash"
            size={18}
            color={Colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Avg Salary by Role</Text>
        </View>
        <BarChart
          data={salaryByRole}
          maxValue={maxSalary}
          color={Colors.defaults.GREEN}
          height={Responsive.heightPercentageToDP(20)}
        />
      </Animated.View>

      {/* Highest Paying Roles */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(300).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="trending-up"
            size={18}
            color={Colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Paying Roles</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.flex15]}>role</Text>
          <Text
            style={[styles.tableHeaderText, styles.flex1, styles.textRight]}
          >
            jobs
          </Text>
          <Text
            style={[styles.tableHeaderText, styles.flex15, styles.textRight]}
          >
            avg salary
          </Text>
        </View>
        {analytics?.highestPayingRoles
          ?.slice(0, 8)
          .map((role: any, idx: number) => (
            <View key={idx} style={styles.tableRow}>
              <Text
                style={[styles.tableRowText, styles.flex15, styles.textOrange]}
                numberOfLines={1}
              >
                {role.role}
              </Text>
              <Text
                style={[
                  styles.tableRowText,
                  styles.flex1,
                  styles.textRight,
                  styles.textMuted,
                ]}
              >
                {role.jobCount}
              </Text>
              <Text
                style={[
                  styles.tableRowText,
                  styles.flex15,
                  styles.textRight,
                  styles.textBold,
                ]}
              >
                ${(role.avgSalary / 1000).toFixed(0)}K
              </Text>
            </View>
          ))}
      </Animated.View>

      {/* Top Paying Companies */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(400).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="business"
            size={18}
            color={Colors.defaults.GREEN}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Paying Companies</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.flex15]}>company</Text>
          <Text
            style={[styles.tableHeaderText, styles.flex1, styles.textRight]}
          >
            batch
          </Text>
          <Text
            style={[styles.tableHeaderText, styles.flex15, styles.textRight]}
          >
            avg salary
          </Text>
        </View>

        {analytics?.topPayingCompanies
          ?.slice(0, 8)
          .map((company: any, idx: number) => (
            <View key={idx} style={styles.tableRow}>
              <Text
                style={[styles.tableRowText, styles.flex15]}
                numberOfLines={1}
              >
                {company.name}
              </Text>
              <Text
                style={[
                  styles.tableRowText,
                  styles.flex1,
                  styles.textRight,
                  styles.textMuted,
                ]}
              >
                {company.batch}
              </Text>
              <Text
                style={[
                  styles.tableRowText,
                  styles.flex15,
                  styles.textRight,
                  styles.textBold,
                  styles.textOrange,
                ]}
              >
                ${(company.avgSalary / 1000).toFixed(0)}K
              </Text>
            </View>
          ))}
      </Animated.View>

      {/* Role Distribution */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(500).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="pie-chart"
            size={18}
            color={Colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Role Distribution</Text>
        </View>
        <ProgressBarChart
          data={roleDistribution}
          maxValue={maxRoleDist}
          color={Colors.defaults.PURPLE}
        />
      </Animated.View>

      {/* Top 10 Locations */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(600).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="map"
            size={18}
            color={Colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top Hiring Locations</Text>
        </View>
        <ProgressBarChart
          data={locationBreakdown}
          maxValue={maxLocDist}
          color={Colors.appColors.brandBlue}
        />
      </Animated.View>

      {/* Job Type Distribution */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(700).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="briefcase"
            size={18}
            color={Colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Job Type Distribution</Text>
        </View>
        <ProgressBarChart
          data={jobTypeBreakdown}
          maxValue={maxJobType}
          color={Colors.defaults.PURPLE}
        />
      </Animated.View>

      {/* Remote vs On-site */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(800).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="desktop"
            size={18}
            color={Colors.defaults.ORANGE}
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
          color={Colors.defaults.ORANGE}
        />
      </Animated.View>

      {/* Early Stage Hiring Stats */}
      {analytics?.earlyStageStats && (
        <Animated.View
          style={styles.card}
          entering={FadeInDown.delay(900).springify()}
        >
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="flash"
              size={18}
              color={Colors.defaults.ORANGE}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Early Stage Hiring</Text>
          </View>
          <View style={styles.earlyStageContainer}>
            <View style={styles.earlyStageCol}>
              <Text style={styles.earlyStageLabel}>early companies</Text>
              <Text style={styles.earlyStageValue}>
                {analytics.earlyStageStats.earlyStageCompanies}
              </Text>
              <Text style={styles.earlyStageSubtext}>
                {analytics.earlyStageStats.earlyStagePercentage}%
              </Text>
            </View>
            <View style={styles.earlyStageCol}>
              <Text style={styles.earlyStageLabel}>early jobs</Text>
              <Text style={styles.earlyStageValue}>
                {analytics.earlyStageStats.earlyStageJobs}
              </Text>
              <Text style={styles.earlyStageSubtext}>
                of {analytics.totalJobs}
              </Text>
            </View>
            <View style={styles.earlyStageCol}>
              <Text style={styles.earlyStageLabel}>growth jobs</Text>
              <Text style={styles.earlyStageValue}>
                {analytics.earlyStageStats.growthStageJobs}
              </Text>
              <Text style={styles.earlyStageSubtext}>
                of {analytics.totalJobs}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Top Batches by Jobs */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(1000).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="rocket"
            size={18}
            color={Colors.appColors.brandBlue}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top 10 Batches by Jobs</Text>
        </View>
        <ProgressBarChart
          data={topBatches}
          maxValue={maxTopBatches}
          color={Colors.appColors.brandBlue}
        />
      </Animated.View>

      {/* Top Hiring Companies */}
      <Animated.View
        style={styles.card}
        entering={FadeInDown.delay(1100).springify()}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons
            name="people"
            size={18}
            color={Colors.defaults.PURPLE}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Top 10 Hiring Companies</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.flex2]}>company</Text>
          <Text
            style={[styles.tableHeaderText, styles.flex1, styles.textRight]}
          >
            batch
          </Text>
          <Text
            style={[styles.tableHeaderText, styles.flex1, styles.textRight]}
          >
            jobs
          </Text>
        </View>
        {analytics?.topHiringCompanies?.map((company: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableRowText, styles.flex2]} numberOfLines={1}>
              {company.name}
            </Text>
            <Text
              style={[
                styles.tableRowText,
                styles.flex1,
                styles.textRight,
                styles.textMuted,
              ]}
            >
              {company.batch}
            </Text>
            <Text
              style={[
                styles.tableRowText,
                styles.flex1,
                styles.textRight,
                styles.textBold,
                styles.textOrange,
              ]}
            >
              {company.jobCount}
            </Text>
          </View>
        ))}
      </Animated.View>

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
