import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  backBtn: {
    width: Responsive.widthPercentageToDP(10.6),
    height: Responsive.widthPercentageToDP(10.6),
    borderRadius: Responsive.widthPercentageToDP(5.3),
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginTop: -2,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(10.6),
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  headerSub: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
    marginTop: 2,
  },
  filterScrollContainer: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingVertical: Responsive.heightPercentageToDP(2),
    gap: Responsive.widthPercentageToDP(3),
  },
  proFilterPill: {
    paddingHorizontal: Responsive.widthPercentageToDP(5),
    paddingVertical: Responsive.heightPercentageToDP(1.2),
    borderRadius: Responsive.widthPercentageToDP(6),
    backgroundColor: Colors.appColors.white,
    marginRight: Responsive.widthPercentageToDP(2.5),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  proFilterPillActive: {
    backgroundColor: Colors.appColors.primary,
    borderColor: Colors.appColors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  proFilterPillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
  },
  proFilterPillTextActive: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
  },
  listContainer: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(10),
    paddingTop: Responsive.heightPercentageToDP(1),
  },
  proFounderCard: {
    flexDirection: "row",
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4.5),
    borderRadius: Responsive.widthPercentageToDP(5),
    marginBottom: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    alignItems: "center",
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
  proRankBadge: {
    width: Responsive.widthPercentageToDP(8),
    height: Responsive.widthPercentageToDP(8),
    borderRadius: Responsive.widthPercentageToDP(4),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(3.5),
  },
  proRankText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.white,
  },
  avatar: {
    width: Responsive.widthPercentageToDP(13),
    height: Responsive.widthPercentageToDP(13),
    borderRadius: Responsive.widthPercentageToDP(6.5),
    marginRight: Responsive.widthPercentageToDP(3.5),
  },
  avatarInitial: {
    width: Responsive.widthPercentageToDP(13),
    height: Responsive.widthPercentageToDP(13),
    borderRadius: Responsive.widthPercentageToDP(6.5),
    marginRight: Responsive.widthPercentageToDP(3.5),
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: Responsive.widthPercentageToDP(13),
    overflow: "hidden",
  },
  founderInfo: {
    flex: 1,
    justifyContent: "center",
    paddingRight: Responsive.widthPercentageToDP(2),
  },
  founderName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.2),
  },
  founderTitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.tertiary,
  },
  proStatContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: Responsive.widthPercentageToDP(25),
  },
  proStatValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.primary,
    marginBottom: Responsive.heightPercentageToDP(0.3),
  },
  proStatLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(9),
    color: Colors.appColors.tertiary,
    textAlign: "right",
  },
  loaderContainer: {
    padding: Responsive.heightPercentageToDP(2),
    justifyContent: "center",
    alignItems: "center",
  },
  proEmptyContainer: {
    paddingTop: Responsive.heightPercentageToDP(15),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(10),
  },
  proEmptyIconWrapper: {
    width: Responsive.widthPercentageToDP(20),
    height: Responsive.widthPercentageToDP(20),
    borderRadius: Responsive.widthPercentageToDP(10),
    backgroundColor: Colors.opacityColors.primaryOpacity10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  proEmptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(1),
    textAlign: "center",
  },
  proEmptySub: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    textAlign: "center",
    lineHeight: Responsive.convertFontScale(18),
  }
});

export default styles;
