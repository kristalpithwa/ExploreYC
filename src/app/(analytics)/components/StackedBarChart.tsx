import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../theme/Colors";

interface StackedBarChartProps {
  data: {
    label: string;
    segments: { key: string; value: number; color: string }[];
  }[];
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((row, index) => {
        const total = row.segments.reduce((acc, seg) => acc + seg.value, 0);

        return (
          <View key={index} style={styles.row}>
            <Text style={styles.rowLabel} numberOfLines={1}>
              {row.label}
            </Text>
            <View style={styles.barBackground}>
              {row.segments.map((seg, i) => {
                const percentage = total > 0 ? (seg.value / total) * 100 : 0;
                if (percentage === 0) return null;
                return (
                  <View
                    key={seg.key}
                    style={[
                      styles.segment,
                      { width: `${percentage}%`, backgroundColor: seg.color },
                    ]}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rowLabel: {
    width: 60,
    fontSize: 12,
    color: colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
  },
  barBackground: {
    flex: 1,
    height: 16,
    flexDirection: "row",
    backgroundColor: colors.opacityColors.blackOpacity10,
    borderRadius: 4,
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
});
