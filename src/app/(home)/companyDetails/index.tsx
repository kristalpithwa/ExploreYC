import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, Linking, StyleSheet } from "react-native";

import styles from "./styles";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Responsive } from "@/theme";
import { startupDetailsData } from "@/data/startupDetails";
import { getCompanyData, companyDetails } from "@/data/home";

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

export default function CompanyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const details = useMemo(() => {
    // 1. If it matches a key in startupDetailsData (e.g. "1", "2", "3")
    if (id && startupDetailsData[id]) {
      return startupDetailsData[id];
    }

    // 2. Otherwise search in getCompanyData.companies or use companyDetails
    const numericId = id ? parseInt(id, 10) : NaN;
    const company =
      getCompanyData?.companies?.find((c) => c.id === numericId) ||
      companyDetails;

    const avatarTheme = getAvatarTheme(company.name);
    
    const bannerImages = [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=300",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=300",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600&h=300",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600&h=300"
    ];
    const heroImage = bannerImages[(company.id || 0) % bannerImages.length];

    const batch = company.batch;
    const sourceLabel =
      company.source === "producthunt"
        ? "Product Hunt"
        : company.source
          ? company.source.toUpperCase()
          : "";
    const displayBatch = batch || sourceLabel || "YC";

    return {
      id: company.id.toString(),
      name: company.name,
      batch: displayBatch,
      category: company.industry || "General",
      location: company.all_locations || company.country || "Remote",
      hiring: company.is_hiring || false,
      logo: company.name ? company.name.charAt(0).toUpperCase() : "",
      logoBg: avatarTheme.bg,
      logoTextColor: avatarTheme.text,
      logoUrl: company.small_logo_thumb_url,
      tagline: company.one_liner || "",
      description: company.long_description || company.one_liner || "No description available.",
      teamSize: company.team_size || (company.employee_count ? company.employee_count.toString() : "1-10"),
      funding: company.funding_total_usd 
        ? `$${(company.funding_total_usd / 1000000).toFixed(1)}M` 
        : "Seed",
      founded: company.year_founded ? company.year_founded.toString() : "N/A",
      country: company.country || "Global",
      founders: [], // Hide founders since API responds with null
      jobs: [], // Hide jobs since API doesn't populate them
      officeName: company.name + " Office",
      officeAddress: company.all_locations || "Remote",
      website: company.website || "",
      heroImage: heroImage,
    };
  }, [id]);

  const handleOpenLink = async (url: string) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + Responsive.heightPercentageToDP(12),
          },
        ]}
      >
        {/* Hero Banner */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: details.heroImage }}
            style={styles.heroImage}
            contentFit="cover"
          />
          {/* Header Buttons (Floating over Hero) */}
          <View
            style={[styles.floatingHeader, { top: Math.max(insets.top, 12) }]}
          >
            <Pressable onPress={() => router.back()} style={styles.circleBtn}>
              <Text style={styles.backBtnText}>←</Text>
            </Pressable>
            {details.website ? (
              <Pressable
                onPress={() => handleOpenLink(details.website)}
                style={styles.circleBtn}
              >
                <Text style={styles.shareBtnText}>↗</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Company Identity */}
        <View style={styles.identityContainer}>
          {/* Logo Container */}
          <View style={styles.logoOuter}>
            <View
              style={[
                styles.logoInner,
                !details.logoUrl && { backgroundColor: details.logoBg },
              ]}
            >
              {details.logoUrl ? (
                <Image
                  source={{ uri: details.logoUrl }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
              ) : (
                <Text
                  style={[
                    styles.logoText,
                    { color: details.logoTextColor || Colors.appColors.white },
                  ]}
                >
                  {details.logo}
                </Text>
              )}
            </View>
          </View>

          {/* Titles */}
          <Text style={styles.companyName}>{details.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{details.batch}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{details.category}</Text>
            </View>
            {details.location && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>📍 {details.location}</Text>
              </View>
            )}
            {details.hiring && (
              <View style={styles.hiringBadge}>
                <View style={styles.hiringDot} />
                <Text style={styles.hiringText}>Hiring</Text>
              </View>
            )}
          </View>

          {details.website ? (
            <Pressable onPress={() => handleOpenLink(details.website)}>
              <Text style={styles.websiteText}>
                {`🔗 ${details.website.replace("https://", "")}`}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* Action Button Grid */}
        <View style={styles.actionRow}>
          <Pressable
            style={[styles.bookmarkBtn, isBookmarked && styles.bookmarkBtnActive]}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Text
              style={[
                styles.bookmarkBtnText,
                isBookmarked && { color: Colors.appColors.primary },
              ]}
            >
              {isBookmarked ? "★" : "☆"}
            </Text>
          </Pressable>
          {details.website ? (
            <Pressable
              style={styles.primaryActionBtn}
              onPress={() => handleOpenLink(details.website)}
            >
              <Text style={styles.primaryActionBtnText}>Visit Website</Text>
            </Pressable>
          ) : null}
          {details.hiring ? (
            <Pressable
              style={styles.secondaryActionBtn}
              onPress={() => {
                if (details.website) handleOpenLink(details.website);
              }}
            >
              <Text style={styles.secondaryActionBtnText}>Apply for Job</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Core Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>TEAM SIZE</Text>
            <Text style={styles.statValue}>{details.teamSize}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>FUNDING</Text>
            <Text style={styles.statValue}>{details.funding}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>FOUNDED</Text>
            <Text style={styles.statValue}>{details.founded}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>COUNTRY</Text>
            <Text style={styles.statValue}>{details.country}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Text style={styles.cardBodyText}>{details.description}</Text>
          </View>
        </View>

        {/* Founders Section */}
        {details.founders && details.founders.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Founders</Text>
            {details.founders.map((founder, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  styles.founderCard,
                  index > 0 && { marginTop: 10 },
                ]}
              >
                <Image
                  source={{ uri: founder.avatar }}
                  style={styles.founderAvatar}
                />
                <View style={styles.founderInfo}>
                  <Text style={styles.founderName}>{founder.name}</Text>
                  <Text style={styles.founderRole}>{founder.role}</Text>
                  <Text style={styles.founderBio}>{founder.bio}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Open Positions Section */}
        {details.jobs && details.jobs.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Open Positions</Text>
              <Pressable>
                <Text style={styles.seeAllJobsText}>View all</Text>
              </Pressable>
            </View>
            <View style={[styles.card, { padding: 0 }]}>
              {details.jobs.map((job, index) => (
                <View
                  key={index}
                  style={[styles.jobRow, index > 0 && styles.jobBorderTop]}
                >
                  <View style={styles.jobTextContainer}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobComp}>{job.compensation}</Text>
                  </View>
                  <Text style={styles.jobChevron}>›</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Office Location Section */}
        {details.officeAddress && details.officeAddress !== "Remote" && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Office Location</Text>
            <View style={[styles.card, { padding: 0 }]}>
              <View style={styles.officeMapPreview}>
                <View style={styles.mapPin}>
                  <Text style={styles.mapPinIcon}>📍</Text>
                </View>
              </View>
              <View style={styles.officeDetails}>
                <Text style={styles.officeName}>{details.officeName}</Text>
                <Text style={styles.officeAddress}>{details.officeAddress}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Navigation (Mobile Only) */}
      {details.website ? (
        <View
          style={[
            styles.bottomBarFloating,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <Pressable
            style={styles.bottomBarBtn}
            onPress={() => handleOpenLink(details.website)}
          >
            <Text style={styles.bottomBarBtnText}>Visit Website</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
