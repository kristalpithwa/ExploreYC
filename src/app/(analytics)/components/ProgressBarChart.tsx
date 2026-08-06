import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import colors from "../../../theme/Colors";

interface ProgressBarChartProps {
  data: { name: string; value: number }[];
  maxValue: number;
  color: string;
  delayIndex?: number;
}

export const ProgressBarChart: React.FC<ProgressBarChartProps> = ({
  data,
  maxValue,
  color,
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <ProgressBarItem
          key={item.name}
          item={item}
          maxValue={maxValue}
          color={color}
          index={index}
        />
      ))}
    </View>
  );
};

const ProgressBarItem: React.FC<{
  item: { name: string; value: number };
  maxValue: number;
  color: string;
  index: number;
}> = ({ item, maxValue, color, index }) => {
  const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withDelay(
      100 + index * 50,
      withTiming(percentage, { duration: 800 })
    );
  }, [percentage, index, progressWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  return (
    <View style={styles.itemContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          <Text style={styles.indexText}>{index + 1}. </Text>
          {item.name}
        </Text>
        <Text style={styles.valueText}>{item.value.toLocaleString()}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { backgroundColor: color }, animatedStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  itemContainer: {
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    flex: 1,
    fontSize: 13,
    color: colors.appColors.secondary,
    fontFamily: "SpaceMono-Regular",
    paddingRight: 8,
  },
  indexText: {
    color: colors.appColors.grayMuted,
    fontSize: 11,
  },
  valueText: {
    fontSize: 12,
    color: colors.appColors.grayMuted,
    fontFamily: "SpaceMono-Regular",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.opacityColors.blackOpacity10,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
