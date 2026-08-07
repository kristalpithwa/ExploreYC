import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, Fonts, Responsive } from "@/theme";
import { SimilarCompany } from "@/types/validator";

interface SimilarCompanyCardProps {
  company: SimilarCompany;
}

export function SimilarCompanyCard({ company }: SimilarCompanyCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(home)/companyDetails",
      params: { slug: company.slug },
    });
  };

  const similarityPercent = Math.round((company.similarity_score || 0) * 100);

  const getSimilarityStyle = (score: number) => {
    if (score >= 0.8) return { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" }; // red
    if (score >= 0.6) return { bg: "#FFEDD5", text: "#9A3412", border: "#FDBA74" }; // orange
    return { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" }; // yellow
  };

  const simStyle = getSimilarityStyle(company.similarity_score);

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {company.small_logo_url ? (
            <Image
              source={{ uri: company.small_logo_url }}
              style={styles.logo}
              contentFit="cover"
            />
          ) : (
            <View style={styles.placeholderLogo}>
              <Ionicons name="briefcase" size={20} color={Colors.defaults.ORANGE} />
            </View>
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName} numberOfLines={1}>
              {company.name}
            </Text>
            <View style={styles.badgesRow}>
              {company.batch && (
                <View style={styles.batchBadge}>
                  <Text style={styles.batchText}>{company.batch}</Text>
                </View>
              )}
              {company.is_hiring && (
                <View style={styles.hiringBadge}>
                  <Text style={styles.hiringText}>Hiring</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={[styles.similarityBadge, { backgroundColor: simStyle.bg, borderColor: simStyle.border }]}>
          <Text style={[styles.similarityText, { color: simStyle.text }]}>
            {similarityPercent}% match
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {company.one_liner || company.description || "No description available"}
      </Text>

      <View style={styles.footer}>
        {company.industry && (
          <View style={styles.footerItem}>
            <Ionicons name="briefcase-outline" size={12} color={Colors.appColors.grayDark} />
            <Text style={styles.footerText} numberOfLines={1}>{company.industry}</Text>
          </View>
        )}
        {company.team_size && (
          <View style={styles.footerItem}>
            <Ionicons name="people-outline" size={12} color={Colors.appColors.grayDark} />
            <Text style={styles.footerText}>{company.team_size}</Text>
          </View>
        )}
        {company.country && (
          <View style={styles.footerItem}>
            <Ionicons name="location-outline" size={12} color={Colors.appColors.grayDark} />
            <Text style={styles.footerText} numberOfLines={1}>{company.country}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(3),
    padding: Responsive.widthPercentageToDP(4),
    marginBottom: Responsive.heightPercentageToDP(1.5),
    borderLeftWidth: 4,
    borderLeftColor: Colors.defaults.ORANGE,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(2),
  },
  logo: {
    width: Responsive.widthPercentageToDP(10),
    height: Responsive.widthPercentageToDP(10),
    borderRadius: Responsive.widthPercentageToDP(2),
    backgroundColor: Colors.appColors.lightBackground,
    marginRight: Responsive.widthPercentageToDP(3),
  },
  placeholderLogo: {
    width: Responsive.widthPercentageToDP(10),
    height: Responsive.widthPercentageToDP(10),
    borderRadius: Responsive.widthPercentageToDP(2),
    backgroundColor: Colors.defaults.ORANGE + "1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(3),
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1.5),
  },
  batchBadge: {
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.widthPercentageToDP(1),
    paddingHorizontal: Responsive.widthPercentageToDP(1.5),
    paddingVertical: Responsive.heightPercentageToDP(0.2),
  },
  batchText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.grayDark,
  },
  hiringBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: Responsive.widthPercentageToDP(1),
    paddingHorizontal: Responsive.widthPercentageToDP(1.5),
    paddingVertical: Responsive.heightPercentageToDP(0.2),
  },
  hiringText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(9),
    color: "#065F46",
  },
  similarityBadge: {
    borderWidth: 1,
    borderRadius: Responsive.widthPercentageToDP(2),
    paddingHorizontal: Responsive.widthPercentageToDP(2),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
  },
  similarityText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10),
  },
  description: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayDark,
    lineHeight: Responsive.convertFontScale(18),
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(3),
    borderTopWidth: 1,
    borderTopColor: Colors.opacityColors.blackOpacity4,
    paddingTop: Responsive.heightPercentageToDP(1.5),
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1),
    flex: 1,
  },
  footerText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayDark,
  },
});
