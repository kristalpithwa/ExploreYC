import { useState } from "react";
import Router from "@/navigation/router";
import { Colors } from "@/theme";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkStatus from "@/components/NetworkStatus";

export default function TabLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={Colors.transparent}
      />
      <NetworkStatus />
      <Router />
    </QueryClientProvider>
  );
}
