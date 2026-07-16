import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="companyDetails/index" />
      <Stack.Screen name="batchExplorer/index" />
      <Stack.Screen name="countryDetails/index" />
      <Stack.Screen name="industryDetails/index" />
    </Stack>
  );
}
