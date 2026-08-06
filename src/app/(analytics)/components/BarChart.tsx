import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import colors from "../../../theme/Colors";

interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue: number;
  color: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  color,
  height = 200,
}) => {
  return (
    <View style={[styles.container, { height: height + 40 }]}>
      <View style={styles.chartArea}>
        {data.map((item, index) => (
          <BarItem
            key={item.label}
            item={item}
            maxValue={maxValue}
            color={color}
            index={index}
            totalItems={data.length}
            chartHeight={height}
          />
        ))}
      </View>
    </View>
  );
};

const BarItem: React.FC<{
  item: { label: string; value: number };
  maxValue: number;
  color: string;
  index: number;
  totalItems: number;
  chartHeight: number;
}> = ({ item, maxValue, color, index, chartHeight }) => {
  const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
  const progressHeight = useSharedValue(0);

  useEffect(() => {
    progressHeight.value = withDelay(
      100 + index * 30,
      withTiming(percentage, { duration: 800 })
    );
  }, [percentage, index, progressHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${progressHeight.value}%`,
    };
  });

  return (
    <View style={styles.barContainer}>
      <View style={[styles.barBackground, { height: chartHeight }]}>
        <Animated.View
          style={[
            styles.barFill,
            { backgroundColor: color },
            animatedStyle,
          ]}
        />
      </View>
      <Text style={styles.labelText} numberOfLines={1}>
        {item.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  chartArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 2,
  },
  barBackground: {
    width: "100%",
    maxWidth: 24,
    backgroundColor: colors.opacityColors.blackOpacity10,
    borderRadius: 4,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 4,
  },
  labelText: {
    marginTop: 8,
    fontSize: 10,
    color: colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
    textAlign: "center",
    height: 30,
  },
});
