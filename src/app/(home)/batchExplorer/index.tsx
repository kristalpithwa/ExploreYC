import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/theme";
import styles from "./styles";

interface IndustryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface BatchStats {
  name: string;
  tagline: string;
  companiesCount: number;
  hiringCount: number;
  hiringRate: string;
  avgTeamSize: string;
  industries: IndustryData[];
  funFact: string;
}

const batchData: Record<string, BatchStats> = {
  "Summer 2024": {
    name: "Summer 2024",
    tagline: "The landscape of new innovation.",
    companiesCount: 253,
    hiringCount: 61,
    hiringRate: "24.1%",
    avgTeamSize: "4.2",
    industries: [
      {
        name: "B2B",
        count: 120,
        percentage: 47.4,
        color: Colors.appColors.primary,
      },
      {
        name: "Healthcare",
        count: 45,
        percentage: 17.7,
        color: Colors.appColors.brandBlue,
      },
      {
        name: "Consumer",
        count: 32,
        percentage: 12.6,
        color: Colors.appColors.brandGreen,
      },
    ],
    funFact:
      "24% of this batch is already hiring, indicating strong early traction and capital deployment.",
  },
  "Winter 2024": {
    name: "Winter 2024",
    tagline: "Securing the future of automation and artificial intelligence.",
    companiesCount: 260,
    hiringCount: 78,
    hiringRate: "30.0%",
    avgTeamSize: "4.5",
    industries: [
      {
        name: "B2B / SaaS",
        count: 110,
        percentage: 42.3,
        color: Colors.appColors.primary,
      },
      {
        name: "AI & ML",
        count: 65,
        percentage: 25.0,
        color: Colors.appColors.brandBlue,
      },
      {
        name: "Fintech",
        count: 35,
        percentage: 13.5,
        color: Colors.appColors.brandGreen,
      },
    ],
    funFact:
      "AI and machine learning startups dominate this winter cohort, securing 25% of all placements.",
  },
  "Summer 2023": {
    name: "Summer 2023",
    tagline: "Resilient teams building in a changing economy.",
    companiesCount: 220,
    hiringCount: 50,
    hiringRate: "22.7%",
    avgTeamSize: "3.9",
    industries: [
      {
        name: "B2B",
        count: 95,
        percentage: 43.2,
        color: Colors.appColors.primary,
      },
      {
        name: "Consumer",
        count: 40,
        percentage: 18.2,
        color: Colors.appColors.brandBlue,
      },
      {
        name: "Web3",
        count: 25,
        percentage: 11.4,
        color: Colors.appColors.brandGreen,
      },
    ],
    funFact:
      "Web3 cohort size decreased by 15% compared to the prior batch, as B2B and SaaS rose in priority.",
  },
  "Winter 2023": {
    name: "Winter 2023",
    tagline: "The origin cohort of the generative AI boom.",
    companiesCount: 282,
    hiringCount: 88,
    hiringRate: "31.2%",
    avgTeamSize: "4.8",
    industries: [
      {
        name: "B2B / SaaS",
        count: 132,
        percentage: 46.8,
        color: Colors.appColors.primary,
      },
      {
        name: "Healthcare",
        count: 52,
        percentage: 18.4,
        color: Colors.appColors.brandBlue,
      },
      {
        name: "AI",
        count: 48,
        percentage: 17.0,
        color: Colors.appColors.brandGreen,
      },
    ],
    funFact:
      "This batch produced the highest density of generative AI tools since the launch of ChatGPT.",
  },
};

export default function BatchExplorerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedBatch, setSelectedBatch] = useState<string>("Summer 2024");

  const currentStats = batchData[selectedBatch];

  return (
    <View style={styles.mainContainer}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.headerBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Batch Explorer</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Batch Selector (Horizontal Chips) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.batchSelectorScroll}
          contentContainerStyle={styles.batchSelectorContent}
        >
          {Object.keys(batchData).map((batchName) => {
            const isActive = selectedBatch === batchName;
            return (
              <Pressable
                key={batchName}
                onPress={() => setSelectedBatch(batchName)}
                style={[
                  styles.batchPill,
                  isActive ? styles.batchPillActive : styles.batchPillInactive,
                ]}
              >
                <Text
                  style={[
                    styles.batchPillText,
                    isActive
                      ? styles.batchPillTextActive
                      : styles.batchPillTextInactive,
                  ]}
                >
                  {batchName}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Hero Card */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: Colors.appColors.primary },
          ]}
        >
          <View style={styles.heroHighlightBadge}>
            <Text style={styles.heroHighlightText}>✨ Batch Highlights</Text>
          </View>
          <Text style={styles.heroTitle}>{currentStats.name}</Text>
          <Text style={styles.heroSub}>{currentStats.tagline}</Text>

          <View style={styles.heroStatsGrid}>
            <View>
              <Text style={styles.heroStatNumber}>
                {currentStats.companiesCount}
              </Text>
              <Text style={styles.heroStatLabel}>Companies</Text>
            </View>
            <View>
              <Text style={styles.heroStatNumber}>
                {currentStats.hiringCount}
              </Text>
              <Text style={styles.heroStatLabel}>
                Hiring ({currentStats.hiringRate})
              </Text>
            </View>
          </View>

          <Pressable style={styles.heroActionBtn}>
            <Text style={styles.heroActionBtnText}>View Wrapped →</Text>
          </Pressable>
        </View>

        {/* Statistics Grid */}
        <View style={styles.statsGrid}>
          {/* Card 1: Companies */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIconText}>🏢</Text>
            </View>
            <Text style={styles.statValue}>{currentStats.companiesCount}</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>

          {/* Card 2: Hiring */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIconText}>💼</Text>
            </View>
            <Text style={styles.statValue}>{currentStats.hiringCount}</Text>
            <Text style={styles.statLabel}>Hiring</Text>
          </View>

          {/* Card 3: Hiring Rate */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIconText}>📈</Text>
            </View>
            <Text style={styles.statValue}>{currentStats.hiringRate}</Text>
            <Text style={styles.statLabel}>Hiring Rate</Text>
          </View>

          {/* Card 4: Avg Team Size */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIconText}>👥</Text>
            </View>
            <Text style={styles.statValue}>{currentStats.avgTeamSize}</Text>
            <Text style={styles.statLabel}>Avg Team Size</Text>
          </View>
        </View>

        {/* Top Industries Chart */}
        <View style={styles.industriesCard}>
          <View style={styles.industriesTitleRow}>
            <Text style={{ fontSize: 18 }}>🏭</Text>
            <Text style={styles.industriesTitleText}>Top Industries</Text>
          </View>

          <View style={styles.industriesList}>
            {currentStats.industries.map((ind, index) => (
              <View key={index} style={styles.industryRow}>
                <View style={styles.industryLabels}>
                  <Text style={styles.industryName}>{ind.name}</Text>
                  <Text style={styles.industryCount}>
                    {ind.count} ({ind.percentage}%)
                  </Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${ind.percentage}%`,
                        backgroundColor: ind.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Fun Fact Card */}
        <View style={styles.funFactCard}>
          <View style={styles.funFactIconBox}>
            <Text style={styles.funFactIconText}>💡</Text>
          </View>
          <Text style={styles.funFactText}>
            <Text style={styles.funFactHighlight}>Fun Fact: </Text>
            {currentStats.funFact}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
