import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/theme";
import { useGetHiringJobsInfinite, useGetHiringBoardStats } from "@/services/apiService";
import { HiringFilters, JobWithCompany } from "@/types/hiring";
import { JobCard } from "./components/JobCard";
import { JobFiltersModal } from "./components/JobFiltersModal";
import styles from "./styles";

export default function JobBoardScreen() {
  const router = useRouter();
  
  // State
  const [filters, setFilters] = useState<HiringFilters>({
    roles: [],
    batches: [],
    locations: [],
    jobTypes: [],
    experienceLevels: [],
    remote: "all",
    salaryMin: null,
    salaryMax: null,
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState<"recent" | "salary_high" | "salary_low">("recent");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Queries
  const { data: statsData } = useGetHiringBoardStats();
  
  // Build query payload
  const queryPayload = useMemo(() => {
    const payload: any = {
      sort_by: sortBy,
      per_page: 20,
    };
    if (filters.searchQuery) payload.company_name = filters.searchQuery;
    if (filters.roles.length > 0) payload.role = filters.roles[0];
    if (filters.locations.length > 0) payload.location = filters.locations[0];
    if (filters.batches.length > 0) payload.batch = filters.batches[0];
    if (filters.jobTypes.length > 0) payload.job_type = filters.jobTypes[0];
    if (filters.remote === "yes") payload.remote = "true";
    if (filters.remote === "no") payload.remote = "false";
    
    return payload;
  }, [filters, sortBy]);

  const {
    data: jobsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetHiringJobsInfinite(queryPayload);

  // Flatten infinite pages
  const jobs = useMemo(() => {
    if (!jobsData?.pages) return [];
    return jobsData.pages.flatMap((page: any) => page.jobs || []);
  }, [jobsData]);

  const totalJobs = jobsData?.pages?.[0]?.total || 0;

  // Renderers
  const renderHeader = () => (
    <Animated.View entering={FadeInDown.springify()} style={styles.listHeader}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>YC Hiring Board</Text>
        <Text style={styles.subtitle}>Discover latest job opportunities</Text>
        
        <TouchableOpacity 
          style={styles.insightsButton}
          onPress={() => router.push("/(analytics)/hiring")}
        >
          <Text style={styles.insightsButtonText}>View Market Analytics</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.defaults.ORANGE} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <Animated.ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.statsScrollContent}
        entering={FadeInDown.delay(100).springify()}
      >
        {[
          { icon: "briefcase", label: "Total Jobs", value: statsData?.totalJobs?.toLocaleString() || "0", color: Colors.defaults.ORANGE },
          { icon: "business", label: "Companies", value: statsData?.hiringCompanies?.toLocaleString() || "0", color: Colors.appColors.primary },
          { icon: "cash", label: "Avg Salary", value: statsData?.avgSalary ? `$${(statsData.avgSalary / 1000).toFixed(0)}K` : "N/A", color: Colors.appColors.success },
          { icon: "flash", label: "New This Week", value: statsData?.newJobsThisWeek?.toLocaleString() || "0", color: Colors.defaults.YELLOW },
        ].map((stat, i) => (
          <View key={i} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={16} color={stat.color} />
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Controls */}
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.controlsRow}>
        <TouchableOpacity 
          style={[styles.filterButton, Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== "all" && v !== "") && styles.filterButtonActive]} 
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={16} color={Colors.appColors.secondary} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll} contentContainerStyle={styles.sortScrollContent}>
          {[
            { id: "recent", label: "Most Recent" },
            { id: "salary_high", label: "Highest Salary" },
            { id: "salary_low", label: "Lowest Salary" },
          ].map((sort) => (
            <TouchableOpacity
              key={sort.id}
              style={[styles.sortPill, sortBy === sort.id && styles.sortPillActive]}
              onPress={() => setSortBy(sort.id as any)}
            >
              <Text style={[styles.sortPillText, sortBy === sort.id && styles.sortPillTextActive]}>{sort.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.Text entering={FadeInDown.delay(300).springify()} style={styles.jobsFoundText}>
        {totalJobs.toLocaleString()} jobs found
      </Animated.Text>
    </Animated.View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <JobCard job={item} index={index} />}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.defaults.ORANGE} />
            ) : isError ? (
              <Text style={styles.emptyText}>Failed to load jobs. Please try again.</Text>
            ) : (
              <Text style={styles.emptyText}>No jobs match your filters. Try adjusting them!</Text>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.listFooter}>
            {isFetchingNextPage && <ActivityIndicator size="small" color={Colors.defaults.ORANGE} />}
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />

      <JobFiltersModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={filters}
        onApply={setFilters}
        stats={{
          roles: statsData?.topRoles || [],
          batches: statsData?.topBatches || [],
          locations: statsData?.topLocations || [],
        }}
      />
    </SafeAreaView>
  );
}
