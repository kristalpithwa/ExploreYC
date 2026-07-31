import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { Colors, Responsive } from "@/theme";
import { getAvatarTheme } from "@/utils/common";
import { useGetFounderProfile } from "@/services/apiService";
import { BASE_URL } from "@/network/config";

const getImageUrl = (url?: string) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return BASE_URL.replace("/api", "") + url;
};

export default function FounderDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: profile, isLoading } = useGetFounderProfile(slug || "");

  console.log("profile =>", profile);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.appColors.secondary}
            />
          </Pressable>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.appColors.primary} />
        </View>
      </View>
    );
  }

  if (!profile || !profile.founder) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.appColors.secondary}
            />
          </Pressable>
        </View>
        <View style={styles.loaderContainer}>
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: Colors.appColors.tertiary,
            }}
          >
            Founder not found.
          </Text>
        </View>
      </View>
    );
  }

  const { founder, stats, companies, enrichment } = profile;
  const name = founder.full_name || "Unknown";
  const avatarTheme = getAvatarTheme(name);
  const resolvedAvatarUrl = getImageUrl(founder.avatar_url);

  const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const formatCurrency = (val: number) => {
    if (!val) return "$0";
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  const onPressCompanyCard = (company: any) => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { slug: company?.slug },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { top: insets.top }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.appColors.secondary}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.proCoverBg,
            { height: Responsive.heightPercentageToDP(15) + insets.top },
          ]}
        />

        <View style={styles.profileSection}>
          {profile?.ranks && profile.ranks.length > 0 && (
            <View style={styles.proRankBadge}>
              <Text style={styles.proRankText}>
                #{profile.ranks[0].rank}{" "}
                {profile.ranks[0].metric === "funded"
                  ? "Most Funded"
                  : "Top Founder"}
              </Text>
            </View>
          )}

          <View style={styles.avatarWrapper}>
            <View
              style={[
                styles.avatarContainer,
                !resolvedAvatarUrl && { backgroundColor: avatarTheme.bg },
              ]}
            >
              {resolvedAvatarUrl ? (
                <Image
                  source={{ uri: resolvedAvatarUrl }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              ) : (
                <Text
                  style={[styles.avatarInitial, { color: avatarTheme.text }]}
                >
                  {name.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
          </View>

          <Text style={styles.name}>{name}</Text>
          {founder.title ? (
            <Text style={styles.title}>{founder.title}</Text>
          ) : null}

          {founder.bio ? (
            <Text style={styles.bioText}>{founder.bio}</Text>
          ) : null}

          {(founder.linkedin_url || founder.twitter_url) && (
            <View style={styles.socialRow}>
              {founder.linkedin_url && (
                <Pressable
                  style={styles.socialBtn}
                  onPress={() => openLink(founder.linkedin_url)}
                >
                  <Ionicons name="logo-linkedin" size={18} color="#0077B5" />
                  <Text style={styles.socialBtnText}>LinkedIn</Text>
                </Pressable>
              )}
              {founder.twitter_url && (
                <Pressable
                  style={styles.socialBtn}
                  onPress={() => openLink(founder.twitter_url)}
                >
                  <Ionicons name="logo-twitter" size={18} color="#1DA1F2" />
                  <Text style={styles.socialBtnText}>Twitter</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        {stats && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Key Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View
                  style={[
                    styles.statIconWrapper,
                    { backgroundColor: Colors.opacityColors.primaryOpacity10 },
                  ]}
                >
                  <Ionicons
                    name="business"
                    size={20}
                    color={Colors.appColors.primary}
                  />
                </View>
                <Text style={styles.statValue}>
                  {stats.companies_count || 0}
                </Text>
                <Text style={styles.statLabel}>Companies</Text>
              </View>

              <View style={styles.statCard}>
                <View
                  style={[
                    styles.statIconWrapper,
                    { backgroundColor: "rgba(52, 168, 83, 0.1)" },
                  ]}
                >
                  <Ionicons name="cash" size={20} color="#34A853" />
                </View>
                <Text style={styles.statValue}>
                  {formatCurrency(stats.total_funding_usd)}
                </Text>
                <Text style={styles.statLabel}>Total Funding</Text>
              </View>

              {stats.max_valuation_usd > 0 && (
                <View style={styles.statCard}>
                  <View
                    style={[
                      styles.statIconWrapper,
                      { backgroundColor: "rgba(66, 133, 244, 0.1)" },
                    ]}
                  >
                    <Ionicons name="trending-up" size={20} color="#4285F4" />
                  </View>
                  <Text style={styles.statValue}>
                    {formatCurrency(stats.max_valuation_usd)}
                  </Text>
                  <Text style={styles.statLabel}>Max Valuation</Text>
                </View>
              )}

              {stats.has_unicorn && (
                <View style={styles.statCard}>
                  <View
                    style={[
                      styles.statIconWrapper,
                      { backgroundColor: "rgba(251, 188, 5, 0.1)" },
                    ]}
                  >
                    <Ionicons name="star" size={20} color="#FBBC05" />
                  </View>
                  <Text style={styles.statValue}>Unicorn</Text>
                  <Text style={styles.statLabel}>Founder</Text>
                </View>
              )}

              {stats.total_employee_count > 0 && (
                <View style={styles.statCard}>
                  <View
                    style={[
                      styles.statIconWrapper,
                      { backgroundColor: "rgba(126, 139, 151, 0.1)" },
                    ]}
                  >
                    <Ionicons
                      name="people"
                      size={20}
                      color={Colors.appColors.grayMuted}
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {stats.total_employee_count.toLocaleString()}
                  </Text>
                  <Text style={styles.statLabel}>Employees</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {companies && companies.length > 0 && (
          <View style={styles.companiesContainer}>
            <Text style={styles.sectionTitle}>Companies Founded</Text>
            {companies.map((company: any, index: number) => (
              <Pressable
                key={index}
                style={styles.proCompanyCard}
                onPress={() => onPressCompanyCard(company)}
              >
                <View style={styles.proCompanyHeader}>
                  <Text style={styles.proCompanyName} numberOfLines={1}>
                    {company.name}
                  </Text>
                  {company.status && (
                    <View
                      style={[
                        styles.statusBadge,
                        company.status === "Active"
                          ? styles.statusActive
                          : styles.statusInactive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          company.status === "Active"
                            ? styles.statusActiveText
                            : styles.statusInactiveText,
                        ]}
                      >
                        {company.status}
                      </Text>
                    </View>
                  )}
                </View>

                {company.title && (
                  <Text style={styles.proCompanyRole}>{company.title}</Text>
                )}

                {company.one_liner && (
                  <Text style={styles.proCompanyOneLiner} numberOfLines={2}>
                    {company.one_liner}
                  </Text>
                )}

                <View style={styles.proCompanyBadges}>
                  {company.batch && (
                    <View style={styles.companyBatchPill}>
                      <Text style={styles.companyBatchText}>
                        {company.batch}
                      </Text>
                    </View>
                  )}
                  {company.location && (
                    <View style={styles.locationPill}>
                      <Ionicons
                        name="location-outline"
                        size={12}
                        color={Colors.appColors.tertiary}
                      />
                      <Text style={styles.locationText}>
                        {company.location}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.proCompanyFooter}>
                  {company.funding_total_usd > 0 && (
                    <View style={styles.proCompanyFooterItem}>
                      <View style={styles.footerIconWrapper}>
                        <Ionicons
                          name="cash"
                          size={16}
                          color={Colors.appColors.primary}
                        />
                      </View>
                      <Text style={styles.proCompanyFooterText}>
                        <Text style={styles.boldText}>
                          {formatCurrency(company.funding_total_usd)}
                        </Text>{" "}
                        Raised
                      </Text>
                    </View>
                  )}
                  {company.team_size > 0 && (
                    <View style={styles.proCompanyFooterItem}>
                      <View style={styles.footerIconWrapper}>
                        <Ionicons
                          name="people"
                          size={16}
                          color={Colors.appColors.primary}
                        />
                      </View>
                      <Text style={styles.proCompanyFooterText}>
                        <Text style={styles.boldText}>{company.team_size}</Text>{" "}
                        Employees
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
