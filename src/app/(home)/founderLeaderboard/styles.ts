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
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    gap: Responsive.widthPercentageToDP(2.5),
  },
  filterPill: {
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(5),
    backgroundColor: Colors.appColors.grayLight,
    marginRight: Responsive.widthPercentageToDP(2.5),
  },
  filterPillActive: {
    backgroundColor: Colors.appColors.primary,
  },
  filterPillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.tertiary,
  },
  filterPillTextActive: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
  },
  listContainer: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingBottom: Responsive.heightPercentageToDP(10),
    paddingTop: Responsive.heightPercentageToDP(1),
  },
  founderCard: {
    flexDirection: "row",
    backgroundColor: Colors.appColors.white,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(4.5),
    marginBottom: Responsive.heightPercentageToDP(1.5),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rankBadge: {
    width: Responsive.widthPercentageToDP(7),
    height: Responsive.widthPercentageToDP(7),
    borderRadius: Responsive.widthPercentageToDP(3.5),
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(3),
  },
  rankText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.secondary,
  },
  avatar: {
    width: Responsive.widthPercentageToDP(12.5),
    height: Responsive.widthPercentageToDP(12.5),
    borderRadius: Responsive.widthPercentageToDP(6.25),
    marginRight: Responsive.widthPercentageToDP(3.5),
  },
  avatarInitial: {
    width: Responsive.widthPercentageToDP(12.5),
    height: Responsive.widthPercentageToDP(12.5),
    borderRadius: Responsive.widthPercentageToDP(6.25),
    marginRight: Responsive.widthPercentageToDP(3.5),
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: Responsive.widthPercentageToDP(12.5),
    overflow: "hidden",
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
  },
  founderTitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.tertiary,
    marginTop: 2,
  },
  founderStatPill: {
    marginTop: Responsive.heightPercentageToDP(0.8),
    backgroundColor: Colors.appColors.primaryLight,
    paddingHorizontal: Responsive.widthPercentageToDP(2.5),
    paddingVertical: Responsive.heightPercentageToDP(0.5),
    borderRadius: Responsive.widthPercentageToDP(2),
    alignSelf: "flex-start",
  },
  founderStatText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.primary,
  },
  loaderContainer: {
    padding: Responsive.heightPercentageToDP(2),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingTop: Responsive.heightPercentageToDP(10),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
    marginTop: 10,
  }
});

export default styles;
