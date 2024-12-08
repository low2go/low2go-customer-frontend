import React, { useState } from 'react';
import { Button, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/app/constants/colors';
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker


interface SortButtonProps {
  onSortSelect: (selectedSortOrder: string) => void; // Callback to pass selected sort order
}

const SortButton: React.FC<SortButtonProps> = ({ onSortSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [sortOrder, setSortOrder] = useState<string>('price_asc');  // Default sorting by price ascending
  const [buttonLabel, setButtonLabel] = useState<string>('Sort Items'); // Default button label
  
  // Mapping sort values to button labels
  const sortLabels: { [key: string]: string } = {
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
    name_asc: 'Name: A to Z',
    name_desc: 'Name: Z to A',
  };

  // Function to handle sort option change and pass it back to the parent
  const handleSelectOption = (option: string) => {
    setSortOrder(option);
    setButtonLabel(sortLabels[option]); // Set the button label to the selected sort option
    onSortSelect(option); // Pass the selected value back to the parent
    setModalVisible(false); // Close modal after selection
  };

  return (
    <View>
      {/* Button to open the sort options modal, with dynamic label */}
      <Button title={buttonLabel} onPress={() => setModalVisible(true)} />

      {/* Modal for Sorting Options */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal on Android back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalHeader}>Sort by:</Text>
            <Picker
              selectedValue={sortOrder}
              style={styles.picker}
              onValueChange={(itemValue) => setSortOrder(itemValue)} // Update the local sortOrder state
            >
              <Picker.Item label="Price: Low to High" value="price_asc" />
              <Picker.Item label="Price: High to Low" value="price_desc" />
              <Picker.Item label="Name: A to Z" value="name_asc" />
              <Picker.Item label="Name: Z to A" value="name_desc" />
            </Picker>

            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleSelectOption(sortOrder)} // Handle the selection and pass back to parent
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 200,
    width: '100%',
  },
  confirmButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SortButton;
