import { Image } from "expo-image";
import { Text, View } from "react-native";

type TabBarIconProps = {
  focused: boolean;
  source: any;
  label: string;
};

export default function TabBarIcon({
  focused,
  source,
  label,
}: TabBarIconProps) {
  const color = focused ? "#000" : "#8E8E93";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 50,
        marginTop: 20,
      }}
    >
      <Image
        source={source}
        style={{
          width: 24,
          height: 24,
          tintColor: color,
        }}
        contentFit="contain"
      />
      <Text
        style={{
          fontSize: 10,
          color,
          fontWeight: focused ? "600" : "400",
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
