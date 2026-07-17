import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors, Images, Responsive } from "@/theme";
import { countries, getCompanyData, industries, statistics } from "@/data/home";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // onPress Methods

  const onPressCompanyCard = (item: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { id: item.id },
    });
  };

  const onPressCountryPill = (item: any, index: number) => {
    router.push({
      pathname: "/(home)/countryDetails",
      params: { country: item },
    });
  };

  const onPressIndustryCard = (item: any) => {
    router.push({
      pathname: "/(home)/industryDetails",
      params: { industry: item.name },
    });
  };

  // Render Methods

  const renderTrendingStartups = ({ item }: { item: any }) => {
    const name = item.name || "";

    const description =
      item.description || item.one_liner || item.long_description || "";

    const batch =
      item.batch || (item.source ? item.source.toUpperCase() : "YC");

    const category = item.category || item.industry || "General";

    const logoUrl = item.small_logo_thumb_url;
    const logoText = name ? name.charAt(0).toUpperCase() : "";

    return (
      <Pressable
        key={item.id}
        style={styles.startupCard}
        onPress={() => onPressCompanyCard(item)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View
              style={[
                styles.logoContainer,
                {
                  backgroundColor: logoUrl
                    ? "transparent"
                    : Colors.appColors.primary,
                  overflow: "hidden",
                },
              ]}
            >
              {logoUrl ? (
                <Image
                  source={{ uri: logoUrl }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
              ) : (
                <Text style={styles.logoText}>{logoText}</Text>
              )}
            </View>

            <View style={styles.cardTitleInfo}>
              <Text style={styles.startupName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.startupMeta}>{batch}</Text>
            </View>
          </View>

          <Pressable>
            <Image
              source={Images.bookmark}
              style={[
                styles.bookmarkIcon,
                {
                  tintColor: item?.bookmarked
                    ? Colors.appColors.primary
                    : Colors.appColors.bookmarkInactive,
                },
              ]}
            />
          </Pressable>
        </View>

        <Text style={styles.startupDesc} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{category}</Text>
          </View>

          <Pressable style={styles.cardArrowBtn}>
            <Image source={Images.arrow_right} style={styles.footerArrowIcon} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const renderYCStatistic = ({ item }: { item: any }) => {
    return (
      <View style={styles.statCard}>
        <Image
          source={item.icon}
          style={styles.statIcon}
          tintColor={item.color}
        />
        <Text style={styles.statCount}>{item.count}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </View>
    );
  };

  const renderCountryPill = ({ item, index }: { item: any; index: number }) => {
    const isActive = index === 0; // USA active

    return (
      <Pressable
        style={[
          styles.pillButton,
          isActive ? styles.pillButtonActive : styles.pillButtonInactive,
        ]}
        onPress={() => onPressCountryPill(item, index)}
      >
        <Text
          style={[
            styles.pillButtonText,
            isActive
              ? styles.pillButtonTextActive
              : styles.pillButtonTextInactive,
          ]}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  const renderIndustryCard = ({ item }: { item: any }) => {
    return (
      <Pressable
        style={styles.industryCard}
        onPress={() => onPressIndustryCard(item)}
      >
        <Text style={styles.industryEmoji}>{item.emoji}</Text>
        <View style={styles.industryInfo}>
          <Text style={styles.industryName}>{item.name}</Text>
          <Text style={styles.industryCount}>{item.count}</Text>
        </View>
      </Pressable>
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
          <Pressable onPress={() => router.push("/(home)/allCompanies")}>
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
          data={getCompanyData?.companies?.slice(0, 10)}
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
            <Pressable
              style={styles.heroExploreBtn}
              onPress={() => router.push("/(home)/batchExplorer")}
            >
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
