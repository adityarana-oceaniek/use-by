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
import { User, Bell, Moon, Shield, Download, Upload, Users, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [expiryReminders, setExpiryReminders] = useState(true);
  const [medicineReminders, setMedicineReminders] = useState(true);

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

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement, 
    showChevron = true 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#76ABAE" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showChevron && !rightElement && (
          <ChevronRight size={20} color="#EEEEEE" opacity={0.5} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon={User}
            title="Profile"
            subtitle="Manage your account details"
            onPress={() => Alert.alert('Profile', 'Profile settings would open here')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Enable or disable notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#31363F', true: '#76ABAE' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={Bell}
            title="Expiry Reminders"
            subtitle="Get notified before items expire"
            rightElement={
              <Switch
                value={expiryReminders}
                onValueChange={setExpiryReminders}
                trackColor={{ false: '#31363F', true: '#76ABAE' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={Bell}
            title="Medicine Reminders"
            subtitle="Get notified for medicine doses"
            rightElement={
              <Switch
                value={medicineReminders}
                onValueChange={setMedicineReminders}
                trackColor={{ false: '#31363F', true: '#76ABAE' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#31363F', true: '#76ABAE' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => Alert.alert('Privacy', 'Privacy policy would open here')}
          />
          <SettingItem
            icon={Download}
            title="Export Data"
            subtitle="Download your data as JSON"
            onPress={handleExportData}
          />
          <SettingItem
            icon={Upload}
            title="Import Data"
            subtitle="Import data from backup"
            onPress={handleImportData}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sharing</Text>
          <SettingItem
            icon={Users}
            title="Household Sharing"
            subtitle="Share with family members"
            onPress={() => Alert.alert('Sharing', 'Household sharing would open here')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => Alert.alert('Help', 'Help center would open here')}
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#F44336" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>UseBy v1.0.0</Text>
          <Text style={styles.footerSubtext}>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
    marginBottom: 16,
    opacity: 0.8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
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
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EEEEEE',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.6,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31363F',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F44336',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EEEEEE',
    opacity: 0.6,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#EEEEEE',
    opacity: 0.4,
    marginTop: 4,
  },
});