import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  commandText: {
    fontSize: 12,
    color: Colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Bold",
    color: Colors.appColors.secondary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.appColors.grayMuted,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Bold",
    color: Colors.appColors.secondary,
  },
  card: {
    backgroundColor: Colors.appColors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.appColors.borderLight,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  bannersGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  bannerCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bannerTitle: {
    fontWeight: "bold",
    fontFamily: "SpaceMono-Bold",
    fontSize: 14,
    flex: 1,
  },
  bannerBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 8,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontFamily: "SpaceMono-Bold",
  },
  bannerDesc: {
    fontSize: 12,
    color: Colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
  },
  detailedAnalyticsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  dollarSign: {
    fontSize: 18,
    color: Colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
    marginRight: 8,
  },
  detailedAnalyticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Bold",
    color: Colors.appColors.secondary,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.whiteOpacity10,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 12,
    fontFamily: "SpaceMono-Regular",
    color: Colors.appColors.grayMuted,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.whiteOpacity5,
  },
  tableRowText: {
    fontSize: 12,
    fontFamily: "SpaceMono-Regular",
    color: Colors.appColors.secondary,
  },
});

export default styles;
