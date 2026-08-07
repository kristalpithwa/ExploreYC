import { Tabs } from "expo-router";

import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";
import { tabConfig } from "@/data/tabConfig";

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
          href: tabConfig.showHome ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="(job)"
        options={{
          title: "Job",
          href: tabConfig.showJob ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
          href: tabConfig.showDiscover ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="(analytics)"
        options={{
          title: "Analytics",
          href: tabConfig.showAnalytics ? undefined : null,
        }}
      />
    </Tabs>
  );
};

export default Router;
