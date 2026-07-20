import { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors, Images } from "@/theme";
import { getAvatarTheme } from "@/utils/common";
import FilterModal from "@/components/FilterModal/FilterModal";
import { useGetCompanyListInfinite } from "@/services/apiService";

interface Company {
  id: number;
  name: string;
  one_liner?: string;
  long_description?: string;
  source?: string;
  batch?: string | null;
  industry?: string | null;
  is_hiring?: boolean | number;
  small_logo_thumb_url?: string | null;
}

export default function AllCompaniesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Advanced Filter states driven by Backend API dropdowns
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [topCompaniesOnly, setTopCompaniesOnly] = useState(false);

  const companyListPayload = useMemo(
    () => ({
      limit: 30,
      search: searchQuery || undefined,
      batch: selectedBatch || undefined,
      industry: selectedIndustry || undefined,
      country: selectedCountry || undefined,
      source: selectedSource || undefined,
      is_hiring: hiringOnly ? true : undefined,
      top_company: topCompaniesOnly ? true : undefined,
    }),
    [
      searchQuery,
      selectedBatch,
      selectedIndustry,
      selectedCountry,
      selectedSource,
      hiringOnly,
      topCompaniesOnly,
    ],
  );

  console.log("companyListPayload =>", companyListPayload);

  // API Method

  const {
    data: companyListPages,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetCompanyListInfinite(companyListPayload);

  const companies = useMemo(
    () =>
      companyListPages?.pages
        .flatMap((page: any) => page?.companies || [])
        .filter(Boolean) || [],
    [companyListPages],
  );

  // Active filter count calculation

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBatch) count++;
    if (selectedIndustry) count++;
    if (selectedCountry) count++;
    if (selectedSource) count++;
    if (hiringOnly) count++;
    if (topCompaniesOnly) count++;
    return count;
  }, [
    selectedBatch,
    selectedIndustry,
    selectedCountry,
    selectedSource,
    hiringOnly,
    topCompaniesOnly,
  ]);

  // Active filter items list for tag pills

  const activeFilterItems = useMemo(() => {
    const items: { id: string; label: string; onRemove: () => void }[] = [];

    if (selectedSource) {
      let formattedSource = selectedSource.toUpperCase();
      const lower = selectedSource.toLowerCase();
      if (lower === "ycombinator" || lower === "yc") {
        formattedSource = "YC";
      } else if (lower === "producthunt") {
        formattedSource = "Product Hunt";
      } else if (lower === "hackernews") {
        formattedSource = "Hacker News";
      } else if (lower === "a16z") {
        formattedSource = "a16z";
      }
      items.push({
        id: "source",
        label: `Source: ${formattedSource}`,
        onRemove: () => setSelectedSource(""),
      });
    }

    if (selectedBatch) {
      items.push({
        id: "batch",
        label: `Batch: ${selectedBatch}`,
        onRemove: () => setSelectedBatch(""),
      });
    }

    if (selectedIndustry) {
      items.push({
        id: "industry",
        label: `Industry: ${selectedIndustry}`,
        onRemove: () => setSelectedIndustry(""),
      });
    }

    if (selectedCountry) {
      items.push({
        id: "country",
        label: `Country: ${selectedCountry}`,
        onRemove: () => setSelectedCountry(""),
      });
    }

    if (hiringOnly) {
      items.push({
        id: "hiring",
        label: "Hiring Only",
        onRemove: () => setHiringOnly(false),
      });
    }

    if (topCompaniesOnly) {
      items.push({
        id: "top_company",
        label: "Top Companies",
        onRemove: () => setTopCompaniesOnly(false),
      });
    }

    return items;
  }, [
    selectedSource,
    selectedBatch,
    selectedIndustry,
    selectedCountry,
    hiringOnly,
    topCompaniesOnly,
  ]);

  // FlatList Method

  const renderCompanyItem = ({ item }: { item: Company }) => {
    const logoUrl = item?.small_logo_thumb_url;
    const name = item?.name || "";
    const description = item?.one_liner || item?.long_description || "";
    const batch = item?.batch;
    const sourceLabel =
      item?.source === "producthunt"
        ? "Product Hunt"
        : item?.source
          ? item?.source?.toUpperCase()
          : "";
    const showYC = !batch && !sourceLabel;
    const category = item?.industry || "General";
    const avatarTheme = getAvatarTheme(name);
    const isHiring = Boolean(item?.is_hiring);

    return (
      <Pressable style={styles.card} onPress={() => onPressCompanyCard(item)}>
        <View style={styles.cardTop}>
          <View style={styles.cardTopLeft}>
            <View
              style={[
                styles.logoWrapper,
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
                  {name ? name.charAt(0).toUpperCase() : ""}
                </Text>
              )}
            </View>

            <View style={styles.cardHeaderInfo}>
              <Text style={styles.companyName} numberOfLines={1}>
                {name}
              </Text>
              <View style={styles.metaTextRow}>
                {batch && <Text style={styles.metaText}>{batch}</Text>}
                {batch && sourceLabel && <Text style={styles.metaDot}>•</Text>}
                {sourceLabel && (
                  <Text style={styles.metaSource}>{sourceLabel}</Text>
                )}
                {showYC && <Text style={styles.metaText}>YC</Text>}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.oneLiner} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.cardBottom}>
          <View style={styles.tagContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>

            {batch && (
              <View style={styles.batchBadge}>
                <Text style={styles.batchText}>{batch}</Text>
              </View>
            )}

            {isHiring && (
              <View style={styles.hiringBadge}>
                <View style={styles.hiringDot} />
                <Text style={styles.hiringText}>Hiring</Text>
              </View>
            )}
          </View>

          <View style={styles.arrowBtn}>
            <Image source={Images.arrow_right} style={styles.arrowIcon} />
          </View>
        </View>
      </Pressable>
    );
  };

  const renderListFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color={Colors.appColors.primary} />
        </View>
      );
    }

    return null;
  };

  const renderEmptyCards = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={Colors.appColors.primary} />
          <Text style={styles.emptyTitle}>Loading Startups...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Image
          source={Images.search}
          style={styles.emptyIcon}
          tintColor={Colors.appColors.borderLight}
        />
        <Text style={styles.emptyTitle}>No Startups Found</Text>
        <Text style={styles.emptySubtitle}>
          We couldn't find any startups matching your selected criteria. Try
          adjusting or clearing your filters.
        </Text>
      </View>
    );
  };

  const onLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // onPress Methods

  const onPressCompanyCard = (item: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { id: item.id },
    });
  };

  const onPressResetAllFilters = () => {
    setSelectedBatch("");
    setSelectedIndustry("");
    setSelectedCountry("");
    setSelectedSource("");
    setHiringOnly(false);
    setTopCompaniesOnly(false);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          hitSlop={12}
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>All Startups</Text>
        </View>
      </View>

      {/* Search Input & Filter Button */}
      <View style={styles.searchRow}>
        <View
          style={[
            styles.searchBarFlex,
            isSearchFocused && styles.searchBarContainerFocused,
          ]}
        >
          <Image
            contentFit="contain"
            source={Images.search}
            style={styles.searchIcon}
            tintColor={
              isSearchFocused
                ? Colors.appColors.primary
                : Colors.appColors.tertiary
            }
          />
          <TextInput
            placeholder="Search startups, solutions..."
            placeholderTextColor={Colors.appColors.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            clearButtonMode="while-editing"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </View>

        <Pressable
          style={[
            styles.filterBtn,
            activeFilterCount > 0 && styles.filterBtnActive,
          ]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Image
            source={Images.category}
            style={styles.filterIcon}
            tintColor={
              activeFilterCount > 0
                ? Colors.appColors.primary
                : Colors.appColors.secondary
            }
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Active Filter Tags Pill Row */}
      {activeFilterItems.length > 0 && (
        <View style={styles.activeFiltersRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activeFiltersContent}
          >
            {activeFilterItems.map((item) => (
              <Pressable
                key={item.id}
                style={styles.activeTag}
                onPress={item.onRemove}
              >
                <Text style={styles.activeTagText}>{item.label}</Text>
                <Text style={styles.activeTagClose}>✕</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.clearAllBtn}
              onPress={() => onPressResetAllFilters()}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </Pressable>
          </ScrollView>
        </View>
      )}

      {/* Startup Cards List */}
      <FlatList
        data={companies}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={renderCompanyItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyCards}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedBatch={selectedBatch}
        onSelectBatch={setSelectedBatch}
        selectedIndustry={selectedIndustry}
        onSelectIndustry={setSelectedIndustry}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        selectedSource={selectedSource}
        onSelectSource={setSelectedSource}
        hiringOnly={hiringOnly}
        onToggleHiringOnly={setHiringOnly}
        topCompaniesOnly={topCompaniesOnly}
        onToggleTopCompaniesOnly={setTopCompaniesOnly}
        onReset={() => onPressResetAllFilters()}
        onApply={() => {
          // Filters apply reactively via state update
        }}
      />
    </View>
  );
}
