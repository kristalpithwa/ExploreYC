import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  scrollViewContent: {
    paddingBottom: Responsive.heightPercentageToDP(10),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.appColors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingTop: Responsive.heightPercentageToDP(1.5),
    paddingBottom: Responsive.heightPercentageToDP(1.5),
  },
  backBtn: {
    width: Responsive.widthPercentageToDP(10.6),
    height: Responsive.widthPercentageToDP(10.6),
    borderRadius: Responsive.widthPercentageToDP(5.3),
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  backBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginTop: -2,
  },
  headerSpacer: {
    width: Responsive.widthPercentageToDP(10.6),
  },

  // Profile Section
  profileSection: {
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.appColors.borderLight,
    backgroundColor: Colors.appColors.white,
    paddingTop: Responsive.heightPercentageToDP(2),
  },
  avatarContainer: {
    width: Responsive.widthPercentageToDP(26),
    height: Responsive.widthPercentageToDP(26),
    borderRadius: Responsive.widthPercentageToDP(13),
    marginBottom: Responsive.heightPercentageToDP(2),
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatar: {
    width: Responsive.widthPercentageToDP(26),
    height: Responsive.widthPercentageToDP(26),
    borderRadius: Responsive.widthPercentageToDP(13),
    borderWidth: 3,
    borderColor: Colors.appColors.white,
  },
  avatarInitial: {
    width: Responsive.widthPercentageToDP(26),
    height: Responsive.widthPercentageToDP(26),
    borderRadius: Responsive.widthPercentageToDP(13),
    borderWidth: 3,
    borderColor: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(40),
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: Responsive.widthPercentageToDP(26),
    overflow: "hidden",
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.secondary,
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  socialRow: {
    flexDirection: "row",
    gap: Responsive.widthPercentageToDP(3),
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appColors.grayLight,
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(5),
    gap: Responsive.widthPercentageToDP(1.5),
  },
  socialBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.secondary,
  },

  // Stats Grid
  statsContainer: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(3),
    backgroundColor: Colors.appColors.background,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(3.3),
  },
  statCard: {
    width:
      (Responsive.widthPercentageToDP(100) -
        Responsive.widthPercentageToDP(14)) /
      2,
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(4),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.primary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
  },

  // Companies List
  companiesContainer: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(3),
  },
  companyCard: {
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(4.5),
    marginBottom: Responsive.heightPercentageToDP(1.5),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  companyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
    flex: 1,
    marginRight: Responsive.widthPercentageToDP(2),
  },
  companyBatchPill: {
    backgroundColor: Colors.appColors.primaryLight,
    paddingHorizontal: Responsive.widthPercentageToDP(2.5),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    borderRadius: Responsive.widthPercentageToDP(2),
  },
  companyBatchText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.primary,
  },
  companyTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.primary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  companyOneLiner: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.heightPercentageToDP(2.4),
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  companyFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(3),
    borderTopWidth: 1,
    borderTopColor: Colors.appColors.borderLight,
    paddingTop: Responsive.heightPercentageToDP(1.5),
  },
  companyFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1),
  },
  companyFooterText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
  },
});

export default styles;
