import { Dimensions } from "react-native";
import { expo } from "../../app.json";

export const commonConstant = {
  appName: expo.name,

  scrWidth: Dimensions.get("screen").width,
  scrHeight: Dimensions.get("screen").height,
};

export const asyncStorageKeys = {
  UserDetails: "UserDetails",
  LanguageCode: "LanguageCode",
  HapticFeedback: "HapticFeedback",
};

export const apiResponse = {
  success: 200,
  fail: 500,
};

export default {
  apiResponse,
  commonConstant,
  asyncStorageKeys,
};
