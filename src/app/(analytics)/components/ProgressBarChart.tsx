import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { Colors, Fonts, Responsive } from "../../../theme";

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
      withSpring(percentage, { damping: 15, stiffness: 80 })
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
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Responsive.heightPercentageToDP(0.5),
  },
  nameText: {
    flex: 1,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.secondary,
    fontFamily: Fonts.medium,
    paddingRight: Responsive.widthPercentageToDP(2),
  },
  indexText: {
    color: Colors.appColors.grayMuted,
    fontSize: Responsive.convertFontScale(11),
    fontFamily: Fonts.medium,
  },
  valueText: {
    fontSize: Responsive.convertFontScale(12),
    color: Colors.appColors.grayMuted,
    fontFamily: Fonts.medium,
  },
  progressBarBackground: {
    height: Responsive.heightPercentageToDP(1),
    backgroundColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.heightPercentageToDP(0.5),
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: Responsive.heightPercentageToDP(0.5),
  },
});
