import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.primary,
    letterSpacing: -0.2,
  },
  scrollContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingTop: Responsive.heightPercentageToDP(2),
    paddingBottom: Responsive.heightPercentageToDP(15),
  },
  titleSection: {
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  mainTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.secondary,
    letterSpacing: -0.5,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  subTitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(3.2),
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  bentoCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
        shadowOpacity: 0.03,
        shadowRadius: Responsive.widthPercentageToDP(3.2),
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statCard: {
    width: Responsive.widthPercentageToDP(42),
    flexGrow: 1,
    minHeight: Responsive.heightPercentageToDP(15),
    justifyContent: "space-between",
  },
  statIconBox: {
    width: Responsive.widthPercentageToDP(11.7),
    height: Responsive.widthPercentageToDP(11.7),
    borderRadius: Responsive.widthPercentageToDP(5.8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  statIconBoxOrange: {
    backgroundColor: Colors.opacityColors.primaryOpacity10,
  },
  statIconBoxGray: {
    backgroundColor: Colors.appColors.grayLight,
  },
  statEmojiText: {
    fontSize: Responsive.convertFontScale(18),
  },
  statEmojiTextOrange: {
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.primary,
  },
  statNumber: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(24),
    color: Colors.appColors.secondary,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: Responsive.heightPercentageToDP(0.25),
  },
  bentoGrid: {
    gap: Responsive.heightPercentageToDP(3),
  },
  bentoTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  locationsList: {
    gap: Responsive.heightPercentageToDP(2.5),
    marginTop: Responsive.heightPercentageToDP(1.5),
  },
  locationRow: {
    gap: Responsive.heightPercentageToDP(0.8),
  },
  locationLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(2.1),
  },
  locationFlag: {
    fontSize: Responsive.convertFontScale(16),
  },
  locationName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
  },
  locationValue: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
  },
  progressBarTrack: {
    height: Responsive.heightPercentageToDP(1),
    width: "100%",
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: Responsive.widthPercentageToDP(1),
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: Responsive.widthPercentageToDP(1),
  },
  progressBarFillUS: {
    width: "85%",
    backgroundColor: Colors.appColors.primary,
  },
  progressBarFillIndia: {
    width: "15%",
    backgroundColor: Colors.appColors.grayMuted,
  },
  aiCard: {
    backgroundColor: Colors.appColors.orangeLightest,
    borderColor: Colors.opacityColors.primaryOpacity15,
  },
  aiHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(2.1),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  aiIconText: {
    fontSize: Responsive.convertFontScale(18),
  },
  aiTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  aiInsightsList: {
    gap: Responsive.heightPercentageToDP(2),
  },
  aiInsightItem: {
    flexDirection: "row",
    gap: Responsive.widthPercentageToDP(3.2),
    alignItems: "flex-start",
  },
  aiInsightIconBox: {
    width: Responsive.widthPercentageToDP(6.4),
    height: Responsive.widthPercentageToDP(6.4),
    borderRadius: Responsive.widthPercentageToDP(3.2),
    backgroundColor: Colors.opacityColors.primaryOpacity10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Responsive.heightPercentageToDP(0.25),
  },
  aiInsightIcon: {
    fontSize: Responsive.convertFontScale(12),
  },
  aiInsightText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.convertFontScale(18),
  },
  aiInsightBold: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
  },
  donutSection: {
    alignItems: "center",
  },
  donutContainer: {
    width: Responsive.widthPercentageToDP(40),
    height: Responsive.widthPercentageToDP(40),
    borderRadius: Responsive.widthPercentageToDP(20),
    borderWidth: Responsive.widthPercentageToDP(2.7),
    borderColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginVertical: Responsive.heightPercentageToDP(2),
  },
  donutOverlaySegment1: {
    position: "absolute",
    width: Responsive.widthPercentageToDP(40),
    height: Responsive.widthPercentageToDP(40),
    borderRadius: Responsive.widthPercentageToDP(20),
    borderWidth: Responsive.widthPercentageToDP(2.7),
    borderColor: Colors.appColors.primary,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  donutOverlaySegment2: {
    position: "absolute",
    width: Responsive.widthPercentageToDP(40),
    height: Responsive.widthPercentageToDP(40),
    borderRadius: Responsive.widthPercentageToDP(20),
    borderWidth: Responsive.widthPercentageToDP(2.7),
    borderColor: Colors.appColors.borderPeach,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "-45deg" }],
  },
  donutCenterText: {
    alignItems: "center",
  },
  donutNumber: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.secondary,
  },
  donutLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(9),
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
  },
  donutLegendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(3.2),
    marginTop: Responsive.heightPercentageToDP(1.5),
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1.6),
  },
  legendColor: {
    width: Responsive.widthPercentageToDP(2.7),
    height: Responsive.widthPercentageToDP(2.7),
    borderRadius: Responsive.widthPercentageToDP(1.35),
  },
  legendColorPrimary: {
    backgroundColor: Colors.appColors.primary,
  },
  legendColorPeach: {
    backgroundColor: Colors.appColors.borderPeach,
  },
  legendColorMuted: {
    backgroundColor: Colors.appColors.grayMuted,
  },
  legendColorLight: {
    backgroundColor: Colors.appColors.grayLight,
  },
  legendText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.secondary,
  },
  recentBatchesCard: {
    minHeight: Responsive.heightPercentageToDP(28),
  },
  barChartContainer: {
    height: Responsive.heightPercentageToDP(18),
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingBottom: Responsive.heightPercentageToDP(0.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.appColors.grayLight,
    marginTop: Responsive.heightPercentageToDP(2),
  },
  verticalBarGroup: {
    alignItems: "center",
    gap: Responsive.heightPercentageToDP(0.8),
  },
  verticalBarTrack: {
    width: Responsive.widthPercentageToDP(8),
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: Responsive.widthPercentageToDP(1),
    justifyContent: "flex-end",
    height: "80%",
    overflow: "hidden",
  },
  verticalBarFill: {
    width: "100%",
    borderRadius: Responsive.widthPercentageToDP(1),
  },
  verticalBarS23: {
    height: "60%",
    backgroundColor: Colors.appColors.grayMuted,
  },
  verticalBarW24: {
    height: "80%",
    backgroundColor: Colors.appColors.grayMuted,
  },
  verticalBarS24: {
    height: "100%",
    backgroundColor: Colors.appColors.primary,
  },
  verticalBarLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.tertiary,
  },
  verticalBarLabelActive: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
  },
  placeholderCard: {
    minHeight: Responsive.heightPercentageToDP(26),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.opacityColors.whiteOpacity40,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: Colors.appColors.primary,
  },
  placeholderIcon: {
    fontSize: Responsive.convertFontScale(36),
    color: Colors.opacityColors.primaryOpacity30,
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  placeholderTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.75),
  },
  comingSoonBadge: {
    backgroundColor: Colors.opacityColors.primaryOpacity10,
    paddingHorizontal: Responsive.widthPercentageToDP(3.2),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    borderRadius: Responsive.widthPercentageToDP(3.2),
  },
  comingSoonText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default styles;
