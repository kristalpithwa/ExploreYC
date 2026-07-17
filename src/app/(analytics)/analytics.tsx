import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      {/* Top App Bar */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 }, // Generous padding to avoid bottom floating tab bar
        ]}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>YC &amp; a16z Ecosystem Insights</Text>
          <Text style={styles.subTitle}>
            Real-time data from 5,000+ startups.
          </Text>
        </View>

        {/* Summary Grid 2x2 */}
        <View style={styles.summaryGrid}>
          {/* Companies Stat */}
          <View style={[styles.bentoCard, styles.statCard]}>
            <View style={[styles.statIconBox, styles.statIconBoxOrange]}>
              <Text style={styles.statEmojiTextOrange}>🏢</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>5,017</Text>
              <Text style={styles.statLabel}>Companies</Text>
            </View>
          </View>

          {/* Hiring Stat */}
          <View style={[styles.bentoCard, styles.statCard]}>
            <View style={[styles.statIconBox, styles.statIconBoxGray]}>
              <Text style={styles.statEmojiText}>💼</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>1,188</Text>
              <Text style={styles.statLabel}>Hiring</Text>
            </View>
          </View>

          {/* Countries Stat */}
          <View style={[styles.bentoCard, styles.statCard]}>
            <View style={[styles.statIconBox, styles.statIconBoxGray]}>
              <Text style={styles.statEmojiText}>🌍</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
          </View>

          {/* Industries Stat */}
          <View style={[styles.bentoCard, styles.statCard]}>
            <View style={[styles.statIconBox, styles.statIconBoxOrange]}>
              <Text style={styles.statEmojiTextOrange}>⚙️</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Industries</Text>
            </View>
          </View>
        </View>

        {/* Bento Grid Content */}
        <View style={styles.bentoGrid}>
          {/* Top Locations */}
          <View style={styles.bentoCard}>
            <Text style={styles.bentoTitle}>Top Locations</Text>
            <View style={styles.locationsList}>
              {/* US Bar */}
              <View style={styles.locationRow}>
                <View style={styles.locationLabels}>
                  <View style={styles.locationNameRow}>
                    <Text style={styles.locationFlag}>🇺🇸</Text>
                    <Text style={styles.locationName}>United States</Text>
                  </View>
                  <Text style={styles.locationValue}>3,901</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[styles.progressBarFill, styles.progressBarFillUS]}
                  />
                </View>
              </View>

              {/* India Bar */}
              <View style={styles.locationRow}>
                <View style={styles.locationLabels}>
                  <View style={styles.locationNameRow}>
                    <Text style={styles.locationFlag}>🇮🇳</Text>
                    <Text style={styles.locationName}>India</Text>
                  </View>
                  <Text style={styles.locationValue}>214</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      styles.progressBarFillIndia,
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* AI Insights Section */}
          <View style={[styles.bentoCard, styles.aiCard]}>
            <View style={styles.aiHeaderRow}>
              <Text style={styles.aiIconText}>✨</Text>
              <Text style={styles.aiTitle}>AI Insights</Text>
            </View>
            <View style={styles.aiInsightsList}>
              <View style={styles.aiInsightItem}>
                <View style={styles.aiInsightIconBox}>
                  <Text style={styles.aiInsightIcon}>📈</Text>
                </View>
                <Text style={styles.aiInsightText}>
                  <Text style={styles.aiInsightBold}>B2B SaaS </Text>
                  dominates, making up over 40% of recent batches.
                </Text>
              </View>

              <View style={styles.aiInsightItem}>
                <View style={styles.aiInsightIconBox}>
                  <Text style={styles.aiInsightIcon}>👥</Text>
                </View>
                <Text style={styles.aiInsightText}>
                  Hiring is concentrated in
                  <Text style={styles.aiInsightBold}> AI infrastructure </Text>
                  companies in SF.
                </Text>
              </View>

              <View style={styles.aiInsightItem}>
                <View style={styles.aiInsightIconBox}>
                  <Text style={styles.aiInsightIcon}>🌐</Text>
                </View>
                <Text style={styles.aiInsightText}>
                  International representation grew 12% in the last cohort.
                </Text>
              </View>
            </View>
          </View>

          {/* Industry Distribution Donut Mock */}
          <View style={styles.bentoCard}>
            <Text style={styles.bentoTitle}>Top Industries</Text>
            <View style={styles.donutSection}>
              <View style={styles.donutContainer}>
                {/* Visual Segments */}
                <View style={styles.donutOverlaySegment1} />
                <View style={styles.donutOverlaySegment2} />
                <View style={styles.donutCenterText}>
                  <Text style={styles.donutNumber}>4</Text>
                  <Text style={styles.donutLabel}>Sectors</Text>
                </View>
              </View>

              <View style={styles.donutLegendGrid}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, styles.legendColorPrimary]}
                  />
                  <Text style={styles.legendText}>B2B</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendColorPeach]} />
                  <Text style={styles.legendText}>AI</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendColorMuted]} />
                  <Text style={styles.legendText}>Fintech</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.legendColorLight]} />
                  <Text style={styles.legendText}>Health</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Batches Vertical Bars */}
          <View style={[styles.bentoCard, styles.recentBatchesCard]}>
            <Text style={styles.bentoTitle}>Recent Batches</Text>
            <View style={styles.barChartContainer}>
              {/* S23 */}
              <View style={styles.verticalBarGroup}>
                <View style={styles.verticalBarTrack}>
                  <View
                    style={[styles.verticalBarFill, styles.verticalBarS23]}
                  />
                </View>
                <Text style={styles.verticalBarLabel}>S23</Text>
              </View>

              {/* W24 */}
              <View style={styles.verticalBarGroup}>
                <View style={styles.verticalBarTrack}>
                  <View
                    style={[styles.verticalBarFill, styles.verticalBarW24]}
                  />
                </View>
                <Text style={styles.verticalBarLabel}>W24</Text>
              </View>

              {/* S24 */}
              <View style={styles.verticalBarGroup}>
                <View style={styles.verticalBarTrack}>
                  <View
                    style={[styles.verticalBarFill, styles.verticalBarS24]}
                  />
                </View>
                <Text
                  style={[
                    styles.verticalBarLabel,
                    styles.verticalBarLabelActive,
                  ]}
                >
                  S24
                </Text>
              </View>
            </View>
          </View>

          {/* Coming Soon Placeholder */}
          <View style={[styles.bentoCard, styles.placeholderCard]}>
            <Text style={styles.placeholderIcon}>📊</Text>
            <Text style={styles.placeholderTitle}>Source Distribution</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
