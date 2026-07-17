import React, { useState, useMemo } from "react";
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
import { getCompanyData } from "@/data/home";
import { Colors, Images, Responsive } from "@/theme";

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

export default function AllCompaniesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const companies: Company[] = getCompanyData?.companies || [];

  // Toggle Bookmark
  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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

  // Render Item
  const renderCompanyItem = ({ item }: { item: Company }) => {
    const isBookmarked = bookmarkedIds.includes(item.id);
    const logoUrl = item.small_logo_thumb_url;
    const name = item.name || "";
    const description = item.one_liner || item.long_description || "";
    const batch =
      item.batch || (item.source ? item.source.toUpperCase() : "YC");
    const category = item.industry || "General";

    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/(home)/companyDetails",
            params: { id: item.id },
          })
        }
      >
        {/* Card Top Section */}
        <View style={styles.cardTop}>
          <View style={styles.cardTopLeft}>
            <View style={styles.logoWrapper}>
              {logoUrl ? (
                <Image
                  source={{ uri: logoUrl }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
              ) : (
                <Text style={styles.logoText}>
                  {name ? name.charAt(0).toUpperCase() : ""}
                </Text>
              )}
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.companyName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.metaText}>{batch}</Text>
            </View>
          </View>

          <Pressable
            style={styles.bookmarkBtn}
            onPress={(e) => {
              e.stopPropagation();
              toggleBookmark(item.id);
            }}
          >
            <Image
              source={Images.bookmark}
              style={styles.bookmarkIcon}
              tintColor={
                isBookmarked
                  ? Colors.appColors.primary
                  : Colors.appColors.bookmarkInactive
              }
            />
          </Pressable>
        </View>

        {/* Description */}
        <Text style={styles.oneLiner} numberOfLines={2}>
          {description}
        </Text>

        {/* Card Bottom Section */}
        <View style={styles.cardBottom}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            {item.is_hiring && (
              <View style={[styles.categoryBadge, styles.hiringBadge]}>
                <Text style={[styles.categoryText, styles.hiringText]}>
                  🟢 Hiring
                </Text>
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

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>All Startups</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchIconEmoji}>🔍</Text>
        <TextInput
          placeholder="Search startups, solutions, descriptions..."
          placeholderTextColor={Colors.appColors.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Category Filter Scroll */}
      <View
        style={{
          height: 50,
          marginBottom: Responsive.heightPercentageToDP(1.5),
        }}
      >
        <FlatList
          horizontal
          data={FILTER_CATEGORIES}
          showsHorizontalScrollIndicator={false}
          style={styles.filterPillsScroll}
          contentContainerStyle={styles.pillsContent}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item;
            return (
              <Pressable
                onPress={() => setSelectedCategory(item)}
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Startup Cards List */}
      <FlatList
        data={filteredCompanies}
        renderItem={renderCompanyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={styles.emptyTitle}>No Startups Found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find any startups matching "{searchQuery}" in this
              category.
            </Text>
          </View>
        }
      />
    </View>
  );
}
