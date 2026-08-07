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
import { usePredictSuccessMutation } from "@/services/apiService";
import { SimilarCompanyCard } from "./components/SimilarCompanyCard";
import { PredictionResult, PredictorPayload } from "@/types/predictor";

export default function SuccessPredictorScreen() {
  const router = useRouter();
  const { mutate: predictSuccess, isPending, error } = usePredictSuccessMutation();

  const [formData, setFormData] = useState<PredictorPayload>({
    idea_description: "",
    industry: "",
    market_type: "",
    location: "",
    founder_info: "",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);

  const isValidLength = formData.idea_description.trim().length >= 10;

  const handlePredict = () => {
    if (!isValidLength) return;
    setResult(null); // Clear previous results
    
    // Clean up empty optional fields
    const payload = { ...formData };
    if (!payload.industry?.trim()) delete payload.industry;
    if (!payload.market_type?.trim()) delete payload.market_type;
    if (!payload.location?.trim()) delete payload.location;
    if (!payload.founder_info?.trim()) delete payload.founder_info;

    predictSuccess(payload, {
      onSuccess: (data: PredictionResult) => {
        setResult(data);
      },
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case "unicorn": return "#8B5CF6"; // Purple
      case "series a+": return "#3B82F6"; // Blue
      case "seed": return "#10B981"; // Green
      case "pre-seed": return "#F59E0B"; // Yellow
      case "idea stage": return "#6B7280"; // Gray
      default: return "#E11D48"; // Pink/Red fallback
    }
  };

  const renderForm = () => (
    <Animated.View entering={FadeInDown.springify()}>
      <View style={styles.titleRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="sparkles" size={24} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Success Predictor</Text>
          <Text style={styles.subtitle}>Get scored against 5,772 YC companies</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Startup Idea <Text style={{ color: Colors.defaults.RED }}>*</Text></Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          multiline
          placeholder="Describe your product, target audience, and business model..."
          placeholderTextColor={Colors.appColors.grayMuted}
          value={formData.idea_description}
          onChangeText={(val) => setFormData({ ...formData, idea_description: val })}
          editable={!isPending}
          textAlignVertical="top"
        />
        <Text style={[styles.charCount, !isValidLength && formData.idea_description.length > 0 && { color: Colors.defaults.RED }]}>
          {formData.idea_description.length} / 10 chars (min)
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Industry (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. AI, FinTech"
            placeholderTextColor={Colors.appColors.grayMuted}
            value={formData.industry}
            onChangeText={(val) => setFormData({ ...formData, industry: val })}
            editable={!isPending}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Market (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. B2B SaaS"
            placeholderTextColor={Colors.appColors.grayMuted}
            value={formData.market_type}
            onChangeText={(val) => setFormData({ ...formData, market_type: val })}
            editable={!isPending}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Founder Background (Optional)</Text>
        <TextInput
          style={[styles.textInput, { height: 80 }]}
          multiline
          placeholder="e.g. Serial founder, ex-FAANG engineer, domain expert..."
          placeholderTextColor={Colors.appColors.grayMuted}
          value={formData.founder_info}
          onChangeText={(val) => setFormData({ ...formData, founder_info: val })}
          editable={!isPending}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[styles.predictBtn, (!isValidLength || isPending) && styles.predictBtnDisabled]}
        onPress={handlePredict}
        disabled={!isValidLength || isPending}
        activeOpacity={0.8}
      >
        {isPending ? (
          <>
            <ActivityIndicator color={Colors.appColors.white} style={{ marginRight: 8 }} />
            <Text style={styles.predictBtnText}>Running Analysis...</Text>
          </>
        ) : (
          <>
            <Ionicons name="analytics" size={20} color={Colors.appColors.white} style={{ marginRight: 8 }} />
            <Text style={styles.predictBtnText}>Predict Success</Text>
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Animated.View entering={FadeIn} style={styles.errorBox}>
          <Ionicons name="alert-circle" size={20} color={Colors.defaults.RED} />
          <Text style={styles.errorText}>
            {(error as any)?.response?.data?.detail || "Failed to predict success. Please try again."}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );

  const renderResults = () => {
    if (!result) return null;

    const tierColor = getTierColor(result.tier);

    return (
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.resultsContainer}>
        
        {/* Main Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Combined Score</Text>
          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreValue, { color: tierColor }]}>{result.combined_score}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>

          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: tierColor + "20", borderColor: tierColor }]}>
              <Ionicons name="trophy" size={14} color={tierColor} style={{ marginRight: 4 }} />
              <Text style={[styles.tierText, { color: tierColor }]}>{result.tier}</Text>
            </View>
            <Text style={styles.percentileText}>Top {result.percentile}% of ideas</Text>
          </View>
        </View>

        {/* Breakdown Scores */}
        <View style={styles.breakdownRow}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Idea</Text>
            <Text style={styles.breakdownValue}>{result.idea_score}/100</Text>
          </View>
          <View style={styles.breakdownDivider} />
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Market</Text>
            <Text style={styles.breakdownValue}>{result.market_score}/100</Text>
          </View>
          {result.team_score !== undefined && (
            <>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Team</Text>
                <Text style={styles.breakdownValue}>{result.team_score}/100</Text>
              </View>
            </>
          )}
        </View>

        {/* Similar Companies */}
        {result.similar_companies && result.similar_companies.length > 0 && (
          <View style={styles.similarCompaniesSection}>
            <View style={styles.similarCompaniesHeader}>
              <Text style={styles.sectionTitle}>Similar Success Stories</Text>
            </View>
            
            {result.similar_companies.map((company, idx) => (
              <Animated.View key={company.id} entering={FadeInDown.delay(300 + idx * 50).springify()}>
                <SimilarCompanyCard company={company} />
              </Animated.View>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.tryAnotherBtn}
          onPress={() => setResult(null)}
        >
          <Ionicons name="refresh" size={18} color="#E11D48" style={{ marginRight: 6 }} />
          <Text style={styles.tryAnotherBtnText}>Try Another Idea</Text>
        </TouchableOpacity>

      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.appColors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Success Predictor</Text>
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
          {!result ? renderForm() : renderResults()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
    padding: Responsive.widthPercentageToDP(5),
    paddingBottom: Responsive.heightPercentageToDP(10),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(4),
    gap: 16,
  },
  iconContainer: {
    width: Responsive.widthPercentageToDP(14),
    height: Responsive.widthPercentageToDP(14),
    backgroundColor: "#E11D48",
    borderRadius: Responsive.widthPercentageToDP(4),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(22),
    color: Colors.appColors.secondary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.grayMuted,
  },
  formGroup: {
    marginBottom: Responsive.heightPercentageToDP(2.5),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  textInput: {
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.widthPercentageToDP(3),
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(1.5),
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.secondary,
  },
  textArea: {
    height: Responsive.heightPercentageToDP(15),
    paddingTop: Responsive.heightPercentageToDP(2),
  },
  charCount: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    marginTop: 8,
    textAlign: "right",
  },
  predictBtn: {
    backgroundColor: "#E11D48",
    borderRadius: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    marginTop: Responsive.heightPercentageToDP(2),
  },
  predictBtnDisabled: {
    opacity: 0.5,
  },
  predictBtnText: {
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
    marginTop: Responsive.heightPercentageToDP(3),
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
    flex: 1,
  },
  scoreCard: {
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(5),
    padding: Responsive.widthPercentageToDP(6),
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  scoreTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  scoreCircle: {
    width: Responsive.widthPercentageToDP(40),
    height: Responsive.widthPercentageToDP(40),
    borderRadius: Responsive.widthPercentageToDP(20),
    backgroundColor: "#F9FAFB",
    borderWidth: 8,
    borderColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(3),
  },
  scoreValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(48),
    lineHeight: Responsive.convertFontScale(56),
  },
  scoreMax: {
    fontFamily: Fonts.semiBold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.grayMuted,
    marginTop: -8,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tierText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(12),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  percentileText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.grayDark,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(4),
    padding: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    marginBottom: Responsive.heightPercentageToDP(4),
  },
  breakdownItem: {
    flex: 1,
    alignItems: "center",
  },
  breakdownLabel: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    marginBottom: 4,
  },
  breakdownValue: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  breakdownDivider: {
    width: 1,
    backgroundColor: Colors.opacityColors.blackOpacity10,
    marginHorizontal: 16,
  },
  similarCompaniesSection: {
    marginTop: Responsive.heightPercentageToDP(2),
  },
  similarCompaniesHeader: {
    marginBottom: Responsive.heightPercentageToDP(2),
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.secondary,
  },
  tryAnotherBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Responsive.heightPercentageToDP(2),
    marginTop: Responsive.heightPercentageToDP(2),
  },
  tryAnotherBtnText: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
    color: "#E11D48",
  },
});
