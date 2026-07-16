import React, { useMemo } from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";

import styles from "./styles";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Responsive } from "@/theme";
import { startupDetailsData } from "@/data/startupDetails";

export default function CompanyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Resolve startup details, fallback to OpenAI if not found

  const details = useMemo(() => {
    return startupDetailsData[id || "3"] || startupDetailsData["3"];
  }, [id]);

  const handleOpenLink = async (url: string) => {
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
            <Pressable
              onPress={() => handleOpenLink(details.website)}
              style={styles.circleBtn}
            >
              <Text style={styles.shareBtnText}>↗</Text>
            </Pressable>
          </View>
        </View>

        {/* Company Identity */}
        <View style={styles.identityContainer}>
          {/* Logo Container */}
          <View style={styles.logoOuter}>
            <View
              style={[styles.logoInner, { backgroundColor: details.logoBg }]}
            >
              <Text style={styles.logoText}>{details.logo}</Text>
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
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>📍 {details.location}</Text>
            </View>
            {details.hiring && (
              <View style={styles.hiringBadge}>
                <View style={styles.hiringDot} />
                <Text style={styles.hiringText}>Hiring</Text>
              </View>
            )}
          </View>

          <Pressable onPress={() => handleOpenLink(details.website)}>
            <Text style={styles.websiteText}>
              🔗 {details.website.replace("https://", "")}
            </Text>
          </Pressable>
        </View>

        {/* Action Button Grid */}
        <View style={styles.actionRow}>
          <Pressable style={styles.bookmarkBtn}>
            <Text style={styles.bookmarkBtnText}>☆</Text>
          </Pressable>
          <Pressable
            style={styles.primaryActionBtn}
            onPress={() => handleOpenLink(details.website)}
          >
            <Text style={styles.primaryActionBtnText}>Visit Website</Text>
          </Pressable>
          <Pressable style={styles.secondaryActionBtn}>
            <Text style={styles.secondaryActionBtnText}>Apply for Job</Text>
          </Pressable>
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

        {/* Open Positions Section */}
        {details.jobs.length > 0 && (
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
      </ScrollView>

      {/* Floating Bottom Navigation (Mobile Only) */}
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
    </View>
  );
}
