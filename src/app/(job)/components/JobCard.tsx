import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { JobWithCompany, ROLE_COLORS, ROLE_ICONS } from "@/types/hiring";
import { Colors, Fonts, Responsive } from "@/theme";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface JobCardProps {
  job: JobWithCompany;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const router = useRouter();
  const company = job.company;

  const handlePress = () => {
    router.push({
      pathname: "/(job)/companyDetails",
      params: { id: company.id },
    });
  };

  const roleColor = ROLE_COLORS[job.pretty_role] || Colors.appColors.primary;
  const roleIcon = ROLE_ICONS[job.pretty_role] || "💼";

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={handlePress}
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: company.logo_url }}
          style={styles.logo}
          contentFit="cover"
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.companyName} numberOfLines={1}>
            {company.name}
          </Text>
          <Text style={styles.batchText}>
            {company.batch} • {company.location}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.appColors.grayMuted} />
      </View>

      <Text style={styles.jobTitle} numberOfLines={2}>
        {job.title}
      </Text>

      <View style={styles.tagsContainer}>
        {job.pretty_role && (
          <View style={[styles.tag, { backgroundColor: roleColor + "1A", borderColor: roleColor + "4D" }]}>
            <Text style={[styles.tagText, { color: roleColor }]}>
              {roleIcon} {job.pretty_role}
            </Text>
          </View>
        )}
        <View style={styles.tag}>
          <Ionicons name="time-outline" size={12} color={Colors.appColors.grayMuted} />
          <Text style={styles.tagText}>{job.pretty_job_type}</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name="location-outline" size={12} color={Colors.appColors.grayMuted} />
          <Text style={styles.tagText}>{job.remote === "yes" ? "Remote" : "On-site"}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.salaryText}>
          {job.pretty_salary_range}
        </Text>
        <Text style={styles.updatedText}>
          {job.pretty_updated_at}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(4.5),
    padding: Responsive.widthPercentageToDP(4),
    marginBottom: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    shadowColor: Colors.appColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  logo: {
    width: Responsive.widthPercentageToDP(12),
    height: Responsive.widthPercentageToDP(12),
    borderRadius: Responsive.widthPercentageToDP(2.5),
    marginRight: Responsive.widthPercentageToDP(3),
    backgroundColor: Colors.appColors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  headerTextContainer: {
    flex: 1,
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
    letterSpacing: -0.3,
  },
  batchText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    marginTop: Responsive.heightPercentageToDP(0.2),
  },
  jobTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(17),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(1.5),
    lineHeight: Responsive.convertFontScale(22),
    letterSpacing: -0.3,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(2.5),
    paddingVertical: Responsive.heightPercentageToDP(0.7),
    borderRadius: Responsive.widthPercentageToDP(2),
    backgroundColor: Colors.appColors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    gap: Responsive.widthPercentageToDP(1.5),
  },
  tagText: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.secondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.opacityColors.blackOpacity4,
    paddingTop: Responsive.heightPercentageToDP(1.5),
  },
  salaryText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.defaults.ORANGE,
  },
  updatedText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
  },
});
