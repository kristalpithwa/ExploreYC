import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Images } from "@/theme";
import styles from "./styles";
import {
  useGetFilterBatches,
  useGetFilterIndustries,
  useGetFilterCountries,
  useGetFilterSources,
} from "@/services/apiService";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedBatch: string;
  onSelectBatch: (batch: string) => void;
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  selectedSource: string;
  onSelectSource: (source: string) => void;
  hiringOnly: boolean;
  onToggleHiringOnly: (val: boolean) => void;
  topCompaniesOnly: boolean;
  onToggleTopCompaniesOnly: (val: boolean) => void;
  onReset: () => void;
  onApply: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  selectedBatch,
  onSelectBatch,
  selectedIndustry,
  onSelectIndustry,
  selectedCountry,
  onSelectCountry,
  selectedSource,
  onSelectSource,
  hiringOnly,
  onToggleHiringOnly,
  topCompaniesOnly,
  onToggleTopCompaniesOnly,
  onReset,
  onApply,
}: FilterModalProps) {
  const insets = useSafeAreaInsets();

  // API Hooks for dynamic dropdown data
  const { data: batches = [], isLoading: loadingBatches } =
    useGetFilterBatches();
  const { data: industries = [], isLoading: loadingIndustries } =
    useGetFilterIndustries();
  const { data: countries = [], isLoading: loadingCountries } =
    useGetFilterCountries();
  const { data: sources = [], isLoading: loadingSources } =
    useGetFilterSources();

  // Dropdown expansion states
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Search queries within dropdowns
  const [batchSearch, setBatchSearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");

  // Filtered lists for dropdowns based on search input
  const filteredBatches = useMemo(() => {
    if (!batchSearch.trim()) return batches;
    return batches.filter((b: string) =>
      b.toLowerCase().includes(batchSearch.toLowerCase()),
    );
  }, [batches, batchSearch]);

  const filteredIndustries = useMemo(() => {
    if (!industrySearch.trim()) return industries;
    return industries.filter((i: string) =>
      i.toLowerCase().includes(industrySearch.toLowerCase()),
    );
  }, [industries, industrySearch]);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countries;
    return countries.filter((c: string) =>
      c.toLowerCase().includes(countrySearch.toLowerCase()),
    );
  }, [countries, countrySearch]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (selectedBatch) count++;
    if (selectedIndustry) count++;
    if (selectedCountry) count++;
    if (selectedSource) count++;
    if (hiringOnly) count++;
    if (topCompaniesOnly) count++;
    return count;
  }, [
    selectedBatch,
    selectedIndustry,
    selectedCountry,
    selectedSource,
    hiringOnly,
    topCompaniesOnly,
  ]);

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
            value ? styles.toggleThumbActive : styles.toggleThumbInactive,
          ]}
        />
      </Pressable>
    );
  };

  return (
    <Modal
      animationType="fade"
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={styles.modalTitle}>Filter Startups</Text>
              {activeCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{activeCount}</Text>
                </View>
              )}
            </View>
            <Pressable style={styles.resetBtn} onPress={onReset}>
              <Text style={styles.resetBtnText}>Reset All</Text>
            </Pressable>
          </View>

          {/* Scrollable Filter Options */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={[
              styles.modalScroll,
              { paddingBottom: insets.bottom + 100 },
            ]}
          >
            {/* 1. Source Selection Chips */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Source</Text>
              {loadingSources ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.appColors.primary}
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.sourcesScrollContent}
                >
                  <Pressable
                    style={[
                      styles.sourceChip,
                      !selectedSource && styles.sourceChipActive,
                    ]}
                    onPress={() => onSelectSource("")}
                  >
                    <Text
                      style={[
                        styles.sourceChipText,
                        !selectedSource
                          ? styles.sourceChipTextActive
                          : styles.sourceChipTextInactive,
                      ]}
                    >
                      All Sources
                    </Text>
                  </Pressable>
                  {sources.map((item: any) => {
                    const sourceKey =
                      typeof item === "string" ? item : item.key;
                    const displayName =
                      typeof item === "string" ? item : item.display_name;
                    const isSelected = selectedSource === sourceKey;
                    return (
                      <Pressable
                        key={sourceKey}
                        style={[
                          styles.sourceChip,
                          isSelected && styles.sourceChipActive,
                        ]}
                        onPress={() =>
                          onSelectSource(isSelected ? "" : sourceKey)
                        }
                      >
                        <Text
                          style={[
                            styles.sourceChipText,
                            isSelected
                              ? styles.sourceChipTextActive
                              : styles.sourceChipTextInactive,
                          ]}
                        >
                          {displayName}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              )}
            </View>

            {/* 2. Dropdown selectors for Batch, Industry, Country */}
            <View style={[styles.modalSection, styles.dropdownGroup]}>
              {/* Batch Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.modalSectionTitle}>Batch</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setShowBatchDropdown(!showBatchDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedBatch || "All Batches"}
                  </Text>
                  <Image
                    source={Images.arrow_right}
                    style={[
                      styles.dropdownIcon,
                      showBatchDropdown ? styles.rotate270 : styles.rotate90,
                    ]}
                    contentFit="contain"
                  />
                </Pressable>
                {showBatchDropdown && (
                  <View style={styles.dropdownOptions}>
                    <TextInput
                      placeholder="Search batches..."
                      placeholderTextColor={Colors.appColors.tertiary}
                      value={batchSearch}
                      onChangeText={setBatchSearch}
                      style={styles.dropdownSearchInput}
                    />
                    <ScrollView
                      style={{ maxHeight: 180 }}
                      nestedScrollEnabled={true}
                    >
                      <Pressable
                        style={styles.dropdownOption}
                        onPress={() => {
                          onSelectBatch("");
                          setShowBatchDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            !selectedBatch && styles.dropdownOptionTextSelected,
                          ]}
                        >
                          All Batches
                        </Text>
                      </Pressable>
                      {loadingBatches ? (
                        <ActivityIndicator
                          size="small"
                          color={Colors.appColors.primary}
                          style={{ marginVertical: 10 }}
                        />
                      ) : (
                        filteredBatches.map((batch: string) => (
                          <Pressable
                            key={batch}
                            style={styles.dropdownOption}
                            onPress={() => {
                              onSelectBatch(
                                selectedBatch === batch ? "" : batch,
                              );
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
                        ))
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Industry Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.modalSectionTitle}>Industry</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedIndustry || "All Industries"}
                  </Text>
                  <Image
                    source={Images.arrow_right}
                    style={[
                      styles.dropdownIcon,
                      showIndustryDropdown ? styles.rotate270 : styles.rotate90,
                    ]}
                    contentFit="contain"
                  />
                </Pressable>
                {showIndustryDropdown && (
                  <View style={styles.dropdownOptions}>
                    <TextInput
                      placeholder="Search industries..."
                      placeholderTextColor={Colors.appColors.tertiary}
                      value={industrySearch}
                      onChangeText={setIndustrySearch}
                      style={styles.dropdownSearchInput}
                    />
                    <ScrollView
                      style={{ maxHeight: 180 }}
                      nestedScrollEnabled={true}
                    >
                      <Pressable
                        style={styles.dropdownOption}
                        onPress={() => {
                          onSelectIndustry("");
                          setShowIndustryDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            !selectedIndustry &&
                              styles.dropdownOptionTextSelected,
                          ]}
                        >
                          All Industries
                        </Text>
                      </Pressable>
                      {loadingIndustries ? (
                        <ActivityIndicator
                          size="small"
                          color={Colors.appColors.primary}
                          style={{ marginVertical: 10 }}
                        />
                      ) : (
                        filteredIndustries.map((ind: string) => (
                          <Pressable
                            key={ind}
                            style={styles.dropdownOption}
                            onPress={() => {
                              onSelectIndustry(
                                selectedIndustry === ind ? "" : ind,
                              );
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
                        ))
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Country Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.modalSectionTitle}>Country</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  onPress={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedCountry || "All Countries"}
                  </Text>
                  <Image
                    source={Images.arrow_right}
                    style={[
                      styles.dropdownIcon,
                      showCountryDropdown ? styles.rotate270 : styles.rotate90,
                    ]}
                    contentFit="contain"
                  />
                </Pressable>
                {showCountryDropdown && (
                  <View style={styles.dropdownOptions}>
                    <TextInput
                      placeholder="Search countries..."
                      placeholderTextColor={Colors.appColors.tertiary}
                      value={countrySearch}
                      onChangeText={setCountrySearch}
                      style={styles.dropdownSearchInput}
                    />
                    <ScrollView
                      style={{ maxHeight: 180 }}
                      nestedScrollEnabled={true}
                    >
                      <Pressable
                        style={styles.dropdownOption}
                        onPress={() => {
                          onSelectCountry("");
                          setShowCountryDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            !selectedCountry &&
                              styles.dropdownOptionTextSelected,
                          ]}
                        >
                          All Countries
                        </Text>
                      </Pressable>
                      {loadingCountries ? (
                        <ActivityIndicator
                          size="small"
                          color={Colors.appColors.primary}
                          style={{ marginVertical: 10 }}
                        />
                      ) : (
                        filteredCountries.map((country: string) => (
                          <Pressable
                            key={country}
                            style={styles.dropdownOption}
                            onPress={() => {
                              onSelectCountry(
                                selectedCountry === country ? "" : country,
                              );
                              setShowCountryDropdown(false);
                            }}
                          >
                            <Text
                              style={[
                                styles.dropdownOptionText,
                                selectedCountry === country &&
                                  styles.dropdownOptionTextSelected,
                              ]}
                            >
                              {country}
                            </Text>
                          </Pressable>
                        ))
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>

            {/* 3. Switch Toggles */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Attributes</Text>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Actively Hiring Only</Text>
                {renderSwitch(hiringOnly, onToggleHiringOnly)}
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>YC Top Companies Only</Text>
                {renderSwitch(topCompaniesOnly, onToggleTopCompaniesOnly)}
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
            <Pressable
              style={styles.applyButton}
              onPress={() => {
                onApply();
                onClose();
              }}
            >
              <Text style={styles.applyButtonText}>
                Apply Filters {activeCount > 0 ? `(${activeCount})` : ""}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
