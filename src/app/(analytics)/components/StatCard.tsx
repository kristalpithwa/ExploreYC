import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Responsive } from "../../../theme";

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, iconName, color }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
          <Ionicons name={iconName} size={Responsive.convertFontScale(16)} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[styles.value, { color: Colors.appColors.secondary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.appColors.white,
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(2.2), // slightly more vertical padding
    borderRadius: Responsive.widthPercentageToDP(3),
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: Responsive.heightPercentageToDP(1) },
    shadowOpacity: 0.04,
    shadowRadius: Responsive.widthPercentageToDP(3),
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  iconWrapper: {
    padding: Responsive.widthPercentageToDP(1.5),
    borderRadius: Responsive.widthPercentageToDP(2),
    marginRight: Responsive.widthPercentageToDP(2),
  },
  title: {
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    fontFamily: Fonts.medium,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: Responsive.convertFontScale(24),
    fontFamily: Fonts.bold,
  },
});
