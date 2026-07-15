import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
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
