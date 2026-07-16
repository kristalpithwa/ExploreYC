import React, { useState, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Map, Camera, ViewAnnotation, type CameraRef } from "@maplibre/maplibre-react-native";
import { Colors, Fonts, Responsive } from "@/theme";

interface Startup {
  id: string;
  name: string;
  batch: string;
  description: string;
  category: string;
  logo: string;
  logoBg: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const mockStartups: Startup[] = [
  {
    id: "1",
    name: "Stripe",
    batch: "S09 • 🇺🇸",
    description:
      "Financial infrastructure platform for the internet. Payments, billing, and developer APIs.",
    category: "Fintech",
    logo: "S",
    logoBg: Colors.appColors.brandStripe,
    coordinates: [-122.3917, 37.7749],
  },
  {
    id: "2",
    name: "Airbnb",
    batch: "W09 • 🇺🇸",
    description:
      "Online marketplace for short-term homestays and experiences worldwide.",
    category: "Travel",
    logo: "A",
    logoBg: Colors.appColors.brandAirbnb,
    coordinates: [-122.4038, 37.7716],
  },
  {
    id: "3",
    name: "OpenAI",
    batch: "W21 • 🇺🇸",
    description:
      "AI research and deployment company behind ChatGPT, GPT-4, and DALL-E.",
    category: "AI",
    logo: "O",
    logoBg: Colors.appColors.brandOpenAI,
    coordinates: [-122.4148, 37.7619],
  },
  {
    id: "4",
    name: "Dropbox",
    batch: "S07 • 🇺🇸",
    description:
      "Modern workspace that keeps files organized and teams in sync with cloud storage.",
    category: "B2B",
    logo: "D",
    logoBg: "#0061FE",
    coordinates: [-122.3892, 37.777],
  },
  {
    id: "5",
    name: "Instacart",
    batch: "S12 • 🇺🇸",
    description:
      "Grocery delivery and pick-up service in the United States and Canada.",
    category: "Fintech",
    logo: "I",
    logoBg: "#43B02A",
    coordinates: [-122.3934, 37.7786],
  },
  {
    id: "6",
    name: "Coinbase",
    batch: "S12 • 🇺🇸",
    description:
      "Digital currency exchange offering cryptocurrency trading, custody, and wallet services.",
    category: "Fintech",
    logo: "C",
    logoBg: "#0052FF",
    coordinates: [-122.4018, 37.7901],
  },
];

const categories = ["All", "AI", "Fintech", "Travel", "B2B"];

const SF_CENTER: [number, number] = [-122.401, 37.773];
const DEFAULT_ZOOM = 12.5;

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraRef>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  // Filter startups based on search and category
  const filteredStartups = useMemo(() => {
    return mockStartups.filter((startup) => {
      const matchesSearch = startup.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || startup.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectStartup = (startup: Startup) => {
    setSelectedStartup(startup);
    cameraRef.current?.flyTo({
      center: startup.coordinates,
      zoom: 14.5,
      duration: 1000,
    });
  };

  const handleResetCamera = () => {
    setSelectedStartup(null);
    cameraRef.current?.flyTo({
      center: SF_CENTER,
      zoom: DEFAULT_ZOOM,
      duration: 1000,
    });
  };

  const initialViewState = useMemo(() => ({
    center: SF_CENTER,
    zoom: DEFAULT_ZOOM,
  }), []);

  return (
    <View style={styles.container}>
      {/* Maplibre Map View */}
      <Map
        style={styles.map}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        logo={false}
        attribution={false}
        onPress={() => setSelectedStartup(null)}
      >
        <Camera
          ref={cameraRef}
          initialViewState={initialViewState}
        />

        {/* Startup Pins */}
        {filteredStartups.map((startup) => (
          <ViewAnnotation
            key={startup.id}
            id={`pin-${startup.id}`}
            lngLat={startup.coordinates}
            onPress={() => handleSelectStartup(startup)}
          >
            <View
              style={[
                styles.pinOuter,
                selectedStartup?.id === startup.id && styles.pinOuterSelected,
              ]}
            >
              <View style={[styles.pinInner, { backgroundColor: startup.logoBg }]}>
                <Text style={styles.pinText}>{startup.logo}</Text>
              </View>
            </View>
          </ViewAnnotation>
        ))}
      </Map>

      {/* Floating Header UI */}
      <View style={[styles.floatingHeader, { paddingTop: insets.top + 10 }]}>
        {/* Title */}
        <Text style={styles.headerTitle}>Discover YC Startups</Text>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search startup name..."
            placeholderTextColor={Colors.appColors.grayMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery("")}>
              <Text style={styles.clearSearchText}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Category Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScrollContainer}
          style={styles.pillsScrollView}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedStartup(null);
                }}
                style={[
                  styles.pill,
                  isActive ? styles.pillActive : styles.pillInactive,
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    isActive ? styles.pillTextActive : styles.pillTextInactive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Reset Camera Button */}
      <Pressable
        onPress={handleResetCamera}
        style={[
          styles.resetButton,
          { top: insets.top + Responsive.heightPercentageToDP(18) },
        ]}
      >
        <Text style={styles.resetButtonText}>🎯</Text>
      </Pressable>

      {/* Selected Startup Detail Card */}
      {selectedStartup ? (
        <View
          style={[
            styles.detailCard,
            {
              bottom:
                Math.max(insets.bottom, Responsive.heightPercentageToDP(2)) +
                Responsive.heightPercentageToDP(9.5),
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View
                style={[
                  styles.logoContainer,
                  { backgroundColor: selectedStartup.logoBg },
                ]}
              >
                <Text style={styles.logoText}>{selectedStartup.logo}</Text>
              </View>
              <View style={styles.cardTitleInfo}>
                <Text style={styles.startupName} numberOfLines={1}>
                  {selectedStartup.name}
                </Text>
                <Text style={styles.startupMeta}>
                  {selectedStartup.batch} • {selectedStartup.category}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => setSelectedStartup(null)}>
              <Text style={styles.closeCardText}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.startupDesc}>
            {selectedStartup.description}
          </Text>

          <View style={styles.cardActions}>
            <Pressable
              style={styles.primaryActionBtn}
              onPress={() => {
                // Future action like navigate details
              }}
            >
              <Text style={styles.primaryActionBtnText}>View Website</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColors.background,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    backgroundColor: "rgba(255,255,255,0.85)",
    borderBottomWidth: 1,
    borderBottomColor: Colors.opacityColors.blackOpacity4,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(18),
    color: Colors.appColors.primary,
    marginBottom: Responsive.heightPercentageToDP(1),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appColors.white,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    borderRadius: Responsive.widthPercentageToDP(2.5),
    paddingHorizontal: Responsive.widthPercentageToDP(3),
    height: Responsive.heightPercentageToDP(5),
    marginBottom: Responsive.heightPercentageToDP(1.2),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.black,
    padding: 0,
  },
  clearSearchText: {
    fontSize: Responsive.convertFontScale(14),
    color: Colors.appColors.grayMuted,
    marginLeft: Responsive.widthPercentageToDP(2),
  },
  pillsScrollView: {
    marginBottom: Responsive.heightPercentageToDP(1.2),
  },
  pillsScrollContainer: {
    alignItems: "center",
    gap: Responsive.widthPercentageToDP(2),
  },
  pill: {
    paddingHorizontal: Responsive.widthPercentageToDP(4),
    paddingVertical: Responsive.heightPercentageToDP(0.8),
    borderRadius: Responsive.widthPercentageToDP(5),
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: Colors.appColors.primary,
    borderColor: Colors.appColors.primary,
  },
  pillInactive: {
    backgroundColor: Colors.appColors.white,
    borderColor: Colors.opacityColors.blackOpacity10,
  },
  pillText: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(12),
  },
  pillTextActive: {
    color: Colors.appColors.white,
  },
  pillTextInactive: {
    color: Colors.appColors.secondary,
  },
  resetButton: {
    position: "absolute",
    right: Responsive.widthPercentageToDP(4),
    backgroundColor: Colors.appColors.white,
    width: Responsive.widthPercentageToDP(11),
    height: Responsive.heightPercentageToDP(5),
    borderRadius: Responsive.widthPercentageToDP(5.5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity10,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: Responsive.convertFontScale(16),
  },
  pinOuter: {
    width: Responsive.widthPercentageToDP(8.5),
    height: Responsive.widthPercentageToDP(8.5),
    borderRadius: Responsive.widthPercentageToDP(4.25),
    backgroundColor: Colors.appColors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.appColors.primary,
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  pinOuterSelected: {
    borderColor: Colors.appColors.black,
    transform: [{ scale: 1.25 }],
  },
  pinInner: {
    width: Responsive.widthPercentageToDP(6.5),
    height: Responsive.widthPercentageToDP(6.5),
    borderRadius: Responsive.widthPercentageToDP(3.25),
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(11),
  },
  detailCard: {
    position: "absolute",
    left: Responsive.widthPercentageToDP(4),
    right: Responsive.widthPercentageToDP(4),
    backgroundColor: Colors.appColors.white,
    borderRadius: Responsive.widthPercentageToDP(4),
    padding: Responsive.widthPercentageToDP(4),
    shadowColor: Colors.appColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.opacityColors.blackOpacity4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Responsive.heightPercentageToDP(1.2),
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    width: Responsive.widthPercentageToDP(10),
    height: Responsive.widthPercentageToDP(10),
    borderRadius: Responsive.widthPercentageToDP(5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPercentageToDP(3),
  },
  logoText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
  },
  cardTitleInfo: {
    flex: 1,
  },
  startupName: {
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.secondary,
  },
  startupMeta: {
    fontFamily: Fonts.medium,
    fontSize: Responsive.convertFontScale(11),
    color: Colors.appColors.grayMuted,
    marginTop: Responsive.heightPercentageToDP(0.2),
  },
  closeCardText: {
    fontSize: Responsive.convertFontScale(16),
    color: Colors.appColors.grayMuted,
    padding: Responsive.widthPercentageToDP(1),
  },
  startupDesc: {
    fontFamily: Fonts.regular,
    fontSize: Responsive.convertFontScale(13),
    color: Colors.appColors.tertiary,
    lineHeight: Responsive.convertFontScale(18),
    marginBottom: Responsive.heightPercentageToDP(1.5),
  },
  cardActions: {
    flexDirection: "row",
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: Colors.appColors.primary,
    height: Responsive.heightPercentageToDP(4.8),
    borderRadius: Responsive.widthPercentageToDP(2.5),
    justifyContent: "center",
    alignItems: "center",
  },
  primaryActionBtnText: {
    color: Colors.appColors.white,
    fontFamily: Fonts.bold,
    fontSize: Responsive.convertFontScale(13),
  },
});
