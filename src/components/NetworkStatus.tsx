import React from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Responsive } from '@/theme';

export default function NetworkStatus() {
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const [slideAnim] = React.useState(new Animated.Value(-100));

  // We consider the device offline if isConnected is strictly false.
  // During initial load, it might be null, so we avoid showing the banner until we're sure.
  const isOffline = netInfo.isConnected === false;

  React.useEffect(() => {
    if (isOffline) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -150, // Move it completely off-screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, slideAnim]);

  // Do not return null here, otherwise the exit animation won't play
  // and the component might unmount unexpectedly. The translateY will hide it.

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, Responsive.heightPercentageToDP(2)),
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons name="cloud-offline" size={20} color={Colors.appColors.white} />
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.appColors.error || '#FF3B30', // Red banner
    paddingBottom: Responsive.heightPercentageToDP(1.5),
    paddingHorizontal: Responsive.widthPercentageToDP(5.3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Responsive.widthPercentageToDP(2),
    zIndex: 9999, // Ensure it floats above everything
    ...Platform.select({
      ios: {
        shadowColor: Colors.appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(14),
  },
});
