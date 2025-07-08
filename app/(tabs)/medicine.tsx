import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Plus, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Calendar } from 'lucide-react-native';

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
  },
];

const todaySchedule = [
  { time: '08:00', medicine: 'Omega-3', taken: true },
  { time: '08:30', medicine: 'Multivitamin', taken: false },
  { time: '09:00', medicine: 'Vitamin D3', taken: true },
  { time: '20:00', medicine: 'Omega-3', taken: false },
];

export default function Medicine() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Today', 'My Medicines', 'Calendar'];

  const renderTodayView = () => (
    <View style={styles.todayContainer}>
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <View style={styles.progressStats}>
          <View style={styles.progressItem}>
            <Text style={styles.progressNumber}>2</Text>
            <Text style={styles.progressLabel}>Taken</Text>
          </View>
          <View style={styles.progressDivider} />
          <View style={styles.progressItem}>
            <Text style={styles.progressNumber}>2</Text>
            <Text style={styles.progressLabel}>Remaining</Text>
          </View>
          <View style={styles.progressDivider} />
          <View style={styles.progressItem}>
            <Text style={styles.progressNumber}>50%</Text>
            <Text style={styles.progressLabel}>Compliance</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      {todaySchedule.map((item, index) => (
        <TouchableOpacity key={index} style={styles.scheduleItem}>
          <View style={styles.scheduleTime}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          
          <View style={styles.scheduleInfo}>
            <Text style={styles.medicineName}>{item.medicine}</Text>
            <Text style={styles.medicineStatus}>
              {item.taken ? 'Taken' : 'Pending'}
            </Text>
          </View>

          <View style={styles.scheduleAction}>
            {item.taken ? (
              <CheckCircle size={24} color="#4CAF50" />
            ) : (
              <TouchableOpacity style={styles.takeButton}>
                <Text style={styles.takeButtonText}>Take</Text>
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
        <TouchableOpacity key={medicine.id} style={styles.medicineCard}>
          <View style={styles.medicineHeader}>
            <View>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
            </View>
            <View style={styles.medicineStatus}>
              <Text style={styles.frequencyText}>{medicine.frequency}</Text>
            </View>
          </View>

          <View style={styles.medicineDetails}>
            <Text style={styles.instructionsText}>{medicine.instructions}</Text>
            <View style={styles.nextDoseContainer}>
              <Clock size={16} color="#76ABAE" />
              <Text style={styles.nextDoseText}>Next: {medicine.nextDose}</Text>
            </View>
          </View>

          <View style={styles.doseTimes}>
            {medicine.times.map((time, index) => (
              <View
                key={index}
                style={[
                  styles.doseTime,
                  medicine.taken[index] && styles.takenDose
                ]}
              >
                <Text style={[
                  styles.doseTimeText,
                  medicine.taken[index] && styles.takenDoseText
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
      <View style={styles.weeklyStats}>
        <Text style={styles.statsTitle}>This Week</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>93%</Text>
            <Text style={styles.statLabel}>Compliance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>26</Text>
            <Text style={styles.statLabel}>Doses Taken</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Missed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {[
          { date: 'Today', compliance: 50, color: '#FF9800' },
          { date: 'Yesterday', compliance: 100, color: '#4CAF50' },
          { date: 'Jan 20', compliance: 75, color: '#76ABAE' },
          { date: 'Jan 19', compliance: 100, color: '#4CAF50' },
          { date: 'Jan 18', compliance: 50, color: '#FF9800' },
        ].map((day, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityDate}>{day.date}</Text>
            <View style={styles.complianceBar}>
              <View
                style={[
                  styles.complianceFill,
                  { width: `${day.compliance}%`, backgroundColor: day.color }
                ]}
              />
            </View>
            <Text style={styles.complianceText}>{day.compliance}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medicine Tracker</Text>
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
  todayContainer: {
    paddingBottom: 32,
  },
  progressCard: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 16,
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
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#76ABAE',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginTop: 4,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#222831',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  scheduleTime: {
    marginRight: 16,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#76ABAE',
  },
  scheduleInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
  },
  medicineStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 2,
  },
  scheduleAction: {
    marginLeft: 16,
  },
  takeButton: {
    backgroundColor: '#76ABAE',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  takeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  medicinesContainer: {
    paddingBottom: 32,
  },
  medicineCard: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicineDosage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 2,
  },
  medicineStatus: {
    alignItems: 'flex-end',
  },
  frequencyText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#76ABAE',
  },
  medicineDetails: {
    marginBottom: 16,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginBottom: 8,
  },
  nextDoseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextDoseText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#76ABAE',
    marginLeft: 6,
  },
  doseTimes: {
    flexDirection: 'row',
  },
  doseTime: {
    backgroundColor: '#222831',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  takenDose: {
    backgroundColor: '#4CAF50',
  },
  doseTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    opacity: 0.7,
  },
  takenDoseText: {
    color: '#FFFFFF',
    opacity: 1,
  },
  calendarContainer: {
    paddingBottom: 32,
  },
  weeklyStats: {
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#76ABAE',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.7,
    marginTop: 4,
  },
  activityList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    width: 80,
  },
  complianceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#222831',
    borderRadius: 4,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  complianceFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#76ABAE',
    width: 40,
    textAlign: 'right',
  },
});