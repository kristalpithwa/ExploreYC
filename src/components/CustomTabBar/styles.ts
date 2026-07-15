import { Colors, Responsive } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: Colors.appColors.white,
    borderColor: Colors.opacityColors.blackOpacity4,
    borderRadius: Responsive.widthPercentageToDP(10.7),
    marginHorizontal: Responsive.widthPercentageToDP(4),

    // iOS shadow styling
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
    shadowOpacity: 0.08,
    shadowRadius: Responsive.widthPercentageToDP(4.3),

    // Android elevation styling
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pillContainer: {
    alignItems: "center",
    paddingVertical: Responsive.heightPercentageToDP(1),
  },
  pillContainerActive: {},
  icon: {
    width: Responsive.widthPercentageToDP(5),
    height: Responsive.heightPercentageToDP(2.5),
    marginBottom: Responsive.heightPercentageToDP(0.25),
  },
  label: {
    fontSize: Responsive.convertFontScale(10),
  },
});

export default styles;
