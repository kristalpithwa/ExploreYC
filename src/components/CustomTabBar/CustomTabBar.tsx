import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Images, Responsive } from "@/theme";
import styles from "./styles";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Define tab configuration.
  const tabConfig: Record<string, { label: string; icon: any }> = {
    "(home)": { label: "Home", icon: Images.home },
    "(discover)": { label: "Discover", icon: Images.discover },
    "(search)": { label: "Search", icon: Images.search },
    "(analytics)": { label: "Analytics", icon: Images.analytics },
  };

  return (
    <View
      style={[
        styles.container,
        { bottom: Math.max(insets.bottom, Responsive.heightPercentageToDP(2)) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Skip rendering if tabBarVisible or equivalent options hide it
        if (options.href === null) return null;

        const config = tabConfig[route.name] || {
          label: route.name,
          icon: Images.home,
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const activeColor = Colors.appColors.primary;
        const inactiveColor = Colors.appColors.grayMuted;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            style={styles.tabButton}
          >
            <View
              style={[
                styles.pillContainer,
                isFocused && styles.pillContainerActive,
              ]}
            >
              <Image
                source={config.icon}
                style={[
                  styles.icon,
                  { tintColor: isFocused ? activeColor : inactiveColor },
                ]}
                contentFit="contain"
              />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumScaleFactor={0.8}
                style={[
                  styles.label,
                  {
                    color: isFocused ? activeColor : inactiveColor,
                    fontWeight: isFocused ? "600" : "500",
                  },
                ]}
              >
                {config.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
