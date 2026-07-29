import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import styles from "../styles";
import { Startup } from "../search";

interface StartupPinProps {
  startup: Startup;
  isSelected: boolean;
  onSelect: (startup: Startup) => void;
}

export default function StartupPin({
  startup,
  isSelected,
  onSelect,
}: StartupPinProps) {
  return (
    <Pressable
      onPress={() => onSelect(startup)}
      style={[styles.pinOuter, isSelected && styles.pinOuterSelected]}
    >
      <View style={[styles.pinInner, { backgroundColor: startup.logoBg }]}>
        {startup.logoUrl ? (
          <Image
            source={{ uri: startup.logoUrl }}
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
            contentFit="cover"
          />
        ) : (
          <Text style={styles.pinText}>{startup.logo}</Text>
        )}
      </View>
    </Pressable>
  );
}
