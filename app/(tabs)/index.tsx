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
import { Search, Filter, Bell, Edit, Eye } from 'lucide-react-native';
import { useThemeColors, useColorScheme } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius, Shadows } from '@/constants/Colors';

const mockProducts = [
  {
    id: 1,
    name: 'Vitamin D3 Tablets',
    category: 'Medicine',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 5,
    status: 'expiring',
    openDate: '2024-01-15',
    progress: 0.2,
  },
  {
    id: 2,
    name: 'Face Moisturizer',
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 45,
    status: 'fresh',
    openDate: '2024-01-10',
    progress: 0.8,
  },
  {
    id: 3,
    name: 'All-Purpose Cleaner',
    category: 'Cleaning',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: -2,
    status: 'expired',
    openDate: '2023-12-20',
    progress: 0,
  },
  {
    id: 4,
    name: 'Sunscreen SPF 50',
    category: 'Cosmetics',
    image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
    daysLeft: 120,
    status: 'fresh',
    openDate: '2024-01-05',
    progress: 0.95,
  },
];

const tabs = ['Fresh', 'Expiring Soon', 'Expired'];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

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

  const getProgressGradient = (progress: number, status: string) => {
    const statusColor = getStatusColor(status);
    return {
      backgroundColor: colors.border,
      borderRadius: 4,
      height: 6,
      overflow: 'hidden' as const,
    };
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
        <View style={[
          styles.searchBar, 
          { backgroundColor: colors.surface },
          colorScheme === 'light' ? Shadows.light : Shadows.dark
        ]}>
          <Search size={20} color={colors.primary} />
          <Text style={[styles.searchPlaceholder, { color: colors.textMuted }]}>Search products...</Text>
        </View>
        <TouchableOpacity style={[
          styles.filterButton, 
          { backgroundColor: colors.surface },
          colorScheme === 'light' ? Shadows.light : Shadows.dark
        ]}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab, 
              activeTab === index && [
                styles.activeTab, 
                { backgroundColor: colors.primary },
                colorScheme === 'light' ? Shadows.light : {}
              ]
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === index ? 
                (colorScheme === 'light' ? colors.surface : colors.background) : 
                colors.textMuted 
              }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
        {getFilteredProducts().map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={[
              styles.productCard, 
              { backgroundColor: colors.surface },
              colorScheme === 'light' ? Shadows.light : Shadows.dark
            ]}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
                <View style={[styles.categoryTag, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.categoryText, { color: colors.primary }]}>{product.category}</Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={getProgressGradient(product.progress, product.status)}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        backgroundColor: getStatusColor(product.status),
                        width: `${product.progress * 100}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: getStatusColor(product.status) }]}>
                  {getStatusText(product.daysLeft)}
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}>
                <Edit size={16} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}>
                <Eye size={16} color={colors.primary} />
              </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
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
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  activeTab: {
  },
  tabText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
  productList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
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
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  productName: {
    ...Typography.subtitle,
    flex: 1,
    marginRight: Spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    ...Typography.label,
    fontSize: 10,
  },
  progressContainer: {
    marginTop: Spacing.xs,
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
  progressText: {
    ...Typography.body,
    fontSize: 12,
    marginTop: Spacing.xs,
    fontFamily: 'Inter-SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: Spacing.md,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
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