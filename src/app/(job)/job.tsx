import { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Colors, Images, Responsive } from "@/theme";
import styles from "./styles";
import FilterModal from "../../components/FilterModal/FilterModal";

interface Startup {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  batch: string;
  description: string;
  category: string;
  bookmarked: boolean;
  hiring: boolean;
  tags: string[];
  stage: string;
  valuation: string;
  status: string;
}

const mockStartups: Startup[] = [
  {
    id: "1",
    name: "SynthGrid",
    logo: "S",
    logoBg: Colors.appColors.primary,
    batch: "W24 • 🇺🇸",
    description:
      "Generative infrastructure for industrial manufacturing robots. Scaling precision with AI.",
    category: "AI",
    bookmarked: false,
    hiring: true,
    tags: ["W24", "AI", "USA", "YC"],
    stage: "Series A",
    valuation: "$12.4M Raised",
    status: "Active",
  },
  {
    id: "2",
    name: "VaultFlow",
    logo: "V",
    logoBg: Colors.appColors.brandBlue,
    batch: "S23 • 🇬🇧",
    description:
      "Automated treasury management for high-growth tech companies. Integrated with 50+ global banks.",
    category: "Fintech",
    bookmarked: true,
    hiring: true,
    tags: ["S23", "Fintech", "UK", "a16z"],
    stage: "Seed",
    valuation: "$4.5M Raised",
    status: "Active",
  },
  {
    id: "3",
    name: "Lumina Health",
    logo: "L",
    logoBg: Colors.appColors.brandGreen,
    batch: "W24 • 🇺🇸",
    description:
      "AI-powered diagnostic assistant for rural clinics. Bringing specialty care to everyone.",
    category: "Healthtech",
    bookmarked: false,
    hiring: false,
    tags: ["W24", "Healthtech", "USA", "YC"],
    stage: "Pre-Seed",
    valuation: "$1.2M Raised",
    status: "Active",
  },
];

const quickFilters = [
  { id: "hiring", label: "Hiring", icon: Images.briefcase },
  { id: "ai", label: "AI", icon: Images.category },
  { id: "usa", label: "USA", icon: Images.globe },
  { id: "top", label: "Top Companies", icon: Images.building },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: YC, 2: a16z
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({
    "2": true, // VaultFlow bookmarked initially
  });

  // Filter Modal States
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Active",
  ]);
  const [hiringOnly, setHiringOnly] = useState(true);
  const [topCompaniesOnly, setTopCompaniesOnly] = useState(false);
  const [foundedRange, setFoundedRange] = useState<[number, number]>([
    2010, 2026,
  ]);

  // Calculate sliding indicator animation values
  const paddingHorizontal = screenWidth * 0.053 * 2;
  const containerWidth = screenWidth - paddingHorizontal;
  const tabWidth = (containerWidth - 8) / 3;

  const indicatorTranslateX = useSharedValue(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    indicatorTranslateX.value = withSpring(index * tabWidth, {
      damping: 15,
      stiffness: 120,
    });
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorTranslateX.value }],
      width: tabWidth,
    };
  });

  const handlePillPress = (id: string) => {
    if (selectedPills.includes(id)) {
      setSelectedPills(selectedPills.filter((p) => p !== id));
    } else {
      setSelectedPills([...selectedPills, id]);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const resetFilters = () => {
    setSelectedBatch("All Batches");
    setSelectedIndustry("All Industries");
    setSelectedStatuses(["Active"]);
    setHiringOnly(true);
    setTopCompaniesOnly(false);
    setFoundedRange([2010, 2026]);
    setActiveTab(0);
    indicatorTranslateX.value = withSpring(0, {
      damping: 15,
      stiffness: 120,
    });
    setSelectedPills([]);
  };

  // Filter mock startups based on active tab, search query, and applied filters
  const filteredStartups = useMemo(() => {
    return mockStartups.filter((item) => {
      // 1. Tab filter (All, YC, a16z)
      if (activeTab === 1 && !item.tags.includes("YC")) return false;
      if (activeTab === 2 && !item.tags.includes("a16z")) return false;

      // 2. Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      // 3. Quick pills filter (from horizontal scroll list)
      if (selectedPills.length > 0) {
        for (const pill of selectedPills) {
          if (pill === "hiring" && !item.hiring) return false;
          if (pill === "ai" && item.category !== "AI") return false;
          if (pill === "usa" && !item.tags.includes("USA")) return false;
          if (pill === "top" && !item.valuation.includes("M Raised"))
            return false;
        }
      }

      // 4. Batch filter
      if (selectedBatch !== "All Batches") {
        if (!item.batch.includes(selectedBatch)) return false;
      }

      // 5. Industry filter
      if (selectedIndustry !== "All Industries") {
        if (item.category !== selectedIndustry) return false;
      }

      // 6. Status filter
      if (selectedStatuses.length > 0) {
        if (!selectedStatuses.includes(item.status)) return false;
      }

      // 7. Hiring Only toggle
      if (hiringOnly && !item.hiring) return false;

      // 8. Top Companies toggle
      if (topCompaniesOnly && !item.tags.includes("YC")) return false;

      return true;
    });
  }, [
    activeTab,
    searchQuery,
    selectedPills,
    selectedBatch,
    selectedIndustry,
    selectedStatuses,
    hiringOnly,
    topCompaniesOnly,
  ]);

  const renderHeader = () => {
    return (
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Discover</Text>
          <Text style={styles.logoText}>Find startups from YC & a16z</Text>
        </View>

        <Image
          source="https://lh3.googleusercontent.com/aida-public/AB6AXuCt-7PX5Fn-j-CecPsBgfD93M3Od4IdpNU5PvTf4at0TtsbAve_wdJ01dGXfjMNT8-4GeKt2PBK8ZrS4VC67z5ef4wBruwDeg6AyDiWVvcuIEJ3mtgS-rkLJpLWmSlyFe66QHhtIs4-xbcDUQAxJjMujAxUuwCaJrEpC_ntw_ssz0Deghft43ftH1Uevw0xTUFwn0ltiJDPKujZ9UGjM-_O6Xrjw8dtGUx4V3UzGCzZil68FlSt9zvOJrzCse8QX27Aog53ydVkcM6P"
          style={styles.avatar}
        />
      </View>
    );
  };

  const renderListHeader = () => {
    return (
      <View>
        {/* Hero Title Section */}
        {/* <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Discover</Text>
          <Text style={styles.heroSubtitle}>Find startups from YC & a16z</Text>
        </View> */}

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Image
              source={Images.search}
              style={styles.searchIcon}
              contentFit="contain"
            />
            <TextInput
              placeholder="Search startups, batches, or tech..."
              placeholderTextColor={Colors.appColors.grayMuted}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            <View style={styles.searchRightIcons}>
              <Pressable style={styles.searchBtn}>
                <Image
                  source={Images.bell}
                  style={styles.searchRightIcon}
                  contentFit="contain"
                />
              </Pressable>
              <View style={styles.searchDivider} />
              <Pressable
                style={styles.searchBtn}
                onPress={() => setIsFilterModalVisible(true)}
              >
                <Image
                  source={Images.category}
                  style={styles.searchRightIcon}
                  contentFit="contain"
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Segmented control tab bar */}
        <View style={styles.tabsSection}>
          <View style={styles.tabsContainer}>
            <Animated.View
              style={[styles.tabIndicator, indicatorAnimatedStyle]}
            />
            <Pressable
              style={styles.tabButton}
              onPress={() => handleTabPress(0)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color:
                      activeTab === 0
                        ? Colors.appColors.white
                        : Colors.appColors.tertiary,
                    fontWeight: activeTab === 0 ? "700" : "500",
                  },
                ]}
              >
                All
              </Text>
            </Pressable>
            <Pressable
              style={styles.tabButton}
              onPress={() => handleTabPress(1)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color:
                      activeTab === 1
                        ? Colors.appColors.white
                        : Colors.appColors.tertiary,
                    fontWeight: activeTab === 1 ? "700" : "500",
                  },
                ]}
              >
                YC
              </Text>
            </Pressable>
            <Pressable
              style={styles.tabButton}
              onPress={() => handleTabPress(2)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color:
                      activeTab === 2
                        ? Colors.appColors.white
                        : Colors.appColors.tertiary,
                    fontWeight: activeTab === 2 ? "700" : "500",
                  },
                ]}
              >
                a16z
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Horizontal Quick Filters */}
        <View style={styles.filtersSection}>
          <FlatList
            horizontal
            data={quickFilters}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
            renderItem={({ item }) => {
              const isActive = selectedPills.includes(item.id);
              return (
                <Pressable
                  style={[
                    styles.filterPill,
                    isActive && styles.filterPillActive,
                  ]}
                  onPress={() => handlePillPress(item.id)}
                >
                  <Image
                    source={item.icon}
                    style={[
                      styles.filterIcon,
                      {
                        tintColor: isActive
                          ? Colors.appColors.primary
                          : Colors.appColors.tertiary,
                      },
                    ]}
                    contentFit="contain"
                  />
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive && styles.filterPillTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        {/* Results Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listCountText}>
            {filteredStartups.length} Companies Found
          </Text>
          <Pressable style={styles.sortButton}>
            <Image
              source={Images.arrow_right}
              style={[styles.sortIcon, { transform: [{ rotate: "90deg" }] }]}
              contentFit="contain"
            />
            <Text style={styles.sortText}>Sort: Relevance</Text>
          </Pressable>
        </View>
        <View style={{ height: 12 }} />
      </View>
    );
  };

  const renderStartupCard = ({ item: startup }: { item: Startup }) => {
    const isBookmarked = !!bookmarks[startup.id];
    return (
      <View
        style={[
          styles.card,
          { marginHorizontal: Responsive.widthPercentageToDP(5.3) },
        ]}
      >
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.cardLogoContainer,
              { backgroundColor: startup.logoBg },
            ]}
          >
            <Text style={styles.cardLogoText}>{startup.logo}</Text>
          </View>

          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{startup.name}</Text>
            <View style={styles.cardStatusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{startup.status}</Text>
            </View>
          </View>

          <Pressable
            style={styles.bookmarkBtn}
            onPress={() => toggleBookmark(startup.id)}
          >
            <Image
              source={Images.bookmark}
              style={styles.bookmarkIcon}
              tintColor={
                isBookmarked
                  ? Colors.appColors.primary
                  : Colors.appColors.bookmarkInactive
              }
              contentFit="contain"
            />
          </Pressable>
        </View>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {startup.description}
        </Text>

        <View style={styles.cardTagsContainer}>
          {startup.tags.map((tag) => {
            const isSpecial = tag === "YC" || tag === "a16z";
            return (
              <View
                key={tag}
                style={[styles.tag, isSpecial && styles.specialTag]}
              >
                <Text
                  style={[styles.tagText, isSpecial && styles.specialTagText]}
                >
                  {tag}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerStage}>{startup.stage}</Text>
            <Text style={styles.footerValuation}>{startup.valuation}</Text>
          </View>

          <Pressable
            style={styles.viewDetailsBtn}
            onPress={() =>
              router.push({
                pathname: "/(home)/companyDetails",
                params: { id: startup.id },
              })
            }
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Image
              source={Images.arrow_right}
              style={styles.viewDetailsIcon}
              tintColor={Colors.appColors.primary}
              contentFit="contain"
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      {renderHeader()}

      {/* Flat Scrollable List */}
      <FlatList
        data={filteredStartups}
        renderItem={renderStartupCard}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
      />

      {/* Filter Bottom Sheet Modal */}
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        selectedBatch={selectedBatch}
        onSelectBatch={setSelectedBatch}
        selectedIndustry={selectedIndustry}
        onSelectIndustry={setSelectedIndustry}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
        hiringOnly={hiringOnly}
        onToggleHiringOnly={setHiringOnly}
        topCompaniesOnly={topCompaniesOnly}
        onToggleTopCompaniesOnly={setTopCompaniesOnly}
        foundedRange={foundedRange}
        onSelectFoundedRange={setFoundedRange}
        onReset={resetFilters}
      />

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Image
          source={Images.category}
          style={styles.fabIcon}
          contentFit="contain"
        />
        <Text style={styles.fabText}>Filters</Text>
      </Pressable>
    </View>
  );
}
