import { useMemo } from "react";
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
import { countries, industries, statistics } from "@/data/home";
import { useGetCompanyList } from "@/services/apiService";

// Helper to determine initials avatar colors based on company name
const getAvatarTheme = (name: string) => {
  const char = (name || "").charAt(0).toUpperCase();
  const code = char.charCodeAt(0) || 0;

  const themes = [
    { bg: "rgba(255, 102, 0, 0.08)", text: Colors.appColors.primary }, // YC Orange tint
    { bg: "rgba(46, 125, 50, 0.08)", text: "#2E7D32" }, // Green tint
    { bg: "rgba(13, 71, 161, 0.08)", text: "#0D47A1" }, // Blue tint
    { bg: "rgba(74, 20, 140, 0.08)", text: "#4A148C" }, // Purple tint
    { bg: "rgba(245, 127, 23, 0.08)", text: "#F57F17" }, // Amber tint
    { bg: "rgba(0, 96, 100, 0.08)", text: "#006064" }, // Cyan tint
    { bg: "rgba(216, 67, 21, 0.08)", text: "#D84315" }, // Coral tint
    { bg: "rgba(26, 35, 126, 0.08)", text: "#1A237E" }, // Indigo tint
  ];

  return themes[code % themes.length];
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const companyListPayload = useMemo(
    () => ({
      limit: 50,
      offset: 0,
      batch: "Winter 2025",
    }),
    [],
  );

  const { data: companyList, isLoading: isCompanyLoading } =
    useGetCompanyList(companyListPayload);

  const companies = companyList?.companies || [];

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
    const description =
      item.description || item.one_liner || item.long_description || "";

    const batch = item.batch;

    const sourceLabel =
      item.source === "producthunt"
        ? "Product Hunt"
        : item.source
          ? item.source.toUpperCase()
          : "";
    const showYC = !batch && !sourceLabel;

    const category = item.category || item.industry || "General";

    const logoUrl = item.small_logo_thumb_url;

    const avatarTheme = getAvatarTheme(item?.name);

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
                !logoUrl && { backgroundColor: avatarTheme.bg },
              ]}
            >
              {logoUrl ? (
                <Image
                  source={{ uri: logoUrl }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
              ) : (
                <Text style={[styles.logoText, { color: avatarTheme.text }]}>
                  {item?.name ? item?.name.charAt(0).toUpperCase() : ""}
                </Text>
              )}
            </View>

            <View style={styles.cardTitleInfo}>
              <Text style={styles.startupName} numberOfLines={1}>
                {item?.name}
              </Text>

              <View style={styles.metaTextRow}>
                {batch && <Text style={styles.startupMeta}>{batch}</Text>}
                {batch && sourceLabel && <Text style={styles.metaDot}>•</Text>}
                {sourceLabel && (
                  <Text style={styles.metaSource}>{sourceLabel}</Text>
                )}
                {showYC && <Text style={styles.startupMeta}>YC</Text>}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.startupDesc} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.tagContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{category}</Text>
            </View>

            {batch && (
              <View style={styles.batchBadge}>
                <Text style={styles.batchText}>{batch}</Text>
              </View>
            )}

            {item?.is_hiring > 0 && (
              <View style={styles.hiringBadge}>
                <View style={styles.hiringDot} />
                <Text style={styles.hiringText}>Hiring</Text>
              </View>
            )}
          </View>

          <View style={styles.cardArrowBtn}>
            <Image source={Images.arrow_right} style={styles.footerArrowIcon} />
          </View>
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
          data={companies.slice(0, 10)}
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

  // Main Render

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
