import { useMemo, useState } from "react";
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

import {
  useGetCompanyList,
  useGetStats,
  useGetFoundersLeaderboard,
} from "@/services/apiService";
import { getAvatarTheme, INDUSTRY_EMOJIS } from "@/utils/common";
import { BASE_URL } from "@/network/config";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<
    number | null
  >(null);

  const { data: companyList } = useGetCompanyList({ limit: 10, offset: 0 });
  const { data: stats } = useGetStats();
  const { data: foundersLeaderboard } = useGetFoundersLeaderboard({
    limit: 10,
    metric: "funded",
  });

  const dynamicStatistics = useMemo(() => {
    // if (!stats) return statistics;

    const total = stats?.total_all_companies || stats?.total_companies || 0;
    const hiring = stats?.hiring || 0;
    const countriesCount = stats?.by_country
      ? Object.keys(stats?.by_country).length
      : 0;
    const industriesCount = stats?.by_industry
      ? Object.keys(stats?.by_industry).length
      : 0;

    return [
      {
        id: "1",
        count: total.toLocaleString(),
        label: "Funded Startups",
        icon: Images.building,
        color: Colors.appColors.primary,
      },
      {
        id: "2",
        count: hiring.toLocaleString(),
        label: "Hiring Companies",
        icon: Images.briefcase,
        color: Colors.defaults.DARK_GREEN,
      },
      {
        id: "3",
        count: `${countriesCount}+`,
        label: "Countries",
        icon: Images.globe,
        color: Colors.defaults.BLUE,
      },
      {
        id: "4",
        count: `${industriesCount}+`,
        label: "Industries",
        icon: Images.category,
        color: Colors.appColors.brandRed,
      },
    ];
  }, [stats]);

  const dynamicCountries = useMemo(() => {
    if (stats?.by_country) {
      const keys = Object.keys(stats.by_country);
      if (keys.length > 0) return keys;
    }
    // return countries;
  }, [stats]);

  const dynamicIndustries = useMemo(() => {
    if (stats?.by_industry) {
      const entries = Object.entries(stats?.by_industry);
      if (entries.length > 0) {
        return entries.map(([name, count]) => ({
          emoji: INDUSTRY_EMOJIS[name] || "💼",
          name,
          count: `${count} Startups`,
        }));
      }
    }
    // return industries;
  }, [stats]);

  const getImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return BASE_URL.replace("/api", "") + url;
  };

  // onPress Methods

  const onPressViewAll = () => {
    router.push("/(home)/allCompanies");
  };

  const onPressCompanyCard = (item: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { slug: item.slug },
    });
  };

  const onPressCountryPill = (item: any, index: number) => {
    setSelectedCountryIndex(index);
    router.push({
      pathname: "/(home)/allCompanies",
      params: { country: item },
    });
  };

  const onPressIndustryCard = (item: any) => {
    router.push({
      pathname: "/(home)/allCompanies",
      params: { industry: item.name },
    });
  };

  const onPressFounderCard = (item: any) => {
    router.push({
      pathname: "/(home)/founderDetails",
      params: { slug: item.founder.slug },
    });
  };

  // Render Methods

  const renderTrendingStartups = ({ item }: { item: any }) => {
    const description =
      item.description || item.one_liner || item.long_description || "";

    const batch = item.batch;
    const sourceLabel = item.source.toUpperCase();
    const showYC = !batch && !sourceLabel;
    const category = item.category || item.industry || "General";
    const logoUrl = item.small_logo_thumb_url;
    const avatarTheme = getAvatarTheme(item?.name);

    return (
      <Pressable
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
    return (
      <Pressable
        style={styles.pillButton}
        onPress={() => onPressCountryPill(item, index)}
      >
        <Text style={styles.pillButtonText}>{item}</Text>
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

  const renderFounderCard = ({ item, index }: { item: any; index: number }) => {
    const avatarUrl = getImageUrl(item?.founder?.avatar_url);
    const name = item?.founder?.full_name || item?.founder?.slug || "";
    const title = item?.founder?.title || "Founder";
    const avatarTheme = getAvatarTheme(name);

    const isTop3 = item.rank <= 3;
    const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze
    const rankBg = isTop3
      ? rankColors[item.rank - 1]
      : Colors.appColors.primary;

    return (
      <Pressable
        style={styles.proFounderCard}
        onPress={() => onPressFounderCard(item)}
      >
        <View style={styles.proFounderCover}>
          <View style={[styles.proRankBadge, { backgroundColor: rankBg }]}>
            <Text style={styles.proRankText}>#{item.rank}</Text>
          </View>
        </View>

        <View style={styles.proAvatarWrapper}>
          <View
            style={[
              styles.proAvatarContainer,
              !avatarUrl && { backgroundColor: avatarTheme.bg },
            ]}
          >
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={styles.proAvatar}
                contentFit="cover"
              />
            ) : (
              <Text
                style={[styles.proAvatarInitial, { color: avatarTheme.text }]}
              >
                {name ? name.charAt(0).toUpperCase() : ""}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.proFounderInfo}>
          <Text style={styles.proFounderName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.proFounderTitle} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.proBadgesRow}>
            {item?.stats?.batches?.[0] && (
              <View style={styles.proBatchBadge}>
                <Text style={styles.proBatchText}>{item.stats.batches[0]}</Text>
              </View>
            )}
            {item?.stats?.companies_count > 0 && (
              <View style={styles.proCompanyBadge}>
                <Text style={styles.proCompanyText}>
                  {item.stats.companies_count} Startup
                  {item.stats.companies_count > 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.proStatDivider} />

        <View style={styles.proStatBox}>
          <View style={styles.proStatItem}>
            <Text style={styles.proStatLabel}>
              {item?.headline_stat?.label || "Total funding"}
            </Text>
            <Text style={styles.proStatValue}>
              {item?.headline_stat?.value || "$0"}
            </Text>
          </View>
          <View style={styles.proArrowBtn}>
            <Image source={Images.arrow_right} style={styles.proArrowIcon} />
          </View>
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
          <Pressable onPress={() => onPressViewAll()}>
            <View style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <Image
                contentFit="contain"
                style={styles.arrowIcon}
                source={Images.arrow_right}
              />
            </View>
          </Pressable>
        </View>

        <FlatList
          horizontal
          decelerationRate="fast"
          data={companyList?.companies || []}
          renderItem={renderTrendingStartups}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={Responsive.widthPercentageToDP(79)} // card width (74.7%) + gap (4.3%)
          contentContainerStyle={styles.horizontalScrollContent}
        />

        {/* Top Founders Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏆 Top Founders</Text>
          <Pressable onPress={() => router.push("/(home)/founderLeaderboard")}>
            <View style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <Image
                contentFit="contain"
                style={styles.arrowIcon}
                source={Images.arrow_right}
              />
            </View>
          </Pressable>
        </View>

        <FlatList
          horizontal
          decelerationRate="fast"
          data={foundersLeaderboard?.results || []}
          renderItem={renderFounderCard}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={Responsive.widthPercentageToDP(74.3)} // card width (70%) + gap (4.3%)
          contentContainerStyle={styles.horizontalScrollContent}
        />

        {/* Latest Batch Hero Section */}
        {/* <View style={styles.heroSection}>
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
        </View> */}

        {/* Statistics Grid Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📈 YC Statistics</Text>
          <FlatList
            data={dynamicStatistics}
            numColumns={2}
            renderItem={renderYCStatistic}
            contentContainerStyle={styles.statsGrid}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Browse by Country Section */}
        <Text style={styles.countryTitle}>🌍 Browse by Country</Text>

        <FlatList
          data={dynamicCountries}
          horizontal
          extraData={selectedCountryIndex}
          renderItem={renderCountryPill}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.horizontalPillsContent}
        />

        {/* Browse by Industry Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🏭 Browse by Industry</Text>
          <FlatList
            data={dynamicIndustries}
            numColumns={2}
            renderItem={renderIndustryCard}
            contentContainerStyle={styles.industriesGrid}
            keyExtractor={(item, index) => index.toString()}
          />
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
