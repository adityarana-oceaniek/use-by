import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, Filter, Bell } from 'lucide-react-native';

const mockProducts = [
  {
    id: 1,
    name: 'Vitamin D3 Tablets',
    category: 'Medicine',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 5,
    status: 'expiring',
    openDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Face Moisturizer',
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 45,
    status: 'fresh',
    openDate: '2024-01-10',
  },
  {
    id: 3,
    name: 'All-Purpose Cleaner',
    category: 'Cleaning',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: -2,
    status: 'expired',
    openDate: '2023-12-20',
  },
  {
    id: 4,
    name: 'Sunscreen SPF 50',
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 120,
    status: 'fresh',
    openDate: '2024-01-05',
  },
];

const tabs = ['Fresh', 'Expiring Soon', 'Expired'];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 0: // Fresh
        return mockProducts.filter(p => p.daysLeft > 30);
      case 1: // Expiring Soon
        return mockProducts.filter(p => p.daysLeft <= 30 && p.daysLeft >= 0);
      case 2: // Expired
        return mockProducts.filter(p => p.daysLeft < 0);
      default:
        return mockProducts;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh':
        return '#4CAF50';
      case 'expiring':
        return '#FF9800';
      case 'expired':
        return '#F44336';
      default:
        return '#76ABAE';
    }
  };

  const getStatusText = (daysLeft: number) => {
    if (daysLeft < 0) {
      return `Expired ${Math.abs(daysLeft)} days ago`;
    } else if (daysLeft === 0) {
      return 'Expires today';
    } else if (daysLeft === 1) {
      return 'Expires tomorrow';
    } else {
      return `${daysLeft} days left`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Track your household items</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#EEEEEE" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#76ABAE" />
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#76ABAE" />
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

      <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
        {getFilteredProducts().map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={[styles.productStatus, { color: getStatusColor(product.status) }]}>
                {getStatusText(product.daysLeft)}
              </Text>
            </View>

            <View style={styles.statusIndicator}>
              <View
                style={[
                  styles.statusRing,
                  { borderColor: getStatusColor(product.status) }
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(product.status) }
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {getFilteredProducts().length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No items found</Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 0 && "You don't have any fresh items yet."}
              {activeTab === 1 && "No items are expiring soon."}
              {activeTab === 2 && "No expired items found."}
            </Text>
          </View>
        )}
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
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#EEEEEE',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#F44336',
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#76ABAE',
    marginLeft: 12,
  },
  filterButton: {
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
  productList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginBottom: 4,
  },
  productStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statusIndicator: {
    marginLeft: 16,
  },
  statusRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    textAlign: 'center',
  },
});