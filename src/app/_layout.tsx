import { Tabs } from "expo-router";
import TabBarIcon from "../components/TabBarIcon";
import Images from "../theme/images";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={Images.home} label="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={Images.discover}
              label="Discover"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={Images.search}
              label="Search"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(analytics)"
        options={{
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={Images.analytics}
              label="Analytics"
            />
          ),
        }}
      />
    </Tabs>
  );
}
