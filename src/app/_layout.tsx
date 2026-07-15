import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
        }}
      />

      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
        }}
      />

      <Tabs.Screen
        name="(analytics)"
        options={{
          title: "Analytics",
        }}
      />
    </Tabs>
  );
}
