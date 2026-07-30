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

export default function FounderDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: profile, isLoading } = useGetFounderProfile(slug || "");

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {founder.avatar_url ? (
              <Image
                source={{ uri: founder.avatar_url }}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <Text
                style={[
                  styles.avatarInitial,
                  {
                    color: avatarTheme.text,
                    backgroundColor: avatarTheme.background,
                  },
                ]}
              >
                {name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>

          <Text style={styles.name}>{name}</Text>
          {founder.title ? (
            <Text style={styles.title}>{founder.title}</Text>
          ) : null}

          {enrichment &&
            (enrichment.linkedin_url || enrichment.twitter_url) && (
              <View style={styles.socialRow}>
                {enrichment.linkedin_url && (
                  <Pressable
                    style={styles.socialBtn}
                    onPress={() => openLink(enrichment.linkedin_url)}
                  >
                    <Ionicons name="logo-linkedin" size={16} color="#0077B5" />
                    <Text style={styles.socialBtnText}>LinkedIn</Text>
                  </Pressable>
                )}
                {enrichment.twitter_url && (
                  <Pressable
                    style={styles.socialBtn}
                    onPress={() => openLink(enrichment.twitter_url)}
                  >
                    <Ionicons name="logo-twitter" size={16} color="#1DA1F2" />
                    <Text style={styles.socialBtnText}>Twitter</Text>
                  </Pressable>
                )}
              </View>
            )}
        </View>

        {/* Stats Grid */}
        {stats && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Key Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {stats.companies_count || 0}
                </Text>
                <Text style={styles.statLabel}>Companies Founded</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {formatCurrency(stats.total_funding_usd)}
                </Text>
                <Text style={styles.statLabel}>Total Funding</Text>
              </View>
              {stats.max_valuation_usd > 0 && (
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {formatCurrency(stats.max_valuation_usd)}
                  </Text>
                  <Text style={styles.statLabel}>Max Valuation</Text>
                </View>
              )}
              {stats.has_unicorn === 1 && (
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>🦄</Text>
                  <Text style={styles.statLabel}>Unicorn Founder</Text>
                </View>
              )}
              {stats.total_employee_count > 0 && (
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {stats.total_employee_count.toLocaleString()}
                  </Text>
                  <Text style={styles.statLabel}>Employees Hired</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Companies Founded */}
        {companies && companies.length > 0 && (
          <View style={styles.companiesContainer}>
            <Text style={styles.sectionTitle}>Companies</Text>
            {companies.map((company: any, index: number) => (
              <Pressable
                key={index}
                style={styles.companyCard}
                onPress={() =>
                  router.push({
                    pathname: "/(home)/companyDetails",
                    params: { slug: company.slug },
                  })
                }
              >
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName} numberOfLines={1}>
                    {company.name}
                  </Text>
                  {company.batch && (
                    <View style={styles.companyBatchPill}>
                      <Text style={styles.companyBatchText}>
                        {company.batch}
                      </Text>
                    </View>
                  )}
                </View>
                {company.title && (
                  <Text style={styles.companyTitle}>{company.title}</Text>
                )}
                {company.one_liner && (
                  <Text style={styles.companyOneLiner} numberOfLines={2}>
                    {company.one_liner}
                  </Text>
                )}
                <View style={styles.companyFooter}>
                  {company.funding_total_usd > 0 && (
                    <View style={styles.companyFooterItem}>
                      <Ionicons
                        name="cash-outline"
                        size={14}
                        color={Colors.appColors.tertiary}
                      />
                      <Text style={styles.companyFooterText}>
                        {formatCurrency(company.funding_total_usd)} raised
                      </Text>
                    </View>
                  )}
                  {company.team_size > 0 && (
                    <View style={styles.companyFooterItem}>
                      <Ionicons
                        name="people-outline"
                        size={14}
                        color={Colors.appColors.tertiary}
                      />
                      <Text style={styles.companyFooterText}>
                        {company.team_size} employees
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
