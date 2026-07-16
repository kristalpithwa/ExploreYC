import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Images } from "@/theme";
import styles from "../../app/(discover)/styles";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeTab: number;
  onTabPress: (index: number) => void;
  selectedBatch: string;
  onSelectBatch: (batch: string) => void;
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
  hiringOnly: boolean;
  onToggleHiringOnly: (val: boolean) => void;
  topCompaniesOnly: boolean;
  onToggleTopCompaniesOnly: (val: boolean) => void;
  foundedRange: [number, number];
  onSelectFoundedRange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  activeTab,
  onTabPress,
  selectedBatch,
  onSelectBatch,
  selectedIndustry,
  onSelectIndustry,
  selectedStatuses,
  onToggleStatus,
  hiringOnly,
  onToggleHiringOnly,
  topCompaniesOnly,
  onToggleTopCompaniesOnly,
  foundedRange,
  onSelectFoundedRange,
  onReset,
}: FilterModalProps) {
  const insets = useSafeAreaInsets();

  // Dropdown expansion states
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const renderSwitch = (
    value: boolean,
    onValueChange: (val: boolean) => void,
  ) => {
    return (
      <Pressable
        style={[styles.toggleSwitch, value && styles.toggleSwitchActive]}
        onPress={() => onValueChange(!value)}
      >
        <View
          style={[
            styles.toggleThumb,
            { alignSelf: value ? "flex-end" : "flex-start" },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />

          {/* Modal Title Bar */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <Pressable style={styles.resetBtn} onPress={onReset}>
              <Text style={styles.resetBtnText}>Reset</Text>
            </Pressable>
          </View>

          {/* Scrollable Filter Options */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.modalScroll,
              { paddingBottom: insets.bottom + 100 },
            ]}
          >
            {/* 1. Source Selection */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Source Selection</Text>
              <View style={styles.tabsContainer}>
                <Pressable
                  style={[
                    styles.tabButton,
                    activeTab === 0 && {
                      backgroundColor: Colors.appColors.primary,
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => onTabPress(0)}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      {
                        color:
                          activeTab === 0
                            ? Colors.appColors.white
                            : Colors.appColors.tertiary,
                        fontWeight: activeTab === 0 ? "700" : "500",
                      },
                    ]}
                  >
                    All
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.tabButton,
                    activeTab === 1 && {
                      backgroundColor: Colors.appColors.primary,
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => onTabPress(1)}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      {
                        color:
                          activeTab === 1
                            ? Colors.appColors.white
                            : Colors.appColors.tertiary,
                        fontWeight: activeTab === 1 ? "700" : "500",
                      },
                    ]}
                  >
                    YC
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.tabButton,
                    activeTab === 2 && {
                      backgroundColor: Colors.appColors.primary,
                      borderRadius: 10,
                    },
                  ]}
                  onPress={() => onTabPress(2)}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      {
                        color:
                          activeTab === 2
                            ? Colors.appColors.white
                            : Colors.appColors.tertiary,
                        fontWeight: activeTab === 2 ? "700" : "500",
                      },
                    ]}
                  >
                    a16z
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* 2. Dropdown selectors for Batch and Industry */}
            <View style={[styles.modalSection, { gap: 16 }]}>
              {/* Batch Dropdown */}
              <View style={{ gap: 6 }}>
                <Text style={styles.modalSectionTitle}>Batch</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setShowBatchDropdown(!showBatchDropdown)}
                >
                  <Text style={styles.dropdownText}>{selectedBatch}</Text>
                  <Image
                    source={Images.arrow_right}
                    style={[
                      styles.dropdownIcon,
                      {
                        transform: [
                          { rotate: showBatchDropdown ? "270deg" : "90deg" },
                        ],
                      },
                    ]}
                    contentFit="contain"
                  />
                </Pressable>
                {showBatchDropdown && (
                  <View style={styles.dropdownOptions}>
                    {["All Batches", "W24", "S23"].map((batch) => (
                      <Pressable
                        key={batch}
                        style={styles.dropdownOption}
                        onPress={() => {
                          onSelectBatch(batch);
                          setShowBatchDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            selectedBatch === batch &&
                              styles.dropdownOptionTextSelected,
                          ]}
                        >
                          {batch}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              {/* Industry Dropdown */}
              <View style={{ gap: 6 }}>
                <Text style={styles.modalSectionTitle}>Industry</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
                >
                  <Text style={styles.dropdownText}>{selectedIndustry}</Text>
                  <Image
                    source={Images.arrow_right}
                    style={[
                      styles.dropdownIcon,
                      {
                        transform: [
                          {
                            rotate: showIndustryDropdown ? "270deg" : "90deg",
                          },
                        ],
                      },
                    ]}
                    contentFit="contain"
                  />
                </Pressable>
                {showIndustryDropdown && (
                  <View style={styles.dropdownOptions}>
                    {["All Industries", "AI", "Fintech", "Healthtech"].map(
                      (ind) => (
                        <Pressable
                          key={ind}
                          style={styles.dropdownOption}
                          onPress={() => {
                            onSelectIndustry(ind);
                            setShowIndustryDropdown(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownOptionText,
                              selectedIndustry === ind &&
                                styles.dropdownOptionTextSelected,
                            ]}
                          >
                            {ind}
                          </Text>
                        </Pressable>
                      ),
                    )}
                  </View>
                )}
              </View>
            </View>

            {/* 3. Status checkbox grid */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Status</Text>
              <View style={styles.checkboxGrid}>
                {["Active", "Public", "Acquired", "Closed"].map((status) => {
                  const isActive = selectedStatuses.includes(status);
                  return (
                    <Pressable
                      key={status}
                      style={[
                        styles.checkboxItem,
                        isActive && styles.checkboxItemActive,
                      ]}
                      onPress={() => onToggleStatus(status)}
                    >
                      <View
                        style={[
                          styles.checkboxBox,
                          isActive && styles.checkboxBoxActive,
                        ]}
                      >
                        {isActive && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                      <Text style={styles.checkboxText}>{status}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* 4. Switch Toggles */}
            <View style={styles.modalSection}>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Hiring Only</Text>
                {renderSwitch(hiringOnly, onToggleHiringOnly)}
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>YC Top Companies</Text>
                {renderSwitch(topCompaniesOnly, onToggleTopCompaniesOnly)}
              </View>
            </View>

            {/* 5. Founded Year Range Slider */}
            <View style={styles.modalSection}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderHeaderText}>Founded Year</Text>
                <Text style={styles.sliderHeaderRange}>
                  {foundedRange[0]} - {foundedRange[1]}
                </Text>
              </View>

              <View style={styles.sliderTrackContainer}>
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderProgress,
                      {
                        left: `${((foundedRange[0] - 2010) / 16) * 100}%`,
                        right: `${((2026 - foundedRange[1]) / 16) * 100}%`,
                      },
                    ]}
                  />
                  {/* Left thumb selector button */}
                  <View
                    style={[
                      styles.sliderThumb,
                      {
                        left: `${((foundedRange[0] - 2010) / 16) * 100}%`,
                        transform: [{ translateX: -10 }],
                      },
                    ]}
                  />
                  {/* Right thumb selector button */}
                  <View
                    style={[
                      styles.sliderThumb,
                      {
                        left: `${((foundedRange[1] - 2010) / 16) * 100}%`,
                        transform: [{ translateX: -10 }],
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Range adjust buttons for robust sliding control */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Pressable
                    style={{
                      backgroundColor: Colors.appColors.grayLight,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      onSelectFoundedRange([
                        Math.max(2010, foundedRange[0] - 1),
                        foundedRange[1],
                      ])
                    }
                  >
                    <Text style={{ fontSize: 16 }}>-</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: Colors.appColors.grayLight,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      onSelectFoundedRange([
                        Math.min(foundedRange[1], foundedRange[0] + 1),
                        foundedRange[1],
                      ])
                    }
                  >
                    <Text style={{ fontSize: 16 }}>+</Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Pressable
                    style={{
                      backgroundColor: Colors.appColors.grayLight,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      onSelectFoundedRange([
                        foundedRange[0],
                        Math.max(foundedRange[0], foundedRange[1] - 1),
                      ])
                    }
                  >
                    <Text style={{ fontSize: 16 }}>-</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: Colors.appColors.grayLight,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      onSelectFoundedRange([
                        foundedRange[0],
                        Math.min(2026, foundedRange[1] + 1),
                      ])
                    }
                  >
                    <Text style={{ fontSize: 16 }}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Footer Apply Button */}
          <View
            style={[
              styles.modalFooter,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <Pressable style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
