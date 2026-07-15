import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  countries,
  industries,
  statistics,
  trendingStartups,
} from "@/data/data";

import { Colors, Images, Responsive } from "@/theme";
import styles from "./styles";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.mainContainer,
        { paddingTop: Math.max(insets.top, Responsive.heightPercentageToDP(2)) },
      ]}
    >
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source="https://lh3.googleusercontent.com/aida-public/AB6AXuD7bUIjmyPh1C6YPkO-eNe7261-xqDbZzXLSJq2aQpxAS9ZlhY0g5F0J0BdbrTfyED88fofNNaViHJ1qBAu8TPLTr8da9bh5OgHMMwlSjKBNfQMY-2eWwo8EXQ4UtEjrbuN1zyrmoZHsVO_5zRwnMxyamDtYsV4MjsfDZ6qv3OKUvTYyhwxRcP_1QUuo7w5hy99WStfxttYzb3DFLcOT-j5Yjo5EczobebIeMAr5tRekql6jeWwN2yr15tCcoXwhAxbPrHsZfC4VVBR"
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.headerTexts}>
            <Text style={styles.greetingText}>👋 Good Morning</Text>
            <Text style={styles.appTitleText}>ExploreYC</Text>
          </View>
        </View>
        <Pressable style={styles.notificationButton}>
          <Image
            source={Images.bell}
            style={styles.bellIcon}
            tintColor={Colors.appColors.grayDark}
          />
          <View style={styles.notificationBadge} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Image
              source={Images.search}
              style={styles.searchIcon}
              tintColor={Colors.appColors.tertiary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search YC companies, founders, AI startups..."
              placeholderTextColor={Colors.appColors.tertiary}
            />
          </View>
        </View>

        {/* Trending Startups Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Startups</Text>
            <Pressable>
              <View style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View All</Text>
                <Image
                  source={Images.arrow_right}
                  style={styles.arrowIcon}
                  tintColor={Colors.appColors.primary}
                />
              </View>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
            snapToInterval={Responsive.widthPercentageToDP(79)} // card width (74.7%) + gap (4.3%)
            decelerationRate="fast"
          >
            {trendingStartups.map((startup) => (
              <View key={startup.id} style={styles.startupCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <View
                      style={[
                        styles.logoContainer,
                        { backgroundColor: startup.logoBg },
                      ]}
                    >
                      <Text style={styles.logoText}>{startup.logo}</Text>
                    </View>
                    <View style={styles.cardTitleInfo}>
                      <Text style={styles.startupName} numberOfLines={1}>
                        {startup.name}
                      </Text>
                      <Text style={styles.startupMeta}>{startup.batch}</Text>
                    </View>
                  </View>
                  <Pressable>
                    <Image
                      source={Images.bookmark}
                      style={styles.bookmarkIcon}
                      tintColor={
                        startup.bookmarked
                          ? Colors.appColors.primary
                          : Colors.appColors.bookmarkInactive
                      }
                    />
                  </Pressable>
                </View>
                <Text style={styles.startupDesc} numberOfLines={2}>
                  {startup.description}
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {startup.category}
                    </Text>
                  </View>
                  <Pressable style={styles.cardArrowBtn}>
                    <Image
                      source={Images.arrow_right}
                      style={styles.footerArrowIcon}
                      tintColor={Colors.appColors.primary}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Latest Batch Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroGradientBg}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroLabel}>Spring 2026</Text>
              <Text style={styles.heroTitle}>🚀 Latest YC Batch</Text>
            </View>
            <View style={styles.heroStatsContainer}>
              <View style={styles.heroStatBadge}>
                <Text style={styles.heroStatValue}>500</Text>
                <Text style={styles.heroStatLabel}>Companies</Text>
              </View>
              <View style={styles.heroStatBadge}>
                <Text style={styles.heroStatValue}>120</Text>
                <Text style={styles.heroStatLabel}>Hiring</Text>
              </View>
              <View style={styles.heroStatBadge}>
                <Text style={styles.heroStatValue}>80</Text>
                <Text style={styles.heroStatLabel}>AI Startups</Text>
              </View>
            </View>
            <Pressable style={styles.heroExploreBtn}>
              <Text style={styles.heroExploreBtnText}>Explore Batch</Text>
            </Pressable>
          </View>
        </View>

        {/* Statistics Grid Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📈 YC Statistics</Text>
          <View style={styles.statsGrid}>
            {statistics.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Image
                  source={stat.icon}
                  style={styles.statIcon}
                  tintColor={stat.color}
                />
                <Text style={styles.statCount}>{stat.count}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Browse by Country Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🌍 Browse by Country</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPillsContent}
          >
            {countries.map((country, idx) => {
              const isActive = idx === 0; // USA active
              return (
                <Pressable
                  key={country}
                  style={[
                    styles.pillButton,
                    isActive
                      ? styles.pillButtonActive
                      : styles.pillButtonInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.pillButtonText,
                      isActive
                        ? styles.pillButtonTextActive
                        : styles.pillButtonTextInactive,
                    ]}
                  >
                    {country}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Browse by Industry Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🏭 Browse by Industry</Text>
          <View style={styles.industriesGrid}>
            {industries.map((ind, idx) => (
              <View key={idx} style={styles.industryCard}>
                <Text style={styles.industryEmoji}>{ind.emoji}</Text>
                <View style={styles.industryInfo}>
                  <Text style={styles.industryName}>{ind.name}</Text>
                  <Text style={styles.industryCount}>{ind.count}</Text>
                </View>
              </View>
            ))}
          </View>
          <Pressable style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreBtnText}>See More Industries</Text>
            <Image
              source={Images.arrow_right}
              style={styles.seeMoreArrowIcon}
              tintColor={Colors.appColors.secondary}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
