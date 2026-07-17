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
        shadowOpacity: 0.02,
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
    marginRight: Responsive.widthPercentageToDP(10.6), // to balance the back button
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
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    marginTop: Responsive.heightPercentageToDP(1.5),
    gap: Responsive.widthPercentageToDP(2.5),
  },
  statPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(3.5),
    paddingHorizontal: Responsive.widthPercentageToDP(3.2),
    paddingVertical: Responsive.heightPercentageToDP(1.2),
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.01,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  statPillLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.tertiary,
  },
  statPillValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.primary,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appColors.white,
    borderWidth: 1.5,
    borderColor: Colors.appColors.borderLight,
    borderRadius: Responsive.widthPercentageToDP(4),
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    height: Responsive.heightPercentageToDP(6.2),
    marginHorizontal: Responsive.widthPercentageToDP(5.3),
    marginTop: Responsive.heightPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(1.5),
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchBarContainerFocused: {
    borderColor: Colors.appColors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(4.5),
    paddingVertical: Responsive.heightPercentageToDP(1.2),
    borderRadius: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    gap: 6,
  },
  pillActive: {
    backgroundColor: Colors.appColors.secondary,
    borderColor: Colors.appColors.secondary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
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
  pillCount: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.tertiary,
    backgroundColor: Colors.appColors.grayLight,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 8,
    overflow: "hidden",
  },
  pillCountActive: {
    color: Colors.appColors.secondary,
    backgroundColor: Colors.appColors.white,
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
        shadowRadius: 16,
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
    width: Responsive.widthPercentageToDP(12.5),
    height: Responsive.widthPercentageToDP(12.5),
    borderRadius: Responsive.widthPercentageToDP(3.2),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  logoText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(17),
  },
  cardHeaderInfo: {
    flex: 1,
  },
  companyName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.2),
  },
  metaTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.tertiary,
    letterSpacing: 0.3,
  },
  metaDot: {
    fontSize: Responsive.convertFontScale(8),
    color: Colors.appColors.borderLight,
  },
  metaSource: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(10),
    color: Colors.appColors.grayMuted,
  },
  bookmarkBtn: {
    width: Responsive.widthPercentageToDP(9),
    height: Responsive.widthPercentageToDP(9),
    borderRadius: Responsive.widthPercentageToDP(4.5),
    backgroundColor: Colors.appColors.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkBtnActive: {
    backgroundColor: Colors.opacityColors.primaryOpacity10,
  },
  bookmarkIcon: {
    width: Responsive.widthPercentageToDP(4.5),
    height: Responsive.heightPercentageToDP(2.2),
  },
  oneLiner: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13.5),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.convertFontScale(19),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(0.7),
    borderRadius: Responsive.widthPercentageToDP(2.5),
    backgroundColor: "rgba(88, 95, 108, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(88, 95, 108, 0.1)",
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(10.5),
    color: Colors.appColors.tertiary,
  },
  batchBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(0.7),
    borderRadius: Responsive.widthPercentageToDP(2.5),
    backgroundColor: "rgba(255, 102, 0, 0.07)",
    borderWidth: 1,
    borderColor: "rgba(255, 102, 0, 0.12)",
  },
  batchText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10.5),
    color: Colors.appColors.primary,
  },
  hiringBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(0.7),
    borderRadius: Responsive.widthPercentageToDP(2.5),
    backgroundColor: "rgba(46, 125, 50, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(46, 125, 50, 0.15)",
  },
  hiringDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2E7D32",
  },
  hiringText: {
    color: "#2E7D32",
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(10.5),
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
