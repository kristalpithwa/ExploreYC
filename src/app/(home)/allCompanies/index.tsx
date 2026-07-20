import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors, Images } from "@/theme";
import { useGetCompanyListInfinite } from "@/services/apiService";
import { getAvatarTheme } from "@/utils/common";
import FilterModal from "@/components/FilterModal/FilterModal";

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

const FILTER_CATEGORIES = [
  "All",
  "Hiring",
  "Product Hunt",
  "AI",
  "Fintech",
  "Productivity",
];

export default function AllCompaniesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Advanced Filter states driven by Backend API dropdowns
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [topCompaniesOnly, setTopCompaniesOnly] = useState(false);

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

  const resetAllFilters = () => {
    setSelectedBatch("");
    setSelectedIndustry("");
    setSelectedCountry("");
    setSelectedSource("");
    setHiringOnly(false);
    setTopCompaniesOnly(false);
    setSelectedCategory("All");
    setSearchQuery("");
  };

  // Build payload for infinite query
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

  const onLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
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

  // Quick category counts based on fetched data
  const categoryCounts = useMemo(() => {
    return {
      All: companies.length,
      Hiring: companies.filter((c) => Boolean(c.is_hiring)).length,
      "Product Hunt": companies.filter((c) => c.source === "producthunt")
        .length,
      AI: companies.filter((c) => {
        const desc = (c.long_description || "").toLowerCase();
        const oneLiner = (c.one_liner || "").toLowerCase();
        return (
          desc.includes("ai") ||
          desc.includes("artificial") ||
          oneLiner.includes("ai")
        );
      }).length,
      Fintech: companies.filter((c) => {
        const desc = (c.long_description || "").toLowerCase();
        const oneLiner = (c.one_liner || "").toLowerCase();
        return (
          desc.includes("finance") ||
          desc.includes("invest") ||
          desc.includes("tax") ||
          desc.includes("cash") ||
          desc.includes("rate") ||
          oneLiner.includes("invest")
        );
      }).length,
      Productivity: companies.filter((c) => {
        const desc = (c.long_description || "").toLowerCase();
        const oneLiner = (c.one_liner || "").toLowerCase();
        return (
          desc.includes("work") ||
          desc.includes("workspace") ||
          desc.includes("bookmark") ||
          desc.includes("pdf") ||
          desc.includes("mcp")
        );
      }).length,
    };
  }, [companies]);

  // Client side quick category pill filtering on top of server payload
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      if (selectedCategory === "All") return true;
      if (selectedCategory === "Hiring") return Boolean(company.is_hiring);
      if (selectedCategory === "Product Hunt")
        return company.source === "producthunt";
      if (selectedCategory === "AI") {
        const desc = (company.long_description || "").toLowerCase();
        const oneLiner = (company.one_liner || "").toLowerCase();
        return (
          desc.includes("ai") ||
          desc.includes("artificial") ||
          oneLiner.includes("ai")
        );
      }
      if (selectedCategory === "Fintech") {
        const desc = (company.long_description || "").toLowerCase();
        const oneLiner = (company.one_liner || "").toLowerCase();
        return (
          desc.includes("finance") ||
          desc.includes("invest") ||
          desc.includes("tax") ||
          desc.includes("cash") ||
          desc.includes("rate") ||
          oneLiner.includes("invest")
        );
      }
      if (selectedCategory === "Productivity") {
        const desc = (company.long_description || "").toLowerCase();
        const oneLiner = (company.one_liner || "").toLowerCase();
        return (
          desc.includes("work") ||
          desc.includes("workspace") ||
          desc.includes("bookmark") ||
          desc.includes("pdf") ||
          desc.includes("mcp")
        );
      }
      return true;
    });
  }, [selectedCategory, companies]);

  const onPressCompanyCard = (item: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { id: item.id },
    });
  };

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

  const renderFilter = ({ item }: { item: string }) => {
    const isActive = selectedCategory === item;
    const count = categoryCounts[item as keyof typeof categoryCounts] ?? 0;
    return (
      <Pressable
        onPress={() => setSelectedCategory(item)}
        style={[styles.pill, isActive && styles.pillActive]}
      >
        <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
          {item}
        </Text>
        <Text style={[styles.pillCount, isActive && styles.pillCountActive]}>
          {count}
        </Text>
      </Pressable>
    );
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
          <Text style={styles.headerSub}>
            {filteredCompanies.length} startup
            {filteredCompanies.length !== 1 ? "s" : ""} found
          </Text>
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

      {/* Category Filter Scroll */}
      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          data={FILTER_CATEGORIES}
          renderItem={renderFilter}
          style={styles.filterPillsScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContent}
          keyExtractor={(item, index) => index.toString()}
        />
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
            <Pressable style={styles.clearAllBtn} onPress={resetAllFilters}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </Pressable>
          </ScrollView>
        </View>
      )}

      {/* Startup Cards List */}
      <FlatList
        data={filteredCompanies}
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
        onReset={resetAllFilters}
        onApply={() => {
          // Filters apply reactively via state update
        }}
      />
    </View>
  );
}
