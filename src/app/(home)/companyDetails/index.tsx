import { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Map, Camera, ViewAnnotation } from "@maplibre/maplibre-react-native";

import styles from "./styles";
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

// Helper for industry cover photo mapping
const getHeroImage = (industry?: string) => {
  const ind = (industry || "").toLowerCase();
  if (
    ind.includes("real estate") ||
    ind.includes("construction") ||
    ind.includes("infrastructure")
  ) {
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("health") ||
    ind.includes("biotech") ||
    ind.includes("medical") ||
    ind.includes("dental") ||
    ind.includes("healthcare")
  ) {
    return "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("finance") ||
    ind.includes("fintech") ||
    ind.includes("crypto") ||
    ind.includes("invest")
  ) {
    return "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("ai") ||
    ind.includes("artificial") ||
    ind.includes("software") ||
    ind.includes("technology") ||
    ind.includes("data")
  ) {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=400";
  }
  return "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800&h=400";
};

// Formatting utility for funding USD
const formatUSD = (val?: number | null) => {
  if (val == null) return "N/A";
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(0)}K`;
  return `$${val}`;
};

export default function CompanyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: companyDetails } = useGetCompanyDetails(id);

  const rawJson = companyDetails?.raw_json;
  const rawJsonParsed = useMemo(() => {
    if (!rawJson) return null;

    try {
      return typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
    } catch {
      return null;
    }
  }, [rawJson]);

  const formerNames = useMemo(() => {
    const names = rawJsonParsed?.former_names;
    if (Array.isArray(names) && names.length > 0) {
      return names;
    }
    return [];
  }, [rawJsonParsed]);

  const rawRegions = companyDetails?.regions;
  const regions = useMemo(() => {
    if (!rawRegions) return [];
    try {
      return typeof rawRegions === "string"
        ? JSON.parse(rawRegions)
        : rawRegions;
    } catch {
      return [];
    }
  }, [rawRegions]);

  const rawIndustries = companyDetails?.industries;
  const industries = useMemo(() => {
    if (!rawIndustries) return [];
    try {
      return typeof rawIndustries === "string"
        ? JSON.parse(rawIndustries)
        : rawIndustries;
    } catch {
      return [];
    }
  }, [rawIndustries]);

  const rawFounders = companyDetails?.founders;
  const founders = useMemo(() => {
    if (!rawFounders) return [];
    try {
      return typeof rawFounders === "string"
        ? JSON.parse(rawFounders)
        : rawFounders;
    } catch {
      return [];
    }
  }, [rawFounders]);

  const handleOpenLink = async (url: string) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const companyName = companyDetails?.name;
  const avatarTheme = useMemo(
    () => getAvatarTheme(companyName || ""),
    [companyName],
  );

  const avatarContainerStyle = useMemo(
    () => ({
      backgroundColor: avatarTheme.bg,
    }),
    [avatarTheme.bg],
  );

  const avatarTextStyle = useMemo(
    () => ({
      color: avatarTheme.text,
    }),
    [avatarTheme.text],
  );

  const heroCoverUrl = useMemo(
    () => getHeroImage(companyDetails?.industry),
    [companyDetails?.industry],
  );

  const companyBatch = companyDetails?.batch;
  const companyStage = companyDetails?.stage;
  const companyStatus = companyDetails?.status;
  const companyTopCompany = companyDetails?.top_company;
  const companyNonprofit = companyDetails?.nonprofit;

  const badgeStyles = useMemo(() => {
    const list: {
      text: string;
      style: { backgroundColor: string; borderColor: string };
      textStyle: { color: string };
    }[] = [];

    if (companyBatch) {
      list.push({
        text: companyBatch,
        style: {
          backgroundColor: Colors.appColors.grayLight,
          borderColor: Colors.appColors.borderLight,
        },
        textStyle: { color: Colors.appColors.tertiary },
      });
    }

    if (companyStage) {
      list.push({
        text: `${companyStage} Stage`,
        style: {
          backgroundColor: Colors.appColors.grayLight,
          borderColor: Colors.appColors.borderLight,
        },
        textStyle: { color: Colors.appColors.tertiary },
      });
    }

    if (companyStatus) {
      const status = companyStatus.toLowerCase();
      let colors = { bg: "#F1F3F4", border: "#F1F3F4", text: "#5F6368" };
      if (status === "active")
        colors = { bg: "#E6F4EA", border: "#E6F4EA", text: "#137333" };
      else if (status === "acquired")
        colors = { bg: "#E8F0FE", border: "#E8F0FE", text: "#1A73E8" };
      else if (status === "public")
        colors = { bg: "#FCE8E6", border: "#FCE8E6", text: "#C5221F" };

      list.push({
        text: companyStatus,
        style: {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        textStyle: { color: colors.text },
      });
    }

    if (companyTopCompany === 1) {
      list.push({
        text: "Top Company",
        style: {
          backgroundColor: "#FFF4E5",
          borderColor: "#FFE6C2",
        },
        textStyle: { color: "#B06000" },
      });
    }

    if (companyNonprofit === 1) {
      list.push({
        text: "Nonprofit",
        style: {
          backgroundColor: "#F3E8FF",
          borderColor: "#E9D5FF",
        },
        textStyle: { color: "#6B21A8" },
      });
    }

    return list;
  }, [
    companyBatch,
    companyStage,
    companyStatus,
    companyTopCompany,
    companyNonprofit,
  ]);

  const lat = companyDetails?.latitude;
  const lng = companyDetails?.longitude;
  const hasCoords =
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat !== 0 &&
    lng !== 0;

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + Responsive.heightPercentageToDP(6),
          },
        ]}
      >
        {/* Hero Banner */}
        <View style={styles.heroContainer}>
          <Image
            contentFit="cover"
            style={styles.heroImage}
            source={{ uri: heroCoverUrl }}
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
            <View
              style={[
                styles.logoInner,
                !companyDetails?.small_logo_thumb_url && avatarContainerStyle,
              ]}
            >
              {companyDetails?.small_logo_thumb_url ? (
                <Image
                  contentFit="cover"
                  style={StyleSheet.absoluteFill}
                  source={{ uri: companyDetails?.small_logo_thumb_url }}
                />
              ) : (
                <Text style={[styles.logoText, avatarTextStyle]}>
                  {companyDetails?.name?.charAt(0)?.toUpperCase() || "?"}
                </Text>
              )}
            </View>
          </View>

          {/* Titles */}
          <Text style={styles.companyName}>{companyDetails?.name}</Text>

          {formerNames.length > 0 && (
            <Text style={styles.formerNamesText}>
              Formerly {formerNames.join(", ")}
            </Text>
          )}

          <View style={styles.metaRow}>
            {badgeStyles.map((badge, idx) => (
              <View key={idx} style={[styles.badge, badge.style]}>
                <Text style={[styles.badgeText, badge.textStyle]}>
                  {badge.text}
                </Text>
              </View>
            ))}

            {companyDetails?.all_locations && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  📍 {companyDetails?.all_locations}
                </Text>
              </View>
            )}

            {companyDetails?.is_hiring === 1 && (
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

          {companyDetails?.is_hiring === 1 && (
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
            <Text style={styles.statValue}>
              {companyDetails?.team_size || "N/A"}
            </Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>TOTAL FUNDING</Text>
            <Text style={styles.statValue}>
              {formatUSD(companyDetails?.funding_total_usd)}
            </Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>FOUNDED</Text>
            <Text style={styles.statValue}>
              {companyDetails?.year_founded || "N/A"}
            </Text>
          </View>
          <View style={[styles.statColumn, styles.statBorderLeft]}>
            <Text style={styles.statLabel}>COUNTRY</Text>
            <Text style={styles.statValue}>
              {companyDetails?.country || "N/A"}
            </Text>
          </View>
        </View>

        {/* Acquisition / Exit Card (conditionally shown) */}
        {(companyDetails?.acquirer ||
          companyDetails?.exit_type ||
          companyDetails?.ticker_symbol) && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Market & Exit Info</Text>
            <View style={styles.card}>
              {companyDetails?.acquirer && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Acquirer</Text>
                  <Text style={styles.infoValue}>
                    {companyDetails.acquirer}
                  </Text>
                </View>
              )}
              {companyDetails?.exit_type && (
                <View
                  style={[
                    styles.infoRow,
                    !!companyDetails?.acquirer && { marginTop: 8 },
                  ]}
                >
                  <Text style={styles.infoLabel}>Exit Type</Text>
                  <Text style={styles.infoValue}>
                    {companyDetails.exit_type}
                  </Text>
                </View>
              )}
              {companyDetails?.ticker_symbol && (
                <View
                  style={[
                    styles.infoRow,
                    (!!companyDetails?.acquirer ||
                      !!companyDetails?.exit_type) && { marginTop: 8 },
                  ]}
                >
                  <Text style={styles.infoLabel}>Ticker Symbol</Text>
                  <Text style={styles.infoValue}>
                    {companyDetails.ticker_symbol}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* One-liner and Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            {companyDetails?.one_liner && (
              <Text style={styles.oneLinerHeader}>
                {companyDetails.one_liner}
              </Text>
            )}
            <Text style={styles.cardBodyText}>
              {companyDetails?.long_description}
            </Text>
          </View>
        </View>

        {/* Industries Tags Section */}
        {industries.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Industries</Text>
            <View style={styles.tagsWrapper}>
              {industries.map((industry: string, idx: number) => (
                <View key={idx} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>{industry}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Regions Tags Section */}
        {regions.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Regions</Text>
            <View style={styles.tagsWrapper}>
              {regions.map((region: string, idx: number) => (
                <View key={idx} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>{region}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Founders Section (if available) */}
        {founders.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Founders</Text>
            {founders.map((founder: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.card,
                  styles.founderCard,
                  index > 0 && { marginTop: 10 },
                ]}
              >
                <Image
                  source={{
                    uri:
                      founder.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
                  }}
                  style={styles.founderAvatar}
                />
                <View style={styles.founderInfo}>
                  <Text style={styles.founderName}>{founder.name}</Text>
                  <Text style={styles.founderRole}>{founder.role}</Text>
                  {founder.bio && (
                    <Text style={styles.founderBio}>{founder.bio}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Office Location Section (Real Map) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Office Location</Text>
          <View style={styles.card}>
            {hasCoords ? (
              <View style={styles.officeMapContainer}>
                <Map
                  style={StyleSheet.absoluteFillObject}
                  mapStyle="https://tiles.openfreemap.org/styles/bright"
                  logo={false}
                  attribution={false}
                >
                  <Camera
                    initialViewState={{
                      centerCoordinate: [lng, lat],
                      zoomLevel: 11,
                    }}
                  />
                  <ViewAnnotation id="company-location-pin" lngLat={[lng, lat]}>
                    <View style={styles.mapPin}>
                      <Text style={styles.mapPinIcon}>📍</Text>
                    </View>
                  </ViewAnnotation>
                </Map>
              </View>
            ) : (
              <View style={styles.officeMapPreview}>
                <View style={styles.mapPin}>
                  <Text style={styles.mapPinIcon}>📍</Text>
                </View>
              </View>
            )}

            <View style={styles.officeDetails}>
              <Text style={styles.officeAddress}>
                {companyDetails?.all_locations ||
                  "Location information not available."}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
