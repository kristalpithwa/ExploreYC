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

interface CountryPercentage {
  name: string;
  percentage: number;
}

interface IndustryStats {
  name: string;
  emoji: string;
  totalCompaniesCount: number;
  companies: number;
  countries: number;
  batches: number;
  topStartups: number;
  topCountries: CountryPercentage[];
  topCompanies: CompanyItem[];
  latestBatch: string;
  latestBatchAdded: string;
  insights: string[];
}

const industryStatsData: Record<string, IndustryStats> = {
  AI: {
    name: "Artificial Intelligence",
    emoji: "🤖",
    totalCompaniesCount: 1245,
    companies: 1245,
    countries: 45,
    batches: 18,
    topStartups: 120,
    topCountries: [
      { name: "United States", percentage: 72 },
      { name: "India", percentage: 15 },
      { name: "United Kingdom", percentage: 8 },
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
        name: "Cursor",
        category: "AI Code Editor",
        logo: "C",
        logoBg: "#10A37F",
      },
      {
        id: "2",
        name: "Scale AI",
        category: "Data Infra",
        logo: "S",
        logoBg: Colors.appColors.brandBlue,
      },
    ],
    latestBatch: "Summer 2024",
    latestBatchAdded: "+253 AI Companies",
    insights: [
      "Highest concentration of YC investments since 2022.",
      "B2B SaaS integrating LLMs makes up 60% of new AI entries.",
    ],
  },
  Fintech: {
    name: "Fintech",
    emoji: "💳",
    totalCompaniesCount: 840,
    companies: 840,
    countries: 38,
    batches: 22,
    topStartups: 85,
    topCountries: [
      { name: "United States", percentage: 65 },
      { name: "India", percentage: 18 },
      { name: "Brazil", percentage: 10 },
    ],
    topCompanies: [
      {
        id: "1",
        name: "Stripe",
        category: "Fintech",
        logo: "S",
        logoBg: Colors.appColors.brandStripe,
      },
      {
        id: "2",
        name: "Razorpay",
        category: "Fintech",
        logo: "R",
        logoBg: Colors.appColors.brandBlue,
      },
      {
        id: "3",
        name: "Coinbase",
        category: "Crypto",
        logo: "C",
        logoBg: Colors.appColors.brandBlue,
      },
    ],
    latestBatch: "Winter 2024",
    latestBatchAdded: "+42 Fintech Companies",
    insights: [
      "Cross-border payment infrastructure captures the highest funding share.",
      "Embedded finance integrations are expanding rapidly in retail segments.",
    ],
  },
};

export default function IndustryDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { industry } = useLocalSearchParams<{ industry: string }>();

  // Resolve industry details, fallback to AI if not found
  const stats = useMemo(() => {
    // Check if user selected "AI" or "Artificial Intelligence"
    const key =
      industry === "Artificial Intelligence" || industry === "AI"
        ? "AI"
        : "Fintech";
    return industryStatsData[key];
  }, [industry]);

  return (
    <View style={styles.mainContainer}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.headerBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Industry Profile</Text>
        </View>
        <View />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner Card */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: Colors.appColors.primary },
          ]}
        >
          <Text style={styles.heroIconText}>{stats.emoji}</Text>
          <Text style={styles.heroTitle}>{stats.name}</Text>

          <View style={styles.heroMetadataRow}>
            <View style={styles.heroMetaItem}>
              <Text style={styles.heroMetaText}>
                🏢 {stats.totalCompaniesCount} Companies
              </Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Text style={styles.heroMetaText}>
                🌍 {stats.countries} Countries
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIconText}>🏢</Text>
            <Text style={styles.statNumber}>{stats.companies}</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIconText}>🌍</Text>
            <Text style={styles.statNumber}>{stats.countries}</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIconText}>📅</Text>
            <Text style={styles.statNumber}>{stats.batches}</Text>
            <Text style={styles.statLabel}>Batches</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIconText}>🚀</Text>
            <Text style={styles.statNumber}>{stats.topStartups}</Text>
            <Text style={styles.statLabel}>Top Startups</Text>
          </View>
        </View>

        {/* Top Startups Horizontal Scroll */}
        <View style={styles.carouselSection}>
          <View style={styles.carouselHeader}>
            <Text style={styles.carouselTitle}>Top Startups</Text>
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

        {/* Top Countries Bar Chart */}
        <View style={styles.countriesCard}>
          <Text style={styles.sectionTitle}>Top Countries</Text>
          <View style={styles.countriesList}>
            {stats.topCountries.map((country, index) => (
              <View key={index} style={styles.countryRow}>
                <View style={styles.countryLabels}>
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryPercentage}>
                    {country.percentage}%
                  </Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${country.percentage}%`,
                        opacity: 1 - index * 0.3,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Latest Batch & Industry Insights Bento Layout */}
        <View style={styles.bentoContainer}>
          {/* Latest Batch Card */}
          <View style={styles.bentoCard}>
            <View style={styles.latestBatchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bentoLabel}>Latest Batch Activity</Text>
                <Text style={styles.bentoTitle}>{stats.latestBatch}</Text>
                <Text style={styles.bentoSub}>{stats.latestBatchAdded}</Text>
              </View>
              <View style={styles.bentoIconBox}>
                <Text style={styles.bentoIconText}>📈</Text>
              </View>
            </View>
          </View>

          {/* Industry Insights */}
          <View style={styles.bentoCard}>
            <View style={styles.insightsHeader}>
              <Text style={{ fontSize: 18 }}>📈</Text>
              <Text style={styles.bentoTitle}>Industry Insights</Text>
            </View>
            <View style={styles.insightsList}>
              {stats.insights.map((insight, index) => (
                <View key={index} style={styles.insightRow}>
                  <View style={styles.insightBullet} />
                  <Text style={styles.insightText}>{insight}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* View All Button CTA */}
        <Pressable style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>View All {stats.name} Companies</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
