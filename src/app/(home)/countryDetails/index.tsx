import React, { useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/theme";
import styles from "./styles";

interface CompanyItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoBg: string;
}

interface IndustryPercentage {
  name: string;
  percentage: number;
}

interface BatchBar {
  name: string;
  heightPercentage: number;
  active?: boolean;
}

interface CountryStats {
  name: string;
  flag: string;
  totalCompaniesCount: number;
  companies: number;
  industries: number;
  batches: number;
  topStartups: number;
  topIndustries: IndustryPercentage[];
  topCompanies: CompanyItem[];
  batchDistribution: BatchBar[];
  insights: string[];
}

const countryStatsData: Record<string, CountryStats> = {
  India: {
    name: "India",
    flag: "🇮🇳",
    totalCompaniesCount: 214,
    companies: 214,
    industries: 15,
    batches: 12,
    topStartups: 25,
    topIndustries: [
      { name: "AI", percentage: 45 },
      { name: "Fintech", percentage: 25 },
      { name: "Developer Tools", percentage: 18 },
    ],
    topCompanies: [
      {
        id: "1",
        name: "Razorpay",
        category: "Fintech",
        logo: "R",
        logoBg: Colors.appColors.brandBlue,
      },
      {
        id: "3",
        name: "Postman",
        category: "Dev Tools",
        logo: "P",
        logoBg: Colors.appColors.primary,
      },
      {
        id: "2",
        name: "Zepto",
        category: "Commerce",
        logo: "Z",
        logoBg: "#B10DC9",
      },
    ],
    batchDistribution: [
      { name: "W20", heightPercentage: 20 },
      { name: "S20", heightPercentage: 40 },
      { name: "W21", heightPercentage: 60 },
      { name: "S21", heightPercentage: 90 },
      { name: "W22", heightPercentage: 100, active: true },
      { name: "S22", heightPercentage: 75 },
    ],
    insights: [
      "AI sector saw a 150% YoY growth in funding during 2023.",
      "Engineering talent retention rates are 20% higher than global averages.",
      "Fintech infrastructure startups comprise 60% of new YC admits from the region.",
    ],
  },
  USA: {
    name: "USA",
    flag: "🇺🇸",
    totalCompaniesCount: 1250,
    companies: 1250,
    industries: 45,
    batches: 35,
    topStartups: 150,
    topIndustries: [
      { name: "AI & ML", percentage: 52 },
      { name: "Enterprise SaaS", percentage: 30 },
      { name: "Healthcare", percentage: 12 },
    ],
    topCompanies: [
      {
        id: "3",
        name: "OpenAI",
        category: "AI",
        logo: "O",
        logoBg: Colors.appColors.brandOpenAI,
      },
      {
        id: "1",
        name: "Stripe",
        category: "Fintech",
        logo: "S",
        logoBg: Colors.appColors.brandStripe,
      },
      {
        id: "2",
        name: "Airbnb",
        category: "Travel",
        logo: "A",
        logoBg: Colors.appColors.brandAirbnb,
      },
    ],
    batchDistribution: [
      { name: "W20", heightPercentage: 60 },
      { name: "S20", heightPercentage: 70 },
      { name: "W21", heightPercentage: 85 },
      { name: "S21", heightPercentage: 95 },
      { name: "W22", heightPercentage: 100, active: true },
      { name: "S22", heightPercentage: 90 },
    ],
    insights: [
      "AI research and foundation models captured 45% of total seed capital.",
      "B2B SaaS continues to lead in customer acquisition velocity.",
      "Healthcare tech saw significant valuation multiples recovery in early 2026.",
    ],
  },
};

export default function CountryDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { country } = useLocalSearchParams<{ country: string }>();

  // Fallback to India if data for the parameter doesn't exist
  const stats = useMemo(() => {
    return countryStatsData[country || "India"] || countryStatsData["India"];
  }, [country]);

  return (
    <View style={styles.mainContainer}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.headerBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{stats.name} Profile</Text>
        </View>
        <View />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Flag Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{stats.flag}</Text>
          </View>
          <Text style={styles.countryName}>{stats.name}</Text>
          <Text style={styles.countryStartups}>
            {stats.totalCompaniesCount} Startups
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.companies}</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.industries}</Text>
            <Text style={styles.statLabel}>Industries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.batches}</Text>
            <Text style={styles.statLabel}>YC Batches</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.topStartups}</Text>
            <Text style={styles.statLabel}>Top Startups</Text>
          </View>
        </View>

        {/* Top Industries Chart */}
        <View style={styles.industriesCard}>
          <Text style={styles.sectionTitle}>Top Industries</Text>
          <View style={styles.industriesList}>
            {stats.topIndustries.map((ind, index) => (
              <View key={index} style={styles.industryRow}>
                <View style={styles.industryLabels}>
                  <Text style={styles.industryName}>{ind.name}</Text>
                  <Text style={styles.industryPercentage}>
                    {ind.percentage}%
                  </Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${ind.percentage}%`,
                        opacity: 1 - index * 0.2, // incremental opacity similar to Stitch
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Companies Carousel */}
        <View style={styles.carouselSection}>
          <View style={styles.carouselHeader}>
            <Text style={styles.carouselTitle}>Top Companies</Text>
            <Pressable>
              <Text style={styles.seeAllLink}>See all</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carouselScroll}
            contentContainerStyle={styles.carouselContent}
          >
            {stats.topCompanies.map((company) => (
              <Pressable
                key={company.id}
                onPress={() =>
                  router.push({
                    pathname: "/(home)/companyDetails",
                    params: { id: company.id },
                  })
                }
                style={styles.companyCard}
              >
                <View
                  style={[styles.logoBox, { backgroundColor: company.logoBg }]}
                >
                  <Text style={styles.logoText}>{company.logo}</Text>
                </View>
                <Text style={styles.companyName} numberOfLines={1}>
                  {company.name}
                </Text>
                <View style={styles.companyTag}>
                  <Text style={styles.companyTagText}>{company.category}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Batch Distribution Card */}
        <View style={styles.distributionCard}>
          <Text style={styles.sectionTitle}>Batch Distribution</Text>
          <View style={styles.chartContainer}>
            {stats.batchDistribution.map((bar, index) => (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${bar.heightPercentage}%`,
                        backgroundColor: bar.active
                          ? Colors.appColors.primary
                          : Colors.appColors.grayMuted,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.barLabel, bar.active && styles.barLabelActive]}
                >
                  {bar.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insights Card */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={{ fontSize: 18 }}>💡</Text>
            <Text style={styles.sectionTitle}>Country Insights</Text>
          </View>
          <View style={styles.insightsList}>
            {stats.insights.map((insight, index) => {
              // Highlight first words in bold similar to Stitch
              const firstSpaceIdx = insight.indexOf(" ");
              const boldPart = insight.substring(0, firstSpaceIdx);
              const restPart = insight.substring(firstSpaceIdx);

              return (
                <View key={index} style={styles.insightRow}>
                  <View style={styles.insightBullet} />
                  <Text style={styles.insightText}>
                    <Text style={styles.insightHighlight}>{boldPart}</Text>
                    {restPart}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* CTA View All Button */}
        <Pressable style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>View All Companies</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
