import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Images from "../theme/images";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Define tab configuration. As requested, all tabs use home.svg for now.
  const tabConfig: Record<string, { label: string; icon: any }> = {
    "(home)": { label: "Home", icon: Images.home },
    "(discover)": { label: "Discover", icon: Images.discover },
    "(search)": { label: "Search", icon: Images.search },
    "(analytics)": { label: "Analytics", icon: Images.analytics },
  };

  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 16) }]}>
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

        const activeColor = "#A13E0E"; // Rust / Brown color from screenshot
        const inactiveColor = "#7E8B97"; // Cool Gray from screenshot

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

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    height: 76,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    // iOS shadow styling
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Android elevation styling
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
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
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 24,
    // height: 60,
    // width: 60,
    alignSelf: "stretch",
    marginHorizontal: 2,
  },
  pillContainerActive: {
    // backgroundColor: "#FDEEE5",
  },
  icon: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
  },
});
