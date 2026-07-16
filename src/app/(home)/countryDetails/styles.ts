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
  scrollContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingTop: Responsive.heightPercentageToDP(2),
    paddingBottom: Responsive.heightPercentageToDP(15),
  },
  heroCard: {
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(6.4),
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(3),
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
  flagContainer: {
    width: Responsive.widthPercentageToDP(21.3),
    height: Responsive.heightPercentageToDP(6.5),
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  flagText: {
    fontSize: Responsive.convertFontScale(36),
  },
  countryName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(24),
    color: Colors.appColors.secondary,
    marginBottom: 4,
  },
  countryStartups: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
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
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
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
  statNumber: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  industriesCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    marginBottom: Responsive.heightPercentageToDP(3),
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
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(2),
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
  industryPercentage: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
  },
  progressBarTrack: {
    height: 6,
    width: "100%",
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.appColors.primary,
    borderRadius: 3,
  },
  carouselSection: {
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  carouselHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: Responsive.heightPercentageToDP(1.5),
    paddingHorizontal: 2,
  },
  carouselTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  seeAllLink: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.primary,
  },
  carouselScroll: {
    marginHorizontal: -Responsive.widthPercentageToDP(5.3),
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
  },
  carouselContent: {
    gap: Responsive.widthPercentageToDP(3.5),
    paddingRight: Responsive.widthPercentageToDP(10),
  },
  companyCard: {
    width: Responsive.widthPercentageToDP(45),
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(4.3),
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoBox: {
    width: Responsive.widthPercentageToDP(13.9),
    height: Responsive.heightPercentageToDP(6.4),
    borderRadius: Responsive.widthPercentageToDP(3.2),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  logoText: {
    color: Colors.appColors.white,
    fontSize: Responsive.convertFontScale(22),
    fontFamily: Fonts.bold,
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    marginBottom: 6,
  },
  companyTag: {
    paddingHorizontal: Responsive.widthPercentageToDP(2.7),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: Responsive.widthPercentageToDP(1.6),
  },
  companyTagText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
  },
  distributionCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    marginBottom: Responsive.heightPercentageToDP(3),
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
  chartContainer: {
    height: Responsive.heightPercentageToDP(18),
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(1.6),
    marginTop: Responsive.heightPercentageToDP(1),
  },
  barGroup: {
    alignItems: "center",
    gap: Responsive.heightPercentageToDP(0.8),
  },
  barTrack: {
    width: Responsive.widthPercentageToDP(6.4),
    backgroundColor: Colors.appColors.grayLight,
    borderRadius: 2,
    justifyContent: "flex-end",
    height: "80%",
  },
  barFill: {
    width: "100%",
    backgroundColor: Colors.appColors.primary,
    borderRadius: 2,
  },
  barLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
  },
  barLabelActive: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.primary,
  },
  insightsCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    marginBottom: Responsive.heightPercentageToDP(3),
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
  insightsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  insightsList: {
    gap: Responsive.heightPercentageToDP(1.5),
  },
  insightRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.appColors.primary,
    marginTop: 6,
  },
  insightText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: 18,
  },
  insightHighlight: {
    fontFamily: Fonts.bold,
    color: Colors.appColors.secondary,
  },
  ctaBtn: {
    height: 52,
    borderRadius: 18,
    backgroundColor: Colors.appColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Responsive.heightPercentageToDP(1.5),
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  ctaBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.white,
  },
});

export default styles;
