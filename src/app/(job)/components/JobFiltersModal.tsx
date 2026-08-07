import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Responsive } from "@/theme";
import { HiringFilters } from "@/types/hiring";

interface JobFiltersModalProps {
  visible: boolean;
  onClose: () => void;
  filters: HiringFilters;
  onApply: (newFilters: HiringFilters) => void;
  stats?: {
    roles: Array<{ role: string; count: number }>;
    batches: Array<{ batch: string; count: number }>;
    locations: Array<{ location: string; count: number }>;
  };
}

export function JobFiltersModal({
  visible,
  onClose,
  filters,
  onApply,
  stats,
}: JobFiltersModalProps) {
  const [localFilters, setLocalFilters] = useState<HiringFilters>(filters);

  // Sync local filters when modal opens
  React.useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
    }
  }, [visible, filters]);

  const toggleArrayFilter = (
    key: keyof Pick<HiringFilters, "roles" | "batches" | "locations" | "jobTypes">,
    value: string
  ) => {
    setLocalFilters((prev) => {
      const current = prev[key] as string[];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const setRemoteFilter = (value: 'all' | 'yes' | 'no') => {
    setLocalFilters((prev) => ({ ...prev, remote: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared: HiringFilters = {
      roles: [],
      batches: [],
      locations: [],
      jobTypes: [],
      experienceLevels: [],
      remote: "all",
      salaryMin: null,
      salaryMax: null,
      searchQuery: "",
    };
    setLocalFilters(cleared);
  };

  const renderSection = (
    title: string,
    key: keyof Pick<HiringFilters, "roles" | "batches" | "locations" | "jobTypes">,
    options: Array<{ label: string; value: string; count?: number }>
  ) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.chipContainer}>
          {options.map((opt) => {
            const isSelected = (localFilters[key] as string[]).includes(opt.value);
            return (
              <TouchableOpacity
                key={opt.value}
                activeOpacity={0.7}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => toggleArrayFilter(key, opt.value)}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {opt.label} {opt.count ? `(${opt.count})` : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.bottomSheet}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.appColors.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* Remote */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Remote Work</Text>
              <View style={styles.chipContainer}>
                {(["all", "yes", "no"] as const).map((val) => {
                  const isSelected = localFilters.remote === val;
                  const label = val === "all" ? "Any" : val === "yes" ? "Remote Only" : "On-site Only";
                  return (
                    <TouchableOpacity
                      key={val}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => setRemoteFilter(val)}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Roles */}
            {stats?.roles && stats.roles.length > 0 && (
              renderSection("Roles", "roles", stats.roles.map(r => ({ label: r.role, value: r.role, count: r.count })))
            )}

            {/* Job Types */}
            {renderSection("Job Type", "jobTypes", [
              { label: "Full-time", value: "fulltime" },
              { label: "Contract", value: "contract" },
              { label: "Internship", value: "internship" },
            ])}

            {/* Locations */}
            {stats?.locations && stats.locations.length > 0 && (
              renderSection("Locations", "locations", stats.locations.map(l => ({ label: l.location, value: l.location, count: l.count })))
            )}

            {/* Batches */}
            {stats?.batches && stats.batches.length > 0 && (
              renderSection("Batches", "batches", stats.batches.map(b => ({ label: b.batch, value: b.batch, count: b.count })))
            )}
            
            <View style={{ height: 40 }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: Colors.appColors.white,
    borderTopLeftRadius: Responsive.widthPercentageToDP(6),
    borderTopRightRadius: Responsive.widthPercentageToDP(6),
    maxHeight: Responsive.heightPercentageToDP(90),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Responsive.widthPercentageToDP(4),
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  clearText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.defaults.ORANGE,
  },
  content: {
    padding: Responsive.widthPercentageToDP(4),
  },
  section: {
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(15),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(2),
  },
  chip: {
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    paddingVertical: Responsive.heightPercentageToDP(1),
    borderRadius: Responsive.widthPercentageToDP(2),
    backgroundColor: Colors.appColors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  chipSelected: {
    backgroundColor: Colors.defaults.ORANGE + "1A",
    borderColor: Colors.defaults.ORANGE,
  },
  chipText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  chipTextSelected: {
    color: Colors.defaults.ORANGE,
  },
  footer: {
    padding: Responsive.widthPercentageToDP(4),
    borderTopWidth: 1,
    borderTopColor: Colors.opacityColors.blackOpacity4,
  },
  applyButton: {
    backgroundColor: Colors.defaults.ORANGE,
    paddingVertical: Responsive.heightPercentageToDP(1.8),
    borderRadius: Responsive.widthPercentageToDP(3),
    alignItems: "center",
  },
  applyButtonText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.white,
  },
});
