import React, { useState, useMemo, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Map,
  Camera,
  ViewAnnotation,
  type CameraRef,
  type MapRef,
} from "@maplibre/maplibre-react-native";

import {
  useGetMapStartups,
  useGetFilterBatches,
  useGetFilterIndustries,
} from "@/services/apiService";
import styles from "./styles";
import { Colors } from "@/theme";
import BatchModal from "@/components/BatchModal";
import IndustryModal from "@/components/IndustryModal";
import SelectedStartupCard from "./components/SelectedStartupCard";
import StartupPin from "./components/StartupPin";
import { useRouter } from "expo-router";

export interface Startup {
  id: string;
  name: string;
  batch: string;
  description: string;
  category: string;
  logo: string;
  logoBg: string;
  logoUrl?: string;
  coordinates: [number, number]; // [longitude, latitude]
  hiring: boolean;
  country: string;
}

const getLogoBg = (name: string) => {
  const colors = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#4CD964",
    "#5AC8FA",
    "#007AFF",
    "#5856D6",
    "#FF2D55",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const SF_CENTER: [number, number] = [-122.401, 37.773];

const DEFAULT_ZOOM = 12.5;

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const cameraRef = useRef<CameraRef>(null);
  const mapRef = useRef<MapRef>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBatch, setSelectedBatch] = useState<string | null>(
    "Winter 2026",
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isHiringOnly, setIsHiringOnly] = useState(false);

  const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
  const [isIndustryModalVisible, setIsIndustryModalVisible] = useState(false);

  const { data: batches = [] } = useGetFilterBatches();
  const { data: industries = [] } = useGetFilterIndustries();

  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const queryParams = useMemo(() => {
    const params: any = {};
    if (selectedBatch) params.batch = selectedBatch;
    if (isHiringOnly) params.is_hiring = true;
    return params;
  }, [selectedBatch, isHiringOnly]);

  const { data: mapData } = useGetMapStartups(queryParams);

  const startups: Startup[] = useMemo(() => {
    if (!mapData?.companies) return [];

    const seenCoords: Record<string, number> = {};

    return mapData.companies.map((c: any) => {
      const coordKey = `${c.longitude},${c.latitude}`;
      const count = seenCoords[coordKey] || 0;
      seenCoords[coordKey] = count + 1;

      let lng = c.longitude;
      let lat = c.latitude;

      // If multiple companies share the exact same location (e.g., generic "San Francisco"),
      // apply a small spiral offset so the pins don't overlap perfectly.
      if (count > 0) {
        const angle = count * 0.5 * Math.PI; // 90 degree increments
        const radius = 0.0015 * Math.sqrt(count); // distance increases with count
        lng += Math.cos(angle) * radius;
        lat += Math.sin(angle) * radius;
      }

      return {
        id: c.id.toString(),
        name: c.name,
        batch: c.batch,
        description: c.one_liner,
        category: c.industry,
        logo: c.name.charAt(0),
        logoBg: getLogoBg(c.name),
        logoUrl: c.small_logo_thumb_url,
        coordinates: [lng, lat],
        hiring: Boolean(c.is_hiring),
        country: c.country,
        slug: c.slug,
      };
    });
  }, [mapData]);

  const lastPinPressTimeRef = useRef(0);

  // Filter startups based on search and industry
  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      const matchesSearch = startup.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesIndustry = selectedIndustry
        ? startup.category === selectedIndustry
        : true;

      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry, startups]);

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

  const handleZoomIn = async () => {
    const currentZoom = await mapRef.current?.getZoom();
    if (currentZoom !== undefined) {
      cameraRef.current?.flyTo({
        zoom: currentZoom + 1,
        duration: 500,
      });
    }
  };

  const handleZoomOut = async () => {
    const currentZoom = await mapRef.current?.getZoom();
    if (currentZoom !== undefined) {
      cameraRef.current?.flyTo({
        zoom: currentZoom - 1,
        duration: 500,
      });
    }
  };

  const handleOpenCompany = (value: any) => {
    router.push({
      pathname: "/(discover)/companyDetails",
      params: { slug: value.slug },
    });
    setSelectedStartup(null);
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
        ref={mapRef}
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
            <StartupPin
              startup={startup}
              isSelected={selectedStartup?.id === startup.id}
              onSelect={handleSelectStartup}
            />
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
          <Pressable
            onPress={() => setIsBatchModalVisible(true)}
            style={[styles.pill, selectedBatch !== null && styles.pillActive]}
          >
            <Text
              style={[
                styles.pillText,
                selectedBatch !== null && styles.pillTextActive,
              ]}
            >
              Batch: {selectedBatch || "All"} ▼
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setIsIndustryModalVisible(true)}
            style={[
              styles.pill,
              selectedIndustry !== null && styles.pillActive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selectedIndustry !== null && styles.pillTextActive,
              ]}
            >
              Industry: {selectedIndustry || "All"} ▼
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setIsHiringOnly(!isHiringOnly)}
            style={[styles.pill, isHiringOnly && styles.pillActive]}
          >
            <Text
              style={[styles.pillText, isHiringOnly && styles.pillTextActive]}
            >
              {isHiringOnly ? "🟢 Hiring Only" : "Hiring Only"}
            </Text>
          </Pressable>
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
      {selectedStartup && (
        <SelectedStartupCard
          selectedStartup={selectedStartup}
          onPressOpenCompany={handleOpenCompany}
        />
      )}

      <BatchModal
        visible={isBatchModalVisible}
        onClose={() => setIsBatchModalVisible(false)}
        batches={batches}
        onSelectBatch={setSelectedBatch}
      />

      <IndustryModal
        visible={isIndustryModalVisible}
        onClose={() => setIsIndustryModalVisible(false)}
        industries={industries}
        onSelectIndustry={setSelectedIndustry}
      />
    </View>
  );
}
