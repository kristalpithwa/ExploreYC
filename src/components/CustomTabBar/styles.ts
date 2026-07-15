import { StyleSheet } from "react-native";
import { Colors, Responsive } from "@/theme";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: Responsive.widthPercentageToDP(4.3),
    width: Responsive.widthPercentageToDP(91.4),
    flexDirection: "row",
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(10.7),
    height: Responsive.heightPercentageToDP(9.5),
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: Responsive.widthPercentageToDP(2.1),
    // iOS shadow styling
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
    shadowOpacity: 0.08,
    shadowRadius: Responsive.widthPercentageToDP(4.3),
    // Android elevation styling
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  pillContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Responsive.heightPercentageToDP(1.25),
    paddingHorizontal: Responsive.widthPercentageToDP(1.1),
    borderRadius: Responsive.widthPercentageToDP(6.4),
    alignSelf: "stretch",
    marginHorizontal: Responsive.widthPercentageToDP(0.5),
  },
  pillContainerActive: {},
  icon: {
    width: Responsive.widthPercentageToDP(5.9),
    height: Responsive.heightPercentageToDP(2.8),
    marginBottom: Responsive.heightPercentageToDP(0.25),
  },
  label: {
    fontSize: Responsive.convertFontScale(10),
  },
});

export default styles;
