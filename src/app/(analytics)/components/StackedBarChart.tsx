import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Responsive } from "../../../theme";

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
    paddingTop: Responsive.heightPercentageToDP(1),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  rowLabel: {
    width: Responsive.widthPercentageToDP(15),
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    fontFamily: Fonts.medium,
  },
  barBackground: {
    flex: 1,
    height: Responsive.heightPercentageToDP(2),
    flexDirection: "row",
    backgroundColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.heightPercentageToDP(1),
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
});
