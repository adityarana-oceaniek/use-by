import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Plus, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Calendar, Pill } from 'lucide-react-native';
import { useThemeColors, useColorScheme } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius, Shadows } from '@/constants/Colors';

const mockMedicines = [
  {
    id: 1,
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once daily',
    times: ['09:00'],
    taken: [true],
    instructions: 'Take with food',
    nextDose: '09:00',
    condition: 'with_food',
  },
  {
    id: 2,
    name: 'Omega-3',
    dosage: '500mg',
    frequency: 'Twice daily',
    times: ['08:00', '20:00'],
    taken: [true, false],
    instructions: 'Take with meals',
    nextDose: '20:00',
    condition: 'with_food',
  },
  {
    id: 3,
    name: 'Multivitamin',
    dosage: '1 tablet',
    frequency: 'Once daily',
    times: ['08:30'],
    taken: [false],
    instructions: 'Take on empty stomach',
    nextDose: '08:30',
    condition: 'empty_stomach',
  },
];

const todaySchedule = [
  { time: '08:00', medicine: 'Omega-3', taken: true, condition: 'with_food' },
  { time: '08:30', medicine: 'Multivitamin', taken: false, condition: 'empty_stomach' },
  { time: '09:00', medicine: 'Vitamin D3', taken: true, condition: 'with_food' },
  { time: '20:00', medicine: 'Omega-3', taken: false, condition: 'with_food' },
];

const tabs = ['Today', 'My Medicines', 'Calendar'];

