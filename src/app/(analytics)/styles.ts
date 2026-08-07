import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    // Soft shadow for premium feel
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  headerLeft: {
    alignItems: "center",
  },
  avatar: {
    width: Responsive.widthPercentageToDP(10.7),
    height: Responsive.heightPercentageToDP(5),
    borderRadius: Responsive.widthPercentageToDP(5.3),
  },
  headerTexts: {
    justifyContent: "center",
  },
  appTitleText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.primary,
    letterSpacing: -0.2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.appColors.background,
  },
  scrollContent: {
    padding: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(10),
  },
  headerContainer: {
    marginBottom: Responsive.heightPercentageToDP(3.5),
    // marginTop: Responsive.heightPercentageToDP(1),
  },
  commandText: {
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
    marginBottom: Responsive.heightPercentageToDP(0.5),
    letterSpacing: 0.5,
  },
  title: {
    fontSize: Responsive.convertFontScale(28),
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Responsive.convertFontScale(14),
    fontFamily: Fonts.regular,
    color: Colors.appColors.grayMuted,
    lineHeight: Responsive.convertFontScale(20),
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Responsive.widthPercentageToDP(3), // horizontal and vertical gap
    marginBottom: Responsive.heightPercentageToDP(3.5),
  },
  statCardWrapper: {
    width: "47%", // slightly less than 50% to allow gap to work without overflowing
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  sectionIcon: {
    marginRight: Responsive.widthPercentageToDP(2),
  },
  sectionTitle: {
    fontSize: Responsive.convertFontScale(18),
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(5.3),
    borderRadius: Responsive.widthPercentageToDP(5.3),
    // Pro Max Shadow
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
    shadowOpacity: 0.04,
    shadowRadius: Responsive.widthPercentageToDP(4),
    elevation: 3,
    marginBottom: Responsive.heightPercentageToDP(2.5),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  bannersGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Responsive.heightPercentageToDP(3.5),
  },
  bannerCard: {
    flex: 1,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    marginHorizontal: Responsive.widthPercentageToDP(1),
    backgroundColor: Colors.appColors.white,
    // Pro Max Shadow
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
    shadowOpacity: 0.03,
    shadowRadius: Responsive.widthPercentageToDP(3),
    elevation: 2,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  bannerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    flex: 1,
  },
  bannerBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(1.5),
    paddingVertical: Responsive.heightPercentageToDP(0.3),
    borderRadius: Responsive.widthPercentageToDP(1.5),
    borderWidth: 1,
    marginLeft: Responsive.widthPercentageToDP(2),
  },
  bannerBadgeText: {
    fontSize: Responsive.convertFontScale(9),
    fontFamily: Fonts.bold,
    letterSpacing: 0.5,
  },
  bannerDesc: {
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    fontFamily: Fonts.regular,
    lineHeight: Responsive.convertFontScale(18),
  },
  detailedAnalyticsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(2.5),
    marginTop: Responsive.heightPercentageToDP(1),
  },
  dollarSign: {
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.primary,
    fontFamily: "SpaceMono-Bold",
    marginRight: Responsive.widthPercentageToDP(2.5),
  },
  detailedAnalyticsTitle: {
    fontSize: Responsive.convertFontScale(22),
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
    letterSpacing: -0.5,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  tableHeaderText: {
    fontSize: Responsive.convertFontScale(11),
    fontFamily: Fonts.medium,
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
    alignItems: "center",
  },
  tableRowText: {
    fontSize: Responsive.convertFontScale(13),
    fontFamily: Fonts.medium,
    color: Colors.appColors.secondary,
  },
  flex1: { flex: 1 },
  flex15: { flex: 1.5 },
  flex2: { flex: 2 },
  textRight: { textAlign: "right" },
  textBold: { fontFamily: Fonts.bold },
  textOrange: { color: Colors.defaults.ORANGE },
  textMuted: { color: Colors.appColors.grayMuted },
  earlyStageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPercentageToDP(1),
  },
  earlyStageCol: {
    flex: 1,
    alignItems: "center",
  },
  earlyStageLabel: {
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
  },
  earlyStageValue: {
    fontSize: Responsive.convertFontScale(24),
    fontFamily: Fonts.bold,
    color: Colors.defaults.ORANGE,
  },
  earlyStageSubtext: {
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.grayMuted,
  },
});

export default styles;
