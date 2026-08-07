import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../styles";
import { Startup } from "../search";

interface SelectedStartupCardProps {
  selectedStartup: Startup;
  onPressOpenCompany: (value: Startup) => void;
}

export default function SelectedStartupCard({
  selectedStartup,
  onPressOpenCompany,
}: SelectedStartupCardProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.detailCard,
        {
          bottom: Math.max(insets.bottom, 24) + 64, // Elevate above tabs
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: selectedStartup.logoBg, overflow: "hidden" },
          ]}
        >
          {selectedStartup.logoUrl ? (
            <Image
              source={{ uri: selectedStartup.logoUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.logoBoxText}>{selectedStartup.logo}</Text>
          )}
        </View>
        <View style={styles.cardTitleInfo}>
          <Text style={styles.startupName} numberOfLines={1}>
            {selectedStartup.name}
          </Text>
          <Text style={styles.startupDesc} numberOfLines={2}>
            {selectedStartup.description}
          </Text>
        </View>
      </View>

      {/* Badges Row */}
      <View style={styles.badgesRow}>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>🇺🇸 {selectedStartup.country}</Text>
        </View>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{selectedStartup.batch}</Text>
        </View>
        {selectedStartup.hiring && (
          <View style={[styles.metaBadge, styles.hiringBadge]}>
            <Text style={[styles.metaBadgeText, styles.hiringBadgeText]}>
              🟢 Hiring
            </Text>
          </View>
        )}
      </View>

      {/* Open Company CTA */}
      <Pressable
        style={styles.openBtn}
        onPress={() => onPressOpenCompany(selectedStartup)}
      >
        <Text style={styles.openBtnText}>Open Company →</Text>
      </Pressable>
    </View>
  );
}
