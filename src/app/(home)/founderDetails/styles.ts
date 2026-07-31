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
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
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
  proCoverBg: {
    height: Responsive.heightPercentageToDP(15),
    backgroundColor: Colors.opacityColors.primaryOpacity15,
  },
  proRankBadge: {
    position: "absolute",
    top: -Responsive.heightPercentageToDP(2.5),
    right: Responsive.widthPercentageToDP(5.3),
    backgroundColor: Colors.appColors.primary,
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(0.8),
    borderRadius: Responsive.widthPercentageToDP(4),
    shadowColor: Colors.appColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  proRankText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(12),
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(3),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.appColors.borderLight,
    borderTopLeftRadius: Responsive.widthPercentageToDP(6),
    borderTopRightRadius: Responsive.widthPercentageToDP(6),
    marginTop: -Responsive.heightPercentageToDP(4),
  },
  avatarWrapper: {
    marginTop: -Responsive.heightPercentageToDP(7),
    alignItems: "center",
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
    fontSize: Responsive.convertFontScale(24),
    color: Colors.appColors.secondary,
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.primary,
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  bioText: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
    textAlign: "center",
    lineHeight: Responsive.heightPercentageToDP(2.6),
    marginBottom: Responsive.heightPercentageToDP(2.5),
    paddingHorizontal: Responsive.widthPercentageToDP(2),
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
    justifyContent: "space-between",
    gap: Responsive.widthPercentageToDP(3),
  },
  statCard: {
    width: (Responsive.widthPercentageToDP(100) - Responsive.widthPercentageToDP(13.6)) / 2,
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(4),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    marginBottom: Responsive.heightPercentageToDP(1.5),
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIconWrapper: {
    width: Responsive.widthPercentageToDP(10),
    height: Responsive.widthPercentageToDP(10),
    borderRadius: Responsive.widthPercentageToDP(5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
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
    paddingBottom: Responsive.heightPercentageToDP(5),
  },
  proCompanyCard: {
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4.5),
    borderRadius: Responsive.widthPercentageToDP(5),
    marginBottom: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  proCompanyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  proCompanyTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Responsive.widthPercentageToDP(2),
  },
  proCompanyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  statusBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(2),
    paddingVertical: Responsive.heightPercentageToDP(0.4),
    borderRadius: Responsive.widthPercentageToDP(1.5),
  },
  statusActive: {
    backgroundColor: "rgba(46, 125, 50, 0.1)",
  },
  statusInactive: {
    backgroundColor: "rgba(126, 139, 151, 0.1)",
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(9),
    textTransform: "uppercase",
  },
  statusActiveText: {
    color: "#2E7D32",
  },
  statusInactiveText: {
    color: Colors.appColors.tertiary,
  },
  proCompanyRole: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.primary,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  proCompanyOneLiner: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.heightPercentageToDP(2.2),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  proCompanyBadges: {
    flexDirection: "row",
    gap: Responsive.widthPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appColors.grayLight,
    paddingHorizontal: Responsive.widthPercentageToDP(2.5),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    borderRadius: Responsive.widthPercentageToDP(2),
    gap: Responsive.widthPercentageToDP(1),
  },
  locationText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.tertiary,
  },
  proCompanyFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(4),
    borderTopWidth: 1,
    borderTopColor: Colors.appColors.borderLight,
    paddingTop: Responsive.heightPercentageToDP(1.5),
  },
  proCompanyFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1.5),
  },
  footerIconWrapper: {
    width: Responsive.widthPercentageToDP(6),
    height: Responsive.widthPercentageToDP(6),
    borderRadius: Responsive.widthPercentageToDP(3),
    backgroundColor: Colors.opacityColors.primaryOpacity10,
    justifyContent: "center",
    alignItems: "center",
  },
  proCompanyFooterText: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.tertiary,
  },
  boldText: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
  },
});

export default styles;
