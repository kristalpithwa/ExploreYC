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
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { Colors, Responsive } from "@/theme";
import { useGetCompanyDetailsBySlug } from "@/services/apiService";
import { formatUSD, getAvatarTheme, getHeroImage } from "@/utils/common";

export default function CompanyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: companyDetails } = useGetCompanyDetailsBySlug(slug || "");

  console.log("companyDetails =>", companyDetails);

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

  const rawTags = companyDetails?.tags;

  const tags = useMemo(() => {
    if (!rawTags) return [];
    try {
      return typeof rawTags === "string" ? JSON.parse(rawTags) : rawTags;
    } catch {
      return [];
    }
  }, [rawTags]);

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
        bounces={false}
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

        {/* Core Stats Grid */}
        <View style={styles.proStatsGrid}>
          <View style={styles.proStatCard}>
            <View
              style={[
                styles.proStatIconWrapper,
                { backgroundColor: "rgba(126, 139, 151, 0.1)" },
              ]}
            >
              <Ionicons
                name="people"
                size={20}
                color={Colors.appColors.grayMuted}
              />
            </View>
            <Text style={styles.proStatValue}>
              {companyDetails?.team_size || "N/A"}
            </Text>
            <Text style={styles.proStatLabel}>Team Size</Text>
          </View>

          <View style={styles.proStatCard}>
            <View
              style={[
                styles.proStatIconWrapper,
                { backgroundColor: "rgba(52, 168, 83, 0.1)" },
              ]}
            >
              <Ionicons name="cash" size={20} color="#34A853" />
            </View>
            <Text style={styles.proStatValue}>
              {formatUSD(companyDetails?.funding_total_usd)}
            </Text>
            <Text style={styles.proStatLabel}>Total Funding</Text>
          </View>

          <View style={styles.proStatCard}>
            <View
              style={[
                styles.proStatIconWrapper,
                { backgroundColor: "rgba(66, 133, 244, 0.1)" },
              ]}
            >
              <Ionicons name="business" size={20} color="#4285F4" />
            </View>
            <Text style={styles.proStatValue}>
              {companyDetails?.year_founded || "N/A"}
            </Text>
            <Text style={styles.proStatLabel}>Founded</Text>
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

        {tags?.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tags</Text>
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
