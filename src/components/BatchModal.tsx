import React from "react";
import { Modal, Pressable, View, Text, ScrollView } from "react-native";
import styles from "./BatchModal.styles";

interface BatchModalProps {
  visible: boolean;
  onClose: () => void;
  batches: string[];
  onSelectBatch: (batch: string | null) => void;
}

export default function BatchModal({
  visible,
  onClose,
  batches,
  onSelectBatch,
}: BatchModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Batch</Text>
          <ScrollView style={styles.modalList}>
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                onSelectBatch(null);
                onClose();
              }}
            >
              <Text style={styles.modalItemText}>All Batches</Text>
            </Pressable>
            {batches.map((b: string) => (
              <Pressable
                key={b}
                style={styles.modalItem}
                onPress={() => {
                  onSelectBatch(b);
                  onClose();
                }}
              >
                <Text style={styles.modalItemText}>{b}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
