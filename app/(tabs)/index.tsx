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
import { useThemeColors } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius } from '@/constants/Colors';

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
  const colors = useThemeColors();

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
        return colors.success;
      case 'expiring':
        return colors.warning;
      case 'expired':
        return colors.error;
      default:
        return colors.primary;
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Good morning!</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Track your household items</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.error }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Search size={20} color={colors.primary} />
          <Text style={[styles.searchPlaceholder, { color: colors.textMuted }]}>Search products...</Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface }]}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab, 
              activeTab === index && { backgroundColor: colors.primary }]}>
            <Text style={[
              styles.tabText, 
              { color: activeTab === index ? colors.surface : colors.textMuted }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
        {getFilteredProducts().map((product) => (
          <TouchableOpacity key={product.id} style={[styles.productCard, { backgroundColor: colors.surface }]}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
              <Text style={[styles.productCategory, { color: colors.textMuted }]}>{product.category}</Text>
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
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No items found</Text>
            <Text style={[styles.emptyStateText, { color: colors.textMuted }]}>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.title,
    fontSize: 24,
  },
  subtitle: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: Spacing.sm,
    height: Spacing.sm,
    borderRadius: Spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    height: 48,
    marginRight: Spacing.md,
  },
  searchPlaceholder: {
    ...Typography.body,
    fontSize: 16,
    marginLeft: Spacing.md,
  },
  filterButton: {
    borderRadius: BorderRadius.md,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
  },
  tabText: {
    ...Typography.body,
  },
  productList: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  productCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.lg,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
  },
  productCategory: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  productStatus: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
  statusIndicator: {
    marginLeft: Spacing.lg,
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
    ...Typography.title,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    ...Typography.body,
    textAlign: 'center',
  },
});