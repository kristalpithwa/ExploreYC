import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { Colors, Fonts, Responsive } from "../../../theme";

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
  height = Responsive.heightPercentageToDP(20),
}) => {
  return (
    <View style={[styles.container, { height: height + Responsive.heightPercentageToDP(4) }]}>
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
      100 + index * 40,
      withSpring(percentage, { damping: 14, stiffness: 90 })
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
    paddingHorizontal: Responsive.widthPercentageToDP(2),
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: Responsive.widthPercentageToDP(0.5),
  },
  barBackground: {
    width: "100%",
    maxWidth: Responsive.widthPercentageToDP(6),
    backgroundColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.widthPercentageToDP(1),
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: Responsive.widthPercentageToDP(1),
  },
  labelText: {
    marginTop: Responsive.heightPercentageToDP(1),
    fontSize: Responsive.convertFontScale(9),
    color: Colors.appColors.grayMuted,
    fontFamily: Fonts.medium,
    textAlign: "center",
    height: Responsive.heightPercentageToDP(3.5),
  },
});
