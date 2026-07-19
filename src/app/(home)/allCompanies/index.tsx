import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors, Images } from "@/theme";
import { useGetCompanyListInfinite } from "@/services/apiService";

interface Company {
  id: number;
  name: string;
  one_liner?: string;
  long_description?: string;
  source?: string;
  batch?: string | null;
  industry?: string | null;
  is_hiring?: boolean;
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

export default function AllCompaniesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const companyListPayload = useMemo(
    () => ({
      limit: 50,
      batch: "Winter 2025",
    }),
    [],
  );

  const {
    data: companyListPages,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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
          <Text style={styles.loadingMoreText}>Loading more startups…</Text>
        </View>
      );
    }

    if (!hasNextPage && companies.length > 0) {
      return (
        <View style={styles.loadingMoreContainer}>
          <Text style={styles.loadingMoreText}>All startups loaded</Text>
        </View>
      );
    }

    return null;
  };

  // Pre-calculate category counts based on the static data

  const categoryCounts = useMemo(() => {
    return {
      All: companies.length,
      Hiring: companies.filter((c) => c.is_hiring).length,
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
          desc.includes("mcp") ||
          oneLiner.includes("work") ||
          oneLiner.includes("workspace") ||
          oneLiner.includes("bookmark") ||
          oneLiner.includes("pdf") ||
          oneLiner.includes("mcp")
        );
      }).length,
    };
  }, [companies]);

  // Filter companies based on search query and category pill

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const name = company.name || "";
      const oneLiner = company.one_liner || "";
      const desc = company.long_description || "";
      const textMatch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oneLiner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());

      if (!textMatch) return false;

      if (selectedCategory === "All") {
        return true;
      }
      if (selectedCategory === "Hiring") {
        return company.is_hiring === true;
      }
      if (selectedCategory === "Product Hunt") {
        return company.source === "producthunt";
      }
      if (selectedCategory === "AI") {
        return (
          desc.toLowerCase().includes("ai") ||
          desc.toLowerCase().includes("artificial") ||
          oneLiner.toLowerCase().includes("ai")
        );
      }
      if (selectedCategory === "Fintech") {
        return (
          desc.toLowerCase().includes("finance") ||
          desc.toLowerCase().includes("invest") ||
          desc.toLowerCase().includes("tax") ||
          desc.toLowerCase().includes("cash") ||
          desc.toLowerCase().includes("rate") ||
          oneLiner.toLowerCase().includes("invest")
        );
      }
      if (selectedCategory === "Productivity") {
        return (
          desc.toLowerCase().includes("work") ||
          desc.toLowerCase().includes("workspace") ||
          desc.toLowerCase().includes("bookmark") ||
          desc.toLowerCase().includes("pdf") ||
          desc.toLowerCase().includes("mcp")
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, companies]);

  const onPressCompanyCard = (item: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { id: item.id },
    });
  };

  // Render Item

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

    return (
      <Pressable style={styles.card} onPress={() => onPressCompanyCard(item)}>
        {/* Card Top Section */}
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

        {/* Description */}
        <Text style={styles.oneLiner} numberOfLines={2}>
          {description}
        </Text>

        {/* Card Bottom Section */}
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

            {item.is_hiring && (
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
    return (
      <View style={styles.emptyState}>
        <Image
          source={Images.search}
          style={styles.emptyIcon}
          tintColor={Colors.appColors.borderLight}
        />
        <Text style={styles.emptyTitle}>No Startups Found</Text>
        <Text style={styles.emptySubtitle}>
          {`We couldn't find any startups matching "${searchQuery}" in this category.`}
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

      {/* Search Input */}

      <View
        style={[
          styles.searchBarContainer,
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
          placeholder="Search startups, solutions, descriptions..."
          placeholderTextColor={Colors.appColors.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          clearButtonMode="while-editing"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
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
    </View>
  );
}
