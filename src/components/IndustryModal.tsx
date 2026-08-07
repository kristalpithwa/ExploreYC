import React from "react";
import { Modal, Pressable, View, Text, ScrollView } from "react-native";
import styles from "@/app/(discover)/styles";

interface IndustryModalProps {
  visible: boolean;
  onClose: () => void;
  industries: string[];
  onSelectIndustry: (industry: string | null) => void;
}

export default function IndustryModal({
  visible,
  onClose,
  industries,
  onSelectIndustry,
}: IndustryModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Industry</Text>
          <ScrollView style={styles.modalList}>
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                onSelectIndustry(null);
                onClose();
              }}
            >
              <Text style={styles.modalItemText}>All Industries</Text>
            </Pressable>
            {industries.map((ind: string) => (
              <Pressable
                key={ind}
                style={styles.modalItem}
                onPress={() => {
                  onSelectIndustry(ind);
                  onClose();
                }}
              >
                <Text style={styles.modalItemText}>{ind}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
