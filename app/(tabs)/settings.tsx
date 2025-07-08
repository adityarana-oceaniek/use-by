import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { User, Bell, Moon, Shield, Download, Upload, Users, CircleHelp as HelpCircle, LogOut, ChevronRight, Volume2, Vibrate, Cloud, Info } from 'lucide-react-native';
import { useThemeColors, useColorScheme } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius, Shadows } from '@/constants/Colors';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [expiryReminders, setExpiryReminders] = useState(true);
  const [medicineReminders, setMedicineReminders] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [cloudSync, setCloudSync] = useState(false);
  
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data will be exported as a JSON file');
  };

  const handleImportData = () => {
    Alert.alert('Import Data', 'Select a file to import your data');
  };

  const handleHouseholdSharing = () => {
    Alert.alert('Household Sharing', 'Add members via email or QR invite');
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement, 
    showChevron = true,
    iconColor = colors.primary
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showChevron?: boolean;
    iconColor?: string;
  }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem, 
        { backgroundColor: colors.surface },
        colorScheme === 'light' ? Shadows.light : Shadows.dark
      ]} 
      onPress={onPress}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
          <Icon size={20} color={iconColor} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showChevron && !rightElement && (
          <ChevronRight size={20} color={colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );

  const CustomSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.border, true: colors.primary + '40' }}
      thumbColor={value ? colors.primary : colors.textMuted}
      style={colorScheme === 'light' ? Shadows.light : {}}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingSection title="Account">
          <SettingItem
            icon={User}
            title="Profile"
            subtitle="Manage your account details"
            onPress={() => Alert.alert('Profile', 'Profile settings would open here')}
          />
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Enable or disable notifications"
            rightElement={
              <CustomSwitch
                value={notifications}
                onValueChange={setNotifications}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={Bell}
            title="Expiry Reminders"
            subtitle="Get notified before items expire"
            rightElement={
              <CustomSwitch
                value={expiryReminders}
                onValueChange={setExpiryReminders}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={Bell}
            title="Medicine Reminders"
            subtitle="Get notified for medicine doses"
            rightElement={
              <CustomSwitch
                value={medicineReminders}
                onValueChange={setMedicineReminders}
              />
            }
            showChevron={false}
          />
        </SettingSection>

        <SettingSection title="Sound & Vibration">
          <SettingItem
            icon={Volume2}
            title="Sound Alerts"
            subtitle="Play sound for reminders"
            rightElement={
              <CustomSwitch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={Vibrate}
            title="Vibration"
            subtitle="Vibrate for notifications"
            rightElement={
              <CustomSwitch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
              />
            }
            showChevron={false}
          />
        </SettingSection>

        <SettingSection title="Appearance">
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            rightElement={
              <CustomSwitch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            }
            showChevron={false}
          />
        </SettingSection>

        <SettingSection title="Data & Privacy">
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => Alert.alert('Privacy', 'Privacy policy would open here')}
          />
          <SettingItem
            icon={Download}
            title="Export Data"
            subtitle="Download your data as CSV or JSON"
            onPress={handleExportData}
          />
          <SettingItem
            icon={Upload}
            title="Import Data"
            subtitle="Import data from backup"
            onPress={handleImportData}
          />
          <SettingItem
            icon={Cloud}
            title="Sync to Cloud"
            subtitle="Auto-backup to Google Drive / iCloud"
            rightElement={
              <CustomSwitch
                value={cloudSync}
                onValueChange={setCloudSync}
              />
            }
            showChevron={false}
          />
        </SettingSection>

        <SettingSection title="Sharing">
          <SettingItem
            icon={Users}
            title="Household Sharing"
            subtitle="Add members via email or QR invite"
            onPress={handleHouseholdSharing}
          />
        </SettingSection>

        <SettingSection title="Support">
          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => Alert.alert('Help', 'Help center would open here')}
          />
          <SettingItem
            icon={Info}
            title="About UseBy"
            subtitle="App version, data policy, contact info"
            onPress={() => Alert.alert('About', 'UseBy v1.0.0\nSmart expiry tracking for your household')}
          />
        </SettingSection>

        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.logoutButton, 
              { backgroundColor: colors.surface, borderColor: colors.error },
              colorScheme === 'light' ? Shadows.light : Shadows.dark
            ]} 
            onPress={handleLogout}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>UseBy v1.0.0</Text>
          <Text style={[styles.footerSubtext, { color: colors.textMuted }]}>
            Smart expiry tracking for your household
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.title,
    fontSize: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    minHeight: 72,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.subtitle,
  },
  settingSubtitle: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 2,
    minHeight: 56,
  },
  logoutText: {
    ...Typography.subtitle,
    marginLeft: Spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  footerText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
  footerSubtext: {
    ...Typography.body,
    fontSize: 12,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});