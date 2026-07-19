import { Tabs } from "expo-router";

import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";

const Router = () => {
  return (
    <Tabs
      initialRouteName="(home)"
      tabBar={(props) => <CustomTabBar {...(props as any)} />}
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
};

export default Router;
