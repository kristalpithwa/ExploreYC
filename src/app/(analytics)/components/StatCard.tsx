import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../theme/Colors";

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, iconName, color }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={16} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.appColors.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.appColors.borderLight,
    shadowColor: colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    margin: 4,
    minWidth: "45%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: colors.appColors.grayMuted,
    marginLeft: 6,
    fontFamily: "SpaceMono-Regular", // Replicating font-mono
    textTransform: "lowercase",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Bold",
  },
});
