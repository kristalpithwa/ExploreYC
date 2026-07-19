import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";

import styles from "./styles";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Responsive } from "@/theme";
import { useGetCompanyDetails } from "@/services/apiService";

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

  const { data: companyDetails } = useGetCompanyDetails(id);

  console.log("companyDetails =>", companyDetails);

  const regionText = companyDetails?.regions
    ? JSON.parse(companyDetails?.regions).join(", ")
    : "";

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
            contentFit="cover"
            style={styles.heroImage}
            source={{ uri: companyDetails?.heroImage }}
          />
          {/* Header Buttons (Floating over Hero) */}
          <View
            style={[styles.floatingHeader, { top: Math.max(insets.top, 12) }]}
          >
            <Pressable onPress={() => router.back()} style={styles.circleBtn}>
              <Text style={styles.backBtnText}>←</Text>
            </Pressable>

            {companyDetails?.website && (
              <Pressable
                onPress={() => handleOpenLink(companyDetails?.website)}
                style={styles.circleBtn}
              >
                <Text style={styles.shareBtnText}>↗</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Company Identity */}
        <View style={styles.identityContainer}>
          {/* Logo Container */}

          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              {companyDetails?.small_logo_thumb_url ? (
                <Image
                  contentFit="cover"
                  style={StyleSheet.absoluteFill}
                  source={{ uri: companyDetails?.small_logo_thumb_url }}
                />
              ) : (
                <Text style={styles.logoText}>
                  {companyDetails?.name?.charAt(0)?.toUpperCase() || "?"}
                </Text>
              )}
            </View>
          </View>

          {/* Titles */}
          <Text style={styles.companyName}>{companyDetails?.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{companyDetails?.batch}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{companyDetails?.industry}</Text>
            </View>

            {companyDetails?.all_locations && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  📍 {companyDetails?.all_locations}
                </Text>
              </View>
            )}

            {companyDetails?.is_hiring > 0 && (
              <View style={styles.hiringBadge}>
                <View style={styles.hiringDot} />
                <Text style={styles.hiringText}>Hiring</Text>
              </View>
            )}
          </View>

          {companyDetails?.website && (
            <Pressable onPress={() => handleOpenLink(companyDetails?.website)}>
              <Text style={styles.websiteText}>
                {`🔗 ${companyDetails?.website.replace("https://", "")}`}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Action Button Grid */}
        <View style={styles.actionRow}>
          {companyDetails?.website && (
            <Pressable
              style={styles.primaryActionBtn}
              onPress={() => handleOpenLink(companyDetails?.website)}
            >
              <Text style={styles.primaryActionBtnText}>Visit Website</Text>
            </Pressable>
          )}

          {companyDetails?.is_hiring > 0 && (
            <Pressable
              style={styles.secondaryActionBtn}
              onPress={() => {
                if (companyDetails?.website)
                  handleOpenLink(companyDetails?.website);
              }}
            >
              <Text style={styles.secondaryActionBtnText}>Apply for Job</Text>
            </Pressable>
          )}
        </View>

        {/* Core Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>TEAM SIZE</Text>
            <Text style={styles.statValue}>{companyDetails?.team_size}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>FUNDING</Text>
            <Text style={styles.statValue}>{companyDetails?.funding}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>FOUNDED</Text>
            <Text style={styles.statValue}>{companyDetails?.founded}</Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>COUNTRY</Text>
            <Text style={styles.statValue}>{companyDetails?.country}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Text style={styles.cardBodyText}>
              {companyDetails?.long_description}
            </Text>
          </View>
        </View>

        {/* Founders Section */}
        {companyDetails?.founders && companyDetails?.founders.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Founders</Text>
            {companyDetails?.founders.map((founder, index) => (
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
        {companyDetails?.jobs && companyDetails?.jobs.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Open Positions</Text>
              <Pressable>
                <Text style={styles.seeAllJobsText}>View all</Text>
              </Pressable>
            </View>

            <View style={styles.card}>
              {companyDetails?.jobs.map((job, index) => (
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
        {regionText && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Office Location</Text>
            <View style={styles.card}>
              <View style={styles.officeMapPreview}>
                <View style={styles.mapPin}>
                  <Text style={styles.mapPinIcon}>📍</Text>
                </View>
              </View>

              <View style={styles.officeDetails}>
                <Text style={styles.officeAddress}>{regionText}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
