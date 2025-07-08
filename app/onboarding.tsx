import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Shield, ShoppingCart, ArrowRight, ArrowLeft, Bell } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Track what you use',
    subtitle: 'before you lose it',
    description: 'Monitor expiry dates for cosmetics, medicines, cleaning products, batteries and more. Get smart reminders before items expire.',
    icon: Clock,
  },
  {
    id: 2,
    title: 'Smart Categories',
    subtitle: 'Cosmetics, meds, batteries & more',
    description: 'Organize your household items by type. Track skincare routines, medicine schedules, and battery replacements all in one place.',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Stay Notified',
    subtitle: 'Never miss important reminders',
    description: 'Get timely notifications for expiring items, medicine doses, and reorder suggestions. Stay on top of your household needs.',
    icon: Bell,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const colors = useThemeColors();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    } else {
      router.replace('/auth');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollViewRef.current?.scrollTo({ x: prevIndex * width, animated: true });
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: colors.primary + '20' }]}>
                <item.icon size={64} color={colors.primary} strokeWidth={1.5} />
              </View>
            </View>
            
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.subtitle, { color: colors.primary }]}>{item.subtitle}</Text>
              <Text style={[styles.description, { color: colors.textMuted }]}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex 
                  ? [styles.activeDot, { backgroundColor: colors.primary }]
                  : [styles.inactiveDot, { backgroundColor: colors.border }],
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex > 0 && (
            <TouchableOpacity style={[styles.backButton]} onPress={handlePrevious}>
              <ArrowLeft size={20} color={colors.primary} />
              <Text style={[styles.backButtonText, { color: colors.primary }]}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.primary }]} onPress={handleNext}>
            <Text style={[styles.nextButtonText, { color: colors.surface }]}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ArrowRight size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.6,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    ...Typography.title,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.subtitle,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  description: {
    ...Typography.body,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: 48,
    paddingTop: Spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  dot: {
    width: Spacing.sm,
    height: Spacing.sm,
    borderRadius: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  activeDot: {
    width: 24,
  },
  inactiveDot: {
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  backButtonText: {
    ...Typography.subtitle,
    marginLeft: Spacing.sm,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.md,
    flex: 1,
    marginLeft: Spacing.lg,
    justifyContent: 'center',
  },
  nextButtonText: {
    ...Typography.subtitle,
    marginRight: Spacing.sm,
  },
});