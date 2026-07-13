import { Image, type ImageSourcePropType } from "react-native";

type TabBarIconProps = {
  focused: boolean;
  source: ImageSourcePropType;
};

export default function TabBarIcon({ focused, source }: TabBarIconProps) {
  return (
    <Image
      source={source}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? "#000" : "#8E8E93",
      }}
      resizeMode="contain"
    />
  );
}
