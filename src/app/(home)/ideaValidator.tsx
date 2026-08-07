import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { Colors, Fonts, Responsive } from "@/theme";
import { useValidateIdeaMutation } from "@/services/apiService";
import { SimilarCompanyCard } from "./components/SimilarCompanyCard";
import { ValidationResult } from "@/types/validator";

export default function IdeaValidatorScreen() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { mutate: validateIdea, isPending, error } = useValidateIdeaMutation();

  const minChars = 10;
  const isValidLength = idea.trim().length >= minChars;

  const handleValidate = () => {
    if (!isValidLength) return;
    setResult(null); // Clear previous results
    validateIdea(
      { idea: idea.trim() },
      {
        onSuccess: (data: ValidationResult) => {
          setResult(data);
        },
      }
    );
  };

  const getIndicatorConfig = (indicator: string) => {
    switch (indicator) {
      case "green":
        return {
          icon: "checkmark-circle",
          color: "#059669",
          bg: "#D1FAE5",
          border: "#A7F3D0",
          label: "Green Light",
        };
      case "yellow":
        return {
          icon: "alert-circle",
          color: "#D97706",
          bg: "#FEF3C7",
          border: "#FDE68A",
          label: "Competitive",
        };
      case "crowded":
        return {
          icon: "close-circle",
          color: "#DC2626",
          bg: "#FEE2E2",
          border: "#FECACA",
          label: "Crowded Space",
        };
      default:
        return {
          icon: "help-circle",
          color: "#4B5563",
          bg: "#F3F4F6",
          border: "#E5E7EB",
          label: "Unknown",
        };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.appColors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Idea Validator</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.springify()}>
            <View style={styles.titleRow}>
              <Ionicons name="bulb" size={24} color={Colors.defaults.ORANGE} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.title}>Validate Your Startup Idea</Text>
                <Text style={styles.subtitle}>Check if similar companies exist in 5,773 YC startups</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Describe your startup idea</Text>
              <TextInput
                style={[styles.textInput, isFocused && styles.textInputFocused]}
                multiline
                placeholder="E.g., AI-powered code review tool that helps developers write better code by analyzing pull requests..."
                placeholderTextColor={Colors.appColors.grayMuted}
                value={idea}
                onChangeText={setIdea}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!isPending}
                textAlignVertical="top"
              />
              <View style={styles.inputFooter}>
                <Text style={[styles.charCount, !isValidLength && idea.length > 0 && { color: Colors.defaults.RED }]}>
                  {idea.length} / {minChars} chars (min)
                </Text>
                <Text style={styles.readyText}>
                  {isValidLength ? "✓ Ready" : "✗ Too short"}
                </Text>
              </View>
            </View>

            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Example ideas to try:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.exampleScroll}>
                {[
                  "AI chatbot for customer support",
                  "No-code tool for building internal apps",
                  "Platform for freelance developers",
                ].map((example, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.exampleChip}
                    onPress={() => setIdea(example)}
                  >
                    <Text style={styles.exampleChipText}>{example}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[styles.validateBtn, (!isValidLength || isPending) && styles.validateBtnDisabled]}
              onPress={handleValidate}
              disabled={!isValidLength || isPending}
              activeOpacity={0.8}
            >
              {isPending ? (
                <>
                  <ActivityIndicator color={Colors.appColors.white} style={{ marginRight: 8 }} />
                  <Text style={styles.validateBtnText}>Analyzing idea...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="search" size={20} color={Colors.appColors.white} style={{ marginRight: 8 }} />
                  <Text style={styles.validateBtnText}>Validate Idea</Text>
                </>
              )}
            </TouchableOpacity>

            {error && (
              <Animated.View entering={FadeIn} style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color={Colors.defaults.RED} />
                <Text style={styles.errorText}>
                  {(error as any)?.response?.data?.detail || "Failed to validate idea. Please try again."}
                </Text>
              </Animated.View>
            )}
          </Animated.View>

          {result && (
            <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.resultsContainer}>
              <View style={styles.indicatorCard}>
                <View style={styles.indicatorHeaderRow}>
                  <Ionicons
                    name={getIndicatorConfig(result.market_indicator).icon as any}
                    size={36}
                    color={getIndicatorConfig(result.market_indicator).color}
                  />
                  <View style={styles.indicatorHeaderRight}>
                    <View style={styles.indicatorTitleRow}>
                      <View style={[
                        styles.indicatorBadge,
                        { backgroundColor: getIndicatorConfig(result.market_indicator).bg, borderColor: getIndicatorConfig(result.market_indicator).border }
                      ]}>
                        <Text style={[styles.indicatorBadgeText, { color: getIndicatorConfig(result.market_indicator).color }]}>
                          {getIndicatorConfig(result.market_indicator).label}
                        </Text>
                      </View>
                      <Text style={styles.indicatorSimilarCount}>
                        {result.total_similar} similar found
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.marketAnalysisText}>
                  {result.market_analysis}
                </Text>

                <View style={styles.marketStatsRow}>
                  <View style={styles.marketStatItem}>
                    <Ionicons name="trending-up" size={14} color={Colors.appColors.grayDark} />
                    <Text style={styles.marketStatText}>{result.market_size_percentage}% of YC portfolio</Text>
                  </View>
                  {result.industry_breakdown && Object.keys(result.industry_breakdown).length > 0 && (
                    <View style={styles.marketStatItem}>
                      <Ionicons name="people" size={14} color={Colors.appColors.grayDark} />
                      <Text style={styles.marketStatText}>{Object.keys(result.industry_breakdown).length} industries</Text>
                    </View>
                  )}
                </View>
              </View>

              {result.total_similar === 0 && (
                <View style={styles.successCard}>
                  <Ionicons name="bulb-outline" size={48} color="#059669" style={{ alignSelf: "center", marginBottom: 12 }} />
                  <Text style={styles.successTitle}>Congratulations! 🎉</Text>
                  <Text style={styles.successText}>
                    No similar companies found in the YC portfolio. You might have first-mover advantage!
                  </Text>
                  <Text style={styles.successSubtext}>
                    Note: This doesn't mean the idea is unique globally. Always validate with potential customers.
                  </Text>
                </View>
              )}

              {result.similar_companies && result.similar_companies.length > 0 && (
                <View style={styles.similarCompaniesSection}>
                  <View style={styles.similarCompaniesHeader}>
                    <Text style={styles.sectionTitle}>Similar Companies</Text>
                    <Text style={styles.sectionSubtitle}>Sorted by similarity</Text>
                  </View>
                  
                  {result.similar_companies.map((company, idx) => (
                    <Animated.View key={company.id} entering={FadeInDown.delay(300 + idx * 50).springify()}>
                      <SimilarCompanyCard company={company} />
                    </Animated.View>
                  ))}
                </View>
              )}
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    backgroundColor: Colors.appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  backButton: {
    padding: Responsive.widthPercentageToDP(2),
    marginLeft: -Responsive.widthPercentageToDP(2),
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  scrollContent: {
    padding: Responsive.widthPercentageToDP(4),
    paddingBottom: Responsive.heightPercentageToDP(10),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  inputContainer: {
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  inputLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  textInput: {
    backgroundColor: Colors.appColors.white,
    borderWidth: 1.5,
    borderColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.widthPercentageToDP(4),
    padding: Responsive.widthPercentageToDP(4),
    height: Responsive.heightPercentageToDP(15),
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  textInputFocused: {
    borderColor: Colors.defaults.ORANGE,
    shadowColor: Colors.defaults.ORANGE,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPercentageToDP(1),
    paddingHorizontal: Responsive.widthPercentageToDP(1),
  },
  charCount: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.success,
  },
  readyText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  exampleContainer: {
    marginBottom: Responsive.heightPercentageToDP(4),
  },
  exampleTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayDark,
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  exampleScroll: {
    gap: Responsive.widthPercentageToDP(2),
    paddingRight: Responsive.widthPercentageToDP(4),
  },
  exampleChip: {
    backgroundColor: Colors.appColors.lightBackground,
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1.2),
    borderRadius: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  exampleChipText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.secondary,
  },
  validateBtn: {
    backgroundColor: Colors.defaults.ORANGE,
    borderRadius: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.defaults.ORANGE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  validateBtnDisabled: {
    opacity: 0.5,
  },
  validateBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.white,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: Responsive.widthPercentageToDP(3),
    borderRadius: Responsive.widthPercentageToDP(2),
    marginTop: Responsive.heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.defaults.RED,
    marginLeft: Responsive.widthPercentageToDP(2),
    flex: 1,
  },
  resultsContainer: {
    marginTop: Responsive.heightPercentageToDP(4),
  },
  indicatorCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5),
    padding: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    marginBottom: Responsive.heightPercentageToDP(3),
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  indicatorHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  indicatorHeaderRight: {
    flex: 1,
    marginLeft: Responsive.widthPercentageToDP(3),
  },
  indicatorTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Responsive.widthPercentageToDP(2),
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  indicatorBadge: {
    paddingHorizontal: Responsive.widthPercentageToDP(2),
    paddingVertical: Responsive.heightPercentageToDP(0.3),
    borderRadius: Responsive.widthPercentageToDP(1),
    borderWidth: 1,
  },
  indicatorBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(11),
  },
  indicatorSimilarCount: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
  marketAnalysisText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
    lineHeight: Responsive.convertFontScale(20),
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  marketStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(4),
  },
  marketStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(1.5),
  },
  marketStatText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayDark,
  },
  successCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: Responsive.widthPercentageToDP(3),
    padding: Responsive.widthPercentageToDP(5),
    borderWidth: 2,
    borderColor: "#BBF7D0",
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  successTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: "#064E3B",
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  successText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: "#065F46",
    textAlign: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  successSubtext: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(11),
    color: "#047857",
    textAlign: "center",
    fontStyle: "italic",
  },
  similarCompaniesSection: {
    marginTop: Responsive.heightPercentageToDP(1),
  },
  similarCompaniesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  sectionSubtitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
  },
});
