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
    borderBottomWidth: 1,
    borderBottomColor: Colors.appColors.borderLight,
    backgroundColor: Colors.appColors.white,
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
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
    marginTop: -3,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    flex: 1,
    textAlign: "center",
    marginRight: Responsive.widthPercentageToDP(10.6), // to balance the back button
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(4),
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    height: Responsive.heightPercentageToDP(6),
    marginHorizontal: Responsive.widthPercentageToDP(5.3),
    marginTop: Responsive.heightPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(1.5),
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
  searchIconEmoji: {
    fontSize: Responsive.convertFontScale(16),
    marginRight: Responsive.widthPercentageToDP(2.5),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    padding: 0,
  },
  filterPillsScroll: {
    flexGrow: 0,
  },
  pillsContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    gap: Responsive.widthPercentageToDP(2.7),
    paddingBottom: Responsive.heightPercentageToDP(1),
  },
  pill: {
    paddingHorizontal: Responsive.widthPercentageToDP(4.5),
    paddingVertical: Responsive.heightPercentageToDP(1.2),
    borderRadius: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  pillActive: {
    backgroundColor: Colors.appColors.secondary,
    borderColor: Colors.appColors.secondary,
  },
  pillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
    textAlign: "center",
  },
  pillTextActive: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
  },
  listContent: {
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    paddingTop: Responsive.heightPercentageToDP(1),
    paddingBottom: Responsive.heightPercentageToDP(4),
    gap: Responsive.heightPercentageToDP(2),
  },
  card: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(4.8),
    padding: Responsive.widthPercentageToDP(4.8),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  cardTopLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Responsive.widthPercentageToDP(3.2),
  },
  logoWrapper: {
    width: Responsive.widthPercentageToDP(11.7),
    height: Responsive.widthPercentageToDP(11.7),
    borderRadius: Responsive.widthPercentageToDP(2.7),
    backgroundColor: Colors.appColors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
  },
  cardHeaderInfo: {
    flex: 1,
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.3),
  },
  metaText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.tertiary,
  },
  bookmarkBtn: {
    width: Responsive.widthPercentageToDP(8.5),
    height: Responsive.widthPercentageToDP(8.5),
    borderRadius: Responsive.widthPercentageToDP(4.3),
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkIcon: {
    width: Responsive.widthPercentageToDP(4.3),
    height: Responsive.heightPercentageToDP(2),
  },
  oneLiner: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.convertFontScale(18),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(3.2),
    paddingVertical: Responsive.heightPercentageToDP(0.6),
    borderRadius: Responsive.widthPercentageToDP(2.1),
    backgroundColor: Colors.appColors.grayLight,
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.secondary,
  },
  hiringBadge: {
    backgroundColor: Colors.appColors.hiringGreenBg,
  },
  hiringText: {
    color: Colors.appColors.hiringGreenText,
    fontFamily: Fonts.bold,
  },
  arrowBtn: {
    width: Responsive.widthPercentageToDP(8.5),
    height: Responsive.widthPercentageToDP(8.5),
    borderRadius: Responsive.widthPercentageToDP(4.3),
    backgroundColor: Colors.opacityColors.primaryOpacity10,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: Responsive.widthPercentageToDP(3.7),
    height: Responsive.heightPercentageToDP(1.75),
    tintColor: Colors.appColors.primary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Responsive.heightPercentageToDP(8),
    paddingHorizontal: Responsive.widthPercentageToDP(10.6),
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginTop: Responsive.heightPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.tertiary,
    textAlign: "center",
    lineHeight: Responsive.convertFontScale(20),
  },
});

export default styles;
