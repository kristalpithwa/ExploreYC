import { Colors, Fonts, Responsive } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Responsive.widthPercentageToDP(4),
    paddingBottom: Responsive.heightPercentageToDP(10), // Padding for tabs
  },
  heroSection: {
    marginBottom: Responsive.heightPercentageToDP(3),
    alignItems: "flex-start",
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(28),
    color: Colors.defaults.ORANGE,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.grayMuted,
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  insightsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(2),
    borderWidth: 1,
    borderColor: Colors.defaults.ORANGE + "80",
    backgroundColor: Colors.defaults.ORANGE + "1A",
  },
  insightsButtonText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.defaults.ORANGE,
    marginRight: Responsive.widthPercentageToDP(1),
  },
  statsScrollContent: {
    paddingRight: Responsive.widthPercentageToDP(4),
    gap: Responsive.widthPercentageToDP(3),
  },
  statCard: {
    backgroundColor: Colors.appColors.lightBackground,
    padding: Responsive.widthPercentageToDP(4),
    borderRadius: Responsive.widthPercentageToDP(3),
    minWidth: Responsive.widthPercentageToDP(35),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  statLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    marginLeft: Responsive.widthPercentageToDP(1.5),
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Responsive.heightPercentageToDP(2),
    gap: Responsive.widthPercentageToDP(2),
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(2),
    backgroundColor: Colors.appColors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  filterButtonActive: {
    borderColor: Colors.defaults.ORANGE,
    backgroundColor: Colors.defaults.ORANGE + "1A",
  },
  filterButtonText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
    marginLeft: Responsive.widthPercentageToDP(1),
  },
  filterButtonTextActive: {
    color: Colors.defaults.ORANGE,
  },
  sortScroll: {
    flex: 1,
  },
  sortScrollContent: {
    gap: Responsive.widthPercentageToDP(2),
  },
  sortPill: {
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(4),
    backgroundColor: Colors.appColors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  sortPillActive: {
    borderColor: Colors.defaults.ORANGE,
    backgroundColor: Colors.defaults.ORANGE + "1A",
  },
  sortPillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  sortPillTextActive: {
    color: Colors.defaults.ORANGE,
  },
  listHeader: {
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  listFooter: {
    paddingVertical: Responsive.heightPercentageToDP(2),
    alignItems: "center",
  },
  emptyContainer: {
    padding: Responsive.heightPercentageToDP(6),
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.grayMuted,
    textAlign: "center",
  },
  jobsFoundText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    marginTop: Responsive.heightPercentageToDP(1),
  },
});

export default styles;