export default function Medicine() {
  const [activeTab, setActiveTab] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  const getConditionIcon = (condition: string) => {
    return condition === 'with_food' ? '🍽️' : '⏰';
  };

  const getStatusColor = (taken: boolean, isPending: boolean = false) => {
    if (taken) return colors.success;
    if (isPending) return colors.warning;
    return colors.error;
  };

  const renderTodayView = () => (
    <View style={styles.todayContainer}>
      <View style={[
        styles.progressCard, 
        { backgroundColor: colors.surface },
        colorScheme === 'light' ? Shadows.light : Shadows.dark
      ]}>
        <Text style={[styles.progressTitle, { color: colors.text }]}>Today's Progress</Text>
        <View style={styles.progressStats}>
          <View style={styles.progressItem}>
            <Text style={[styles.progressNumber, { color: colors.success }]}>2</Text>
            <Text style={[styles.progressLabel, { color: colors.textMuted }]}>Taken</Text>
          </View>
          <View style={[styles.progressDivider, { backgroundColor: colors.border }]} />
          <View style={styles.progressItem}>
            <Text style={[styles.progressNumber, { color: colors.warning }]}>2</Text>
            <Text style={[styles.progressLabel, { color: colors.textMuted }]}>Remaining</Text>
          </View>
          <View style={[styles.progressDivider, { backgroundColor: colors.border }]} />
          <View style={styles.progressItem}>
            <Text style={[styles.progressNumber, { color: colors.primary }]}>50%</Text>
            <Text style={[styles.progressLabel, { color: colors.textMuted }]}>Compliance</Text>
          </View>
        </View>
      </View>

      <View style={styles.reminderToggle}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Reminders</Text>
        <Switch
          value={reminderEnabled}
          onValueChange={setReminderEnabled}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={reminderEnabled ? colors.primary : colors.textMuted}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Schedule</Text>
      {todaySchedule.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.scheduleItem, 
            { backgroundColor: colors.surface },
            colorScheme === 'light' ? Shadows.light : Shadows.dark
          ]}
        >
          <View style={styles.scheduleTime}>
            <Text style={[styles.timeText, { color: colors.primary }]}>{item.time}</Text>
            <Text style={styles.conditionIcon}>{getConditionIcon(item.condition)}</Text>
          </View>
          
          <View style={styles.scheduleInfo}>
            <Text style={[styles.medicineName, { color: colors.text }]}>{item.medicine}</Text>
            <Text style={[styles.medicineStatus, { color: colors.textMuted }]}>
              {item.taken ? 'Taken' : 'Pending'}
            </Text>
          </View>

          <View style={styles.scheduleAction}>
            {item.taken ? (
              <CheckCircle size={24} color={colors.success} />
            ) : (
              <TouchableOpacity style={[styles.takeButton, { backgroundColor: colors.primary }]}>
                <Text style={[styles.takeButtonText, { color: colorScheme === 'light' ? colors.surface : colors.background }]}>
                  Take
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMedicinesView = () => (
    <View style={styles.medicinesContainer}>
      {mockMedicines.map((medicine) => (
        <TouchableOpacity 
          key={medicine.id} 
          style={[
            styles.medicineCard, 
            { backgroundColor: colors.surface },
            colorScheme === 'light' ? Shadows.light : Shadows.dark
          ]}
        >
          <View style={styles.medicineHeader}>
            <View style={styles.medicineIcon}>
              <Pill size={24} color={colors.primary} />
            </View>
            <View style={styles.medicineInfo}>
              <Text style={[styles.medicineName, { color: colors.text }]}>{medicine.name}</Text>
              <Text style={[styles.medicineDosage, { color: colors.textMuted }]}>{medicine.dosage}</Text>
            </View>
            <View style={styles.medicineStatus}>
              <Text style={[styles.frequencyText, { color: colors.primary }]}>{medicine.frequency}</Text>
            </View>
          </View>

          <View style={styles.medicineDetails}>
            <Text style={[styles.instructionsText, { color: colors.textMuted }]}>{medicine.instructions}</Text>
            <View style={styles.nextDoseContainer}>
              <Clock size={16} color={colors.primary} />
              <Text style={[styles.nextDoseText, { color: colors.primary }]}>Next: {medicine.nextDose}</Text>
            </View>
          </View>

          <View style={styles.doseTimes}>
            {medicine.times.map((time, index) => (
              <View
                key={index}
                style={[
                  styles.doseTime,
                  { backgroundColor: colors.background },
                  medicine.taken[index] && { backgroundColor: colors.success + '20' }
                ]}
              >
                <Text style={[
                  styles.doseTimeText,
                  { color: colors.textMuted },
                  medicine.taken[index] && { color: colors.success, fontFamily: 'Inter-SemiBold' }
                ]}>
                  {time}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCalendarView = () => (
    <View style={styles.calendarContainer}>
      <View style={[
        styles.weeklyStats, 
        { backgroundColor: colors.surface },
        colorScheme === 'light' ? Shadows.light : Shadows.dark
      ]}>
        <Text style={[styles.statsTitle, { color: colors.text }]}>This Week</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.success }]}>93%</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Compliance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>26</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Doses Taken</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.error }]}>2</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Missed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.warning }]}>7</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Days</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
      <View style={styles.activityList}>
        {[
          { date: 'Today', compliance: 50, color: colors.warning },
          { date: 'Yesterday', compliance: 100, color: colors.success },
          { date: 'Jan 20', compliance: 75, color: colors.primary },
          { date: 'Jan 19', compliance: 100, color: colors.success },
          { date: 'Jan 18', compliance: 50, color: colors.warning },
        ].map((day, index) => (
          <View 
            key={index} 
            style={[
              styles.activityItem, 
              { backgroundColor: colors.surface },
              colorScheme === 'light' ? Shadows.light : Shadows.dark
            ]}
          >
            <Text style={[styles.activityDate, { color: colors.text }]}>{day.date}</Text>
            <View style={[styles.complianceBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.complianceFill,
                  { width: `${day.compliance}%`, backgroundColor: day.color }
                ]}
              />
            </View>
            <Text style={[styles.complianceText, { color: colors.primary }]}>{day.compliance}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Medicine Tracker</Text>
        <TouchableOpacity style={[
          styles.addButton, 
          { backgroundColor: colors.surface },
          colorScheme === 'light' ? Shadows.light : Shadows.dark
        ]}>
          <Plus size={24} color={colors.primary} />
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && renderTodayView()}
        {activeTab === 1 && renderMedicinesView()}
        {activeTab === 2 && renderCalendarView()}
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
  title: {
    ...Typography.title,
    fontSize: 28,
  },
  addButton: {
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  todayContainer: {
    paddingBottom: Spacing.xxl,
  },
  progressCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  progressTitle: {
    ...Typography.title,
    marginBottom: Spacing.lg,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressNumber: {
    ...Typography.title,
    fontSize: 24,
  },
  progressLabel: {
    ...Typography.body,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  progressDivider: {
    width: 1,
    height: 40,
    marginHorizontal: Spacing.lg,
  },
  reminderToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.title,
    fontSize: 20,
    marginBottom: Spacing.lg,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    minWidth: 60,
  },
  timeText: {
    ...Typography.subtitle,
  },
  conditionIcon: {
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  scheduleInfo: {
    flex: 1,
  },
  medicineName: {
    ...Typography.subtitle,
  },
  medicineStatus: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },
  scheduleAction: {
    marginLeft: Spacing.lg,
  },
  takeButton: {
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minHeight: 36,
    justifyContent: 'center',
  },
  takeButtonText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
  medicinesContainer: {
    paddingBottom: Spacing.xxl,
  },
  medicineCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  medicineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  medicineIcon: {
    marginRight: Spacing.md,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineDosage: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },
  medicineStatus: {
    alignItems: 'flex-end',
  },
  frequencyText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
  medicineDetails: {
    marginBottom: Spacing.lg,
  },
  instructionsText: {
    ...Typography.body,
    marginBottom: Spacing.sm,
  },
  nextDoseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextDoseText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
    marginLeft: Spacing.sm,
  },
  doseTimes: {
    flexDirection: 'row',
  },
  doseTime: {
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
  },
  doseTimeText: {
    ...Typography.body,
    fontSize: 12,
  },
  calendarContainer: {
    paddingBottom: Spacing.xxl,
  },
  weeklyStats: {
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  statsTitle: {
    ...Typography.title,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statNumber: {
    ...Typography.title,
    fontSize: 24,
  },
  statLabel: {
    ...Typography.body,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  activityList: {
    marginTop: Spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  activityDate: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
    width: 80,
  },
  complianceBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  complianceFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
    width: 40,
    textAlign: 'right',
  },
});