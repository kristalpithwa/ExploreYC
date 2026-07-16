import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  countries,
  industries,
  statistics,
  trendingStartups,
} from "@/data/home";

import styles from "./styles";
import { Colors, Images, Responsive } from "@/theme";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Render Methods

  const renderTrendingStartups = ({ item: startup }: { item: any }) => {
    return (
      <Pressable
        key={startup.id}
        style={styles.startupCard}
        onPress={() =>
          router.push({
            pathname: "/(home)/companyDetails",
            params: { id: startup.id },
          })
        }
      >
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
            <Text style={styles.categoryBadgeText}>{startup.category}</Text>
          </View>
          <Pressable style={styles.cardArrowBtn}>
            <Image
              source={Images.arrow_right}
              style={styles.footerArrowIcon}
              tintColor={Colors.appColors.primary}
            />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const renderYCStatistic = ({ item: stat }: { item: any }) => {
    return (
      <View style={styles.statCard}>
        <Image
          source={stat.icon}
          style={styles.statIcon}
          tintColor={stat.color}
        />
        <Text style={styles.statCount}>{stat.count}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    );
  };

  const renderCountryPill = ({
    item: country,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const isActive = index === 0; // USA active
    return (
      <Pressable
        style={[
          styles.pillButton,
          isActive ? styles.pillButtonActive : styles.pillButtonInactive,
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
  };

  const renderIndustryCard = ({ item: ind }: { item: any }) => {
    return (
      <View style={styles.industryCard}>
        <Text style={styles.industryEmoji}>{ind.emoji}</Text>
        <View style={styles.industryInfo}>
          <Text style={styles.industryName}>{ind.name}</Text>
          <Text style={styles.industryCount}>{ind.count}</Text>
        </View>
      </View>
    );
  };

  const renderMainContent = () => {
    return (
      <>
        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Image
              contentFit="contain"
              source={Images.search}
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholderTextColor={Colors.appColors.tertiary}
              placeholder="Search YC companies, founders, AI startups..."
            />
          </View>
        </View>

        {/* Trending Startups Section */}
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

        <FlatList
          horizontal
          decelerationRate="fast"
          data={trendingStartups}
          renderItem={renderTrendingStartups}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={Responsive.widthPercentageToDP(79)} // card width (74.7%) + gap (4.3%)
          contentContainerStyle={styles.horizontalScrollContent}
        />

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
          <FlatList
            data={statistics}
            numColumns={2}
            renderItem={renderYCStatistic}
            contentContainerStyle={styles.statsGrid}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Browse by Country Section */}
        <Text style={styles.countryTitle}>🌍 Browse by Country</Text>

        <FlatList
          data={countries}
          horizontal
          renderItem={renderCountryPill}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.horizontalPillsContent}
        />

        {/* Browse by Industry Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🏭 Browse by Industry</Text>
          <FlatList
            data={industries}
            numColumns={2}
            renderItem={renderIndustryCard}
            contentContainerStyle={styles.industriesGrid}
            keyExtractor={(item, index) => index.toString()}
          />

          <Pressable style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreBtnText}>See More Industries</Text>
            <Image
              source={Images.arrow_right}
              style={styles.seeMoreArrowIcon}
              tintColor={Colors.appColors.secondary}
            />
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText}>👋 Good Morning</Text>
          <Text style={styles.appTitleText}>ExploreYC</Text>
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

      <FlatList
        data={[0]}
        renderItem={renderMainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
