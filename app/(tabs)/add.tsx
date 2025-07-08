import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Camera, Search, Calendar, Tag, Package } from 'lucide-react-native';

const categories = [
  { id: 'medicine', name: 'Medicine', icon: '💊' },
  { id: 'cosmetics', name: 'Cosmetics', icon: '🧴' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧽' },
  { id: 'food', name: 'Food', icon: '🥫' },
  { id: 'other', name: 'Other', icon: '📦' },
];

export default function Add() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleScanBarcode = () => {
    Alert.alert('Camera', 'Barcode scanning would open camera here');
  };

  const handleSearchProduct = () => {
    Alert.alert('Search', 'Product search would open here');
  };

  const handleSaveProduct = () => {
    if (!productName || !selectedCategory) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }
    Alert.alert('Success', 'Product added successfully!');
    // Reset form
    setProductName('');
    setSelectedCategory('');
    setOpenDate('');
    setExpiryDate('');
    setNotes('');
    setProductImage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Product</Text>
        <Text style={styles.subtitle}>Track a new household item</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.scanSection}>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanBarcode}>
            <Camera size={24} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Scan Barcode</Text>
          </TouchableOpacity>
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearchProduct}>
            <Search size={20} color="#76ABAE" />
            <Text style={styles.searchButtonText}>Search Product Database</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              placeholderTextColor="#76ABAE"
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.label}>Open Date</Text>
              <TouchableOpacity style={styles.dateButton}>
                <Calendar size={16} color="#76ABAE" />
                <Text style={styles.dateButtonText}>
                  {openDate || 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateInput}>
              <Text style={styles.label}>Expiry Date</Text>
              <TouchableOpacity style={styles.dateButton}>
                <Calendar size={16} color="#76ABAE" />
                <Text style={styles.dateButtonText}>
                  {expiryDate || 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add storage instructions, usage notes..."
              placeholderTextColor="#76ABAE"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.label}>Quick Tags</Text>
            <View style={styles.tagsContainer}>
              {['Store in fridge', 'Light-sensitive', 'Keep dry', 'Shake before use'].map((tag) => (
                <TouchableOpacity key={tag} style={styles.tag}>
                  <Tag size={14} color="#76ABAE" />
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
          <Package size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#EEEEEE',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scanSection: {
    marginBottom: 32,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76ABAE',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  scanButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#31363F',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.5,
    marginHorizontal: 16,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#76ABAE',
  },
  searchButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#76ABAE',
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#76ABAE',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    opacity: 0.7,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    opacity: 1,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#76ABAE',
    marginLeft: 8,
  },
  tagsSection: {
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#76ABAE',
    marginLeft: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76ABAE',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});