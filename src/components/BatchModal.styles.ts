import { StyleSheet } from "react-native";
import { Colors, Fonts, Responsive } from "@/theme";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.appColors.white,
    borderTopLeftRadius: Responsive.widthPercentageToDP(6.4),
    borderTopRightRadius: Responsive.widthPercentageToDP(6.4),
    padding: Responsive.widthPercentageToDP(5.3),
    maxHeight: "80%",
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  modalList: {
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  modalItem: {
    paddingVertical: Responsive.heightPercentageToDP(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.appColors.border,
  },
  modalItemText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
});

export default styles;
