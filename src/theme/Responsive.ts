import {
  Dimensions,
  EmitterSubscription,
  NativeModules,
  PixelRatio,
  Platform,
} from "react-native";

const { StatusBarManager } = NativeModules;

// Initial screen dimensions
let screenWidth: number = Dimensions.get("window").width;
let screenHeight: number = Dimensions.get("window").height;

let orientationSubscription: EmitterSubscription | undefined;

/**
 * Converts font size based on current screen width.
 */
const convertFontScale = (fontSize: number): number => {
  const baseSize = Platform.select({
    ios: 375,
    android: 420,
    default: 375,
  });

  return fontSize * (screenWidth / baseSize);
};

/**
 * Converts width percentage to dp.
 *
 * Example:
 * widthPercentageToDP("50")
 */
const widthPercentageToDP = (widthPercent: string | number): number => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts height percentage to dp.
 *
 * Example:
 * heightPercentageToDP("25")
 */
const heightPercentageToDP = (heightPercent: string | number): number => {
  const elemHeight =
    typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * Listen for orientation changes.
 *
 * Pass a callback instead of `this.setState`.
 */
const listenOrientationChange = (
  onChange: (orientation: "portrait" | "landscape") => void,
): void => {
  orientationSubscription = Dimensions.addEventListener(
    "change",
    ({ window }) => {
      screenWidth = window.width;
      screenHeight = window.height;

      onChange(screenWidth < screenHeight ? "portrait" : "landscape");
    },
  );
};

/**
 * Remove orientation listener.
 */
const removeOrientationListener = (): void => {
  orientationSubscription?.remove();
};

/**
 * iPhone status type.
 *
 * Returns:
 * 1 = Normal iPhone
 * 2 = Notch/Dynamic Island
 * 3 = Larger status bar
 */
const isIPhoneX = (): 1 | 2 | 3 | undefined => {
  const height: number =
    Platform.OS === "ios"
      ? (StatusBarManager.HEIGHT ??
        StatusBarManager.statusBarFrame?.height ??
        20)
      : 0;

  console.log("StatusBarManager.HEIGHT =>", height);

  if (Platform.OS !== "ios") {
    return undefined;
  }

  if (height <= 20) {
    return 1;
  } else if (height <= 48) {
    return 2;
  } else {
    return 3;
  }
};

const Responsive = {
  isIPhoneX,
  convertFontScale,
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
};

export default Responsive;
