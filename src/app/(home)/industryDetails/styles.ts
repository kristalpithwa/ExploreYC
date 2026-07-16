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
    borderRadius: Responsive.widthPercentageToDP(6.4),
    padding: Responsive.widthPercentageToDP(6.4),
    marginBottom: Responsive.heightPercentageToDP(3),
    position: "relative",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#FF6600",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  heroIconText: {
    fontSize: Responsive.convertFontScale(32),
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(26),
    color: Colors.appColors.white,
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  heroMetadataRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(4.3),
  },
  heroMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroMetaText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: "rgba(255, 255, 255, 0.9)",
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    gap: 6,
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
  statIconText: {
    fontSize: Responsive.convertFontScale(24),
    marginBottom: 4,
  },
  statNumber: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    width: Responsive.widthPercentageToDP(12.8),
    height: Responsive.heightPercentageToDP(5.9),
    borderRadius: Responsive.widthPercentageToDP(2.7),
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
    marginBottom: 4,
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
  countriesCard: {
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
  countriesList: {
    gap: Responsive.heightPercentageToDP(2),
  },
  countryRow: {
    gap: Responsive.heightPercentageToDP(0.8),
  },
  countryLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryName: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
  },
  countryPercentage: {
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
  bentoContainer: {
    gap: Responsive.heightPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  bentoCard: {
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
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
  latestBatchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bentoLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bentoTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  bentoSub: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.primary,
    marginTop: 4,
  },
  bentoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.opacityColors.blackOpacity4,
    justifyContent: "center",
    alignItems: "center",
  },
  bentoIconText: {
    fontSize: 20,
  },
  insightsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: Responsive.heightPercentageToDP(1.5),
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
