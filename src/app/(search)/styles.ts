import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topControlsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    pointerEvents: "box-none", // Allow interaction with pills & search bar while overlaying map
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.opacityColors.whiteOpacity85,
    borderWidth: 1,
    borderColor: Colors.opacityColors.whiteOpacity50,
    borderRadius: Responsive.widthPercentageToDP(7.5),
    paddingHorizontal: Responsive.widthPercentageToDP(4.3),
    height: Responsive.heightPercentageToDP(6.5),
    marginHorizontal: Responsive.widthPercentageToDP(5.3),
    marginBottom: Responsive.heightPercentageToDP(1.5),
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
        shadowOpacity: 0.05,
        shadowRadius: Responsive.widthPercentageToDP(4.3),
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
    marginRight: Responsive.widthPercentageToDP(2.1),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    padding: 0,
  },
  filterBtn: {
    width: Responsive.widthPercentageToDP(8.5),
    height: Responsive.widthPercentageToDP(8.5),
    borderRadius: Responsive.widthPercentageToDP(4.3),
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBtnText: {
    fontSize: Responsive.convertFontScale(16),
  },
  pillsScrollView: {
    pointerEvents: "auto",
  },
  pillsContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    gap: Responsive.widthPercentageToDP(2.1),
    paddingBottom: Responsive.heightPercentageToDP(1),
  },
  pill: {
    paddingHorizontal: Responsive.widthPercentageToDP(4.3),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(2.1),
    borderWidth: 1,
    borderColor: Colors.opacityColors.whiteOpacity30,
    backgroundColor: Colors.opacityColors.whiteOpacity85,
  },
  pillActive: {
    backgroundColor: Colors.appColors.secondary,
    borderColor: Colors.appColors.secondary,
  },
  pillText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.secondary,
  },
  pillTextActive: {
    color: Colors.appColors.white,
  },
  floatingMapControls: {
    position: "absolute",
    right: Responsive.widthPercentageToDP(4.3),
    bottom: Responsive.heightPercentageToDP(28),
    zIndex: 40,
    gap: Responsive.heightPercentageToDP(1.5),
  },
  mapControlBtn: {
    width: Responsive.widthPercentageToDP(12.8),
    height: Responsive.widthPercentageToDP(12.8),
    borderRadius: Responsive.widthPercentageToDP(6.4),
    backgroundColor: Colors.opacityColors.whiteOpacity85,
    borderWidth: 1,
    borderColor: Colors.opacityColors.whiteOpacity50,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
        shadowOpacity: 0.05,
        shadowRadius: Responsive.widthPercentageToDP(2.1),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  mapControlIcon: {
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
  },
  zoomControlsGroup: {
    borderRadius: Responsive.widthPercentageToDP(3.2),
    backgroundColor: Colors.opacityColors.whiteOpacity85,
    borderWidth: 1,
    borderColor: Colors.opacityColors.whiteOpacity50,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
        shadowOpacity: 0.05,
        shadowRadius: Responsive.widthPercentageToDP(2.1),
      },
      android: {
        elevation: 3,
      },
    }),
  },
  zoomBtn: {
    width: Responsive.widthPercentageToDP(12.8),
    height: Responsive.widthPercentageToDP(12.8),
    justifyContent: "center",
    alignItems: "center",
  },
  zoomBtnBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity10,
  },
  pinOuter: {
    width: Responsive.widthPercentageToDP(9.6),
    height: Responsive.widthPercentageToDP(9.6),
    borderRadius: Responsive.widthPercentageToDP(4.8),
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.appColors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
        shadowOpacity: 0.15,
        shadowRadius: Responsive.widthPercentageToDP(1.6),
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pinOuterSelected: {
    borderColor: Colors.appColors.black,
    transform: [{ scale: 1.25 }],
  },
  pinInner: {
    width: Responsive.widthPercentageToDP(7.5),
    height: Responsive.widthPercentageToDP(7.5),
    borderRadius: Responsive.widthPercentageToDP(3.75),
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(11),
  },
  clusterPin: {
    width: Responsive.widthPercentageToDP(12.8),
    height: Responsive.widthPercentageToDP(12.8),
    borderRadius: Responsive.widthPercentageToDP(6.4),
    backgroundColor: Colors.appColors.primary,
    borderWidth: 2,
    borderColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.primary,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(0.5) },
        shadowOpacity: 0.3,
        shadowRadius: Responsive.widthPercentageToDP(2.1),
      },
      android: {
        elevation: 5,
      },
    }),
  },
  clusterText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
  },
  detailCard: {
    position: "absolute",
    left: Responsive.widthPercentageToDP(4.3),
    right: Responsive.widthPercentageToDP(4.3),
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5.3),
    padding: Responsive.widthPercentageToDP(5.3),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
        shadowOpacity: 0.08,
        shadowRadius: Responsive.widthPercentageToDP(6.4),
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Responsive.widthPercentageToDP(4.3),
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  logoContainer: {
    width: Responsive.widthPercentageToDP(17),
    height: Responsive.widthPercentageToDP(17),
    borderRadius: Responsive.widthPercentageToDP(3.2),
    backgroundColor: Colors.appColors.grayLight,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoBoxText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(24),
  },
  cardTitleInfo: {
    flex: 1,
  },
  startupName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  startupDesc: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.convertFontScale(18),
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(2.1),
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  metaBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(2.7),
    paddingVertical: Responsive.heightPercentageToDP(0.6),
    borderRadius: Responsive.widthPercentageToDP(2.1),
    backgroundColor: Colors.appColors.grayLight,
  },
  metaBadgeText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.secondary,
  },
  hiringBadge: {
    backgroundColor: Colors.appColors.hiringGreenBg,
  },
  hiringBadgeText: {
    color: Colors.appColors.hiringGreenText,
    fontFamily: Fonts.bold,
  },
  openBtn: {
    height: Responsive.heightPercentageToDP(6.2),
    borderRadius: Responsive.widthPercentageToDP(4.8),
    backgroundColor: Colors.appColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  openBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.white,
  },
});

export default styles;
