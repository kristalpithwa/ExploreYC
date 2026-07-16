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
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(3.2),
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    fontWeight: "bold",
    marginTop: -2,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  headerRight: {
    flexDirection: "row",
    gap: Responsive.widthPercentageToDP(2.1),
  },
  scrollContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingTop: Responsive.heightPercentageToDP(2),
    paddingBottom: Responsive.heightPercentageToDP(15),
  },
  batchSelectorScroll: {
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  batchSelectorContent: {
    gap: Responsive.widthPercentageToDP(2.7),
  },
  batchPill: {
    paddingHorizontal: Responsive.widthPercentageToDP(4.3),
    paddingVertical: Responsive.heightPercentageToDP(1.25),
    borderRadius: Responsive.widthPercentageToDP(2.1),
    justifyContent: "center",
    alignItems: "center",
  },
  batchPillActive: {
    backgroundColor: Colors.appColors.primary,
  },
  batchPillInactive: {
    backgroundColor: Colors.appColors.grayLight,
  },
  batchPillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
  },
  batchPillTextActive: {
    color: Colors.appColors.white,
  },
  batchPillTextInactive: {
    color: Colors.appColors.secondary,
  },
  heroCard: {
    borderRadius: Responsive.widthPercentageToDP(6.4),
    padding: Responsive.widthPercentageToDP(6.4),
    marginBottom: Responsive.heightPercentageToDP(3),
    position: "relative",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#FF6600",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  heroHighlightBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: Responsive.widthPercentageToDP(3.2),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  heroHighlightText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.white,
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(28),
    color: Colors.appColors.white,
    marginBottom: 4,
  },
  heroSub: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(14),
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  heroStatsGrid: {
    flexDirection: "row",
    gap: Responsive.widthPercentageToDP(5.3),
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  heroStatNumber: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(24),
    color: Colors.appColors.white,
  },
  heroStatLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroActionBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: Responsive.widthPercentageToDP(4.8),
    height: Responsive.heightPercentageToDP(6.5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  heroActionBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.white,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(3.2),
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  statCard: {
    width: Responsive.widthPercentageToDP(42),
    flexGrow: 1,
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(4),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  statIconText: {
    fontSize: 18,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
  },
  industriesCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(6.4),
    padding: Responsive.widthPercentageToDP(6.4),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    marginBottom: Responsive.heightPercentageToDP(3),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  industriesTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  industriesTitleText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  industriesList: {
    gap: Responsive.heightPercentageToDP(2),
  },
  industryRow: {
    gap: Responsive.heightPercentageToDP(0.8),
  },
  industryLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  industryName: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
  },
  industryCount: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
  },
  progressBarTrack: {
    height: 8,
    width: "100%",
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  funFactCard: {
    flexDirection: "row",
    backgroundColor: Colors.appColors.grayLight,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    gap: 16,
    alignItems: "flex-start",
  },
  funFactIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.opacityColors.blackOpacity4,
    justifyContent: "center",
    alignItems: "center",
  },
  funFactIconText: {
    fontSize: 16,
  },
  funFactText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
    lineHeight: 20,
  },
  funFactHighlight: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.primary,
  },
});

export default styles;
