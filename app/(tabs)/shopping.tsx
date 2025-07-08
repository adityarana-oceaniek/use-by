import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ShoppingCart, Plus, ExternalLink, Check, X } from 'lucide-react-native';

const suggestedItems = [
  {
    id: 1,
    name: 'All-Purpose Cleaner',
    reason: 'Expired 2 days ago',
    category: 'Cleaning',
    priority: 'high',
    inStock: true,
    price: '₹299',
  },
  {
    id: 2,
    name: 'Vitamin D3 Tablets',
    reason: 'Expires in 5 days',
    category: 'Medicine',
    priority: 'medium',
    inStock: true,
    price: '₹450',
  },
  {
    id: 3,
    name: 'Face Moisturizer',
    reason: 'Running low',
    category: 'Cosmetics',
    priority: 'low',
    inStock: false,
    price: '₹650',
  },
];

const shoppingList = [
  {
    id: 1,
    name: 'All-Purpose Cleaner',
    quantity: 1,
    added: true,
  },
  {
    id: 2,
    name: 'Vitamin D3 Tablets',
    quantity: 2,
    added: true,
  },
];

export default function Shopping() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const tabs = ['Suggestions', 'My List'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#76ABAE';
    }
  };

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToShoppingList = () => {
    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select items to add to your shopping list');
      return;
    }
    Alert.alert('Success', `${selectedItems.length} items added to shopping list`);
    setSelectedItems([]);
  };

  const openInBlinkit = () => {
    Alert.alert('Opening Blinkit', 'This would open Blinkit app with your shopping list');
  };

  const openInInstamart = () => {
    Alert.alert('Opening Instamart', 'This would open Instamart app with your shopping list');
  };

  const renderSuggestionsView = () => (
    <View style={styles.suggestionsContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Smart Suggestions</Text>
        <Text style={styles.sectionSubtitle}>
          Based on your expiry tracking and usage patterns
        </Text>
      </View>

      {suggestedItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.suggestionCard,
            selectedItems.includes(item.id) && styles.selectedCard
          ]}
          onPress={() => toggleItemSelection(item.id)}
        >
          <View style={styles.suggestionHeader}>
            <View style={styles.suggestionInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            
            <View style={styles.suggestionMeta}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>
              
              <View style={styles.selectionIndicator}>
                {selectedItems.includes(item.id) ? (
                  <Check size={20} color="#76ABAE" />
                ) : (
                  <View style={styles.unselectedCircle} />
                )}
              </View>
            </View>
          </View>

          <Text style={styles.suggestionReason}>{item.reason}</Text>
          
          <View style={styles.suggestionFooter}>
            <View style={styles.stockInfo}>
              <View style={[styles.stockIndicator, { backgroundColor: item.inStock ? '#4CAF50' : '#F44336' }]} />
              <Text style={styles.stockText}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {selectedItems.length > 0 && (
        <TouchableOpacity style={styles.addToListButton} onPress={addToShoppingList}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addToListText}>
            Add {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} to list
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderShoppingListView = () => (
    <View style={styles.listContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Shopping List</Text>
        <Text style={styles.sectionSubtitle}>
          {shoppingList.length} items ready to order
        </Text>
      </View>

      {shoppingList.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <View style={styles.listItemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
          
          <TouchableOpacity style={styles.removeButton}>
            <X size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
      ))}

      {shoppingList.length === 0 && (
        <View style={styles.emptyState}>
          <ShoppingCart size={48} color="#76ABAE" strokeWidth={1} />
          <Text style={styles.emptyStateTitle}>Your list is empty</Text>
          <Text style={styles.emptyStateText}>
            Add items from suggestions or manually to get started
          </Text>
        </View>
      )}

      {shoppingList.length > 0 && (
        <View style={styles.orderSection}>
          <Text style={styles.orderTitle}>Order from your favorite app</Text>
          
          <TouchableOpacity style={styles.orderButton} onPress={openInBlinkit}>
            <View style={styles.orderButtonContent}>
              <Text style={styles.orderButtonText}>Order on Blinkit</Text>
              <ExternalLink size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.orderButton, styles.secondaryOrderButton]} onPress={openInInstamart}>
            <View style={styles.orderButtonContent}>
              <Text style={[styles.orderButtonText, styles.secondaryOrderText]}>Order on Instamart</Text>
              <ExternalLink size={20} color="#76ABAE" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Shopping</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#76ABAE" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && renderSuggestionsView()}
        {activeTab === 1 && renderShoppingListView()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#EEEEEE',
  },
  addButton: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#76ABAE',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    opacity: 0.7,
  },
  activeTabText: {
    color: '#FFFFFF',
    opacity: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 4,
  },
  suggestionsContainer: {
    paddingBottom: 32,
  },
  suggestionCard: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#76ABAE',
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  suggestionInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
  },
  itemCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 2,
  },
  suggestionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#76ABAE',
  },
  suggestionReason: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginBottom: 12,
  },
  suggestionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  stockText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    opacity: 0.7,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#76ABAE',
  },
  addToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76ABAE',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
  },
  addToListText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 32,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  listItemInfo: {
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    textAlign: 'center',
  },
  orderSection: {
    marginTop: 24,
  },
  orderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 16,
  },
  orderButton: {
    backgroundColor: '#76ABAE',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  secondaryOrderButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#76ABAE',
  },
  orderButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  secondaryOrderText: {
    color: '#76ABAE',
  },
});