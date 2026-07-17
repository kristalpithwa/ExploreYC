import React, { useState, useMemo, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Map,
  Camera,
  ViewAnnotation,
  type CameraRef,
} from "@maplibre/maplibre-react-native";
import { Colors } from "@/theme";
import styles from "./styles";

interface Startup {
  id: string;
  name: string;
  batch: string;
  description: string;
  category: string;
  logo: string;
  logoBg: string;
  coordinates: [number, number]; // [longitude, latitude]
  hiring: boolean;
  country: string;
}

const mockStartups: Startup[] = [
  {
    id: "1",
    name: "Stripe",
    batch: "Summer 2009",
    description:
      "Financial infrastructure platform for the internet. Payments, billing, and developer APIs.",
    category: "Fintech",
    logo: "S",
    logoBg: Colors.appColors.brandStripe,
    coordinates: [-122.3917, 37.7749],
    hiring: true,
    country: "United States",
  },
  {
    id: "2",
    name: "Airbnb",
    batch: "Winter 2009",
    description:
      "Online marketplace for short-term homestays and experiences worldwide.",
    category: "Travel",
    logo: "A",
    logoBg: Colors.appColors.brandAirbnb,
    coordinates: [-122.4038, 37.7716],
    hiring: false,
    country: "United States",
  },
  {
    id: "3",
    name: "OpenAI",
    batch: "Winter 2021",
    description:
      "AI research and deployment company behind ChatGPT, GPT-4, and DALL-E.",
    category: "AI",
    logo: "O",
    logoBg: Colors.appColors.brandOpenAI,
    coordinates: [-122.4148, 37.7619],
    hiring: true,
    country: "United States",
  },
  {
    id: "4",
    name: "Dropbox",
    batch: "Summer 2007",
    description:
      "Modern workspace that keeps files organized and teams in sync with cloud storage.",
    category: "B2B",
    logo: "D",
    logoBg: "#0061FE",
    coordinates: [-122.3892, 37.777],
    hiring: false,
    country: "United States",
  },
  {
    id: "5",
    name: "Instacart",
    batch: "Summer 2012",
    description:
      "Grocery delivery and pick-up service in the United States and Canada.",
    category: "Fintech",
    logo: "I",
    logoBg: "#43B02A",
    coordinates: [-122.3934, 37.7786],
    hiring: true,
    country: "United States",
  },
  {
    id: "6",
    name: "Coinbase",
    batch: "Summer 2012",
    description:
      "Digital currency exchange offering cryptocurrency trading, custody, and wallet services.",
    category: "Fintech",
    logo: "C",
    logoBg: "#0052FF",
    coordinates: [-122.4018, 37.7901],
    hiring: true,
    country: "United States",
  },
];

const categories = ["All", "Hiring", "AI", "Fintech", "Travel", "B2B"];

const SF_CENTER: [number, number] = [-122.401, 37.773];
const DEFAULT_ZOOM = 12.5;

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraRef>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const lastPinPressTimeRef = useRef(0);

  // Filter startups based on search and category
  const filteredStartups = useMemo(() => {
    return mockStartups.filter((startup) => {
      const matchesSearch = startup.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (selectedCategory === "Hiring") {
        matchesCategory = startup.hiring;
      } else if (selectedCategory !== "All") {
        matchesCategory = startup.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectStartup = (startup: Startup) => {
    lastPinPressTimeRef.current = Date.now();
    setSelectedStartup(startup);
    cameraRef.current?.flyTo({
      center: startup.coordinates,
      zoom: 14.5,
      duration: 1000,
    });
  };

  const handleMapPress = () => {
    if (Date.now() - lastPinPressTimeRef.current < 200) {
      return;
    }
    setSelectedStartup(null);
  };

  const handleResetCamera = () => {
    setSelectedStartup(null);
    cameraRef.current?.flyTo({
      center: SF_CENTER,
      zoom: DEFAULT_ZOOM,
      duration: 1000,
    });
  };

  const handleZoomIn = () => {
    cameraRef.current?.flyTo({
      zoom: 14.5,
      duration: 500,
    });
  };

  const handleZoomOut = () => {
    cameraRef.current?.flyTo({
      zoom: 11,
      duration: 500,
    });
  };

  const initialViewState = useMemo(
    () => ({
      center: SF_CENTER,
      zoom: DEFAULT_ZOOM,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Maplibre Map View */}
      <Map
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
        logo={false}
        attribution={false}
        onPress={handleMapPress}
      >
        <Camera ref={cameraRef} initialViewState={initialViewState} />

        {/* Static Map Cluster Indicator (Stitch style) */}
        <ViewAnnotation id="cluster-sf" lngLat={[-122.38, 37.75]}>
          <View style={styles.clusterPin}>
            <Text style={styles.clusterText}>140</Text>
          </View>
        </ViewAnnotation>

        {/* Startup Pins */}
        {filteredStartups.map((startup) => (
          <ViewAnnotation
            key={startup.id}
            id={`pin-${startup.id}`}
            lngLat={startup.coordinates}
          >
            <Pressable
              onPress={() => handleSelectStartup(startup)}
              style={[
                styles.pinOuter,
                selectedStartup?.id === startup.id && styles.pinOuterSelected,
              ]}
            >
              <View
                style={[styles.pinInner, { backgroundColor: startup.logoBg }]}
              >
                <Text style={styles.pinText}>{startup.logo}</Text>
              </View>
            </Pressable>
          </ViewAnnotation>
        ))}
      </Map>

      {/* Floating Header UI */}
      <View
        style={[styles.topControlsContainer, { paddingTop: insets.top + 10 }]}
      >
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search companies..."
            placeholderTextColor={Colors.appColors.grayMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>⚙️</Text>
          </Pressable>
        </View>

        {/* Filter Chips Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsScrollView}
          contentContainerStyle={styles.pillsContent}
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
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Floating Map Controls */}
      <View style={styles.floatingMapControls}>
        <Pressable onPress={handleResetCamera} style={styles.mapControlBtn}>
          <Text style={styles.mapControlIcon}>🎯</Text>
        </Pressable>

        <View style={styles.zoomControlsGroup}>
          <Pressable
            onPress={handleZoomIn}
            style={[styles.zoomBtn, styles.zoomBtnBorder]}
          >
            <Text style={styles.mapControlIcon}>＋</Text>
          </Pressable>
          <Pressable onPress={handleZoomOut} style={styles.zoomBtn}>
            <Text style={styles.mapControlIcon}>－</Text>
          </Pressable>
        </View>
      </View>

      {/* Selected Startup Detail Card Bottom Sheet */}
      {selectedStartup ? (
        <View
          style={[
            styles.detailCard,
            {
              bottom: Math.max(insets.bottom, 24) + 64, // Elevate above tabs
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: selectedStartup.logoBg },
              ]}
            >
              <Text style={styles.logoBoxText}>{selectedStartup.logo}</Text>
            </View>
            <View style={styles.cardTitleInfo}>
              <Text style={styles.startupName} numberOfLines={1}>
                {selectedStartup.name}
              </Text>
              <Text style={styles.startupDesc} numberOfLines={2}>
                {selectedStartup.description}
              </Text>
            </View>
          </View>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>
                🇺🇸 {selectedStartup.country}
              </Text>
            </View>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>{selectedStartup.batch}</Text>
            </View>
            {selectedStartup.hiring && (
              <View style={[styles.metaBadge, styles.hiringBadge]}>
                <Text style={[styles.metaBadgeText, styles.hiringBadgeText]}>
                  🟢 Hiring
                </Text>
              </View>
            )}
          </View>

          {/* Open Company CTA */}
          <Pressable
            style={styles.openBtn}
            onPress={() =>
              router.push({
                pathname: "/(home)/companyDetails",
                params: { id: selectedStartup.id },
              })
            }
          >
            <Text style={styles.openBtnText}>Open Company →</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
