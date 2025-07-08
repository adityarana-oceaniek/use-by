import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/useColorScheme';
import { Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const colors = useThemeColors();

  const handleSubmit = () => {
    // In production, handle authentication here
    router.replace('/(tabs)');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.primary }]}>UseBy</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>Smart expiry tracking for your household</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {isLogin ? 'Sign in to continue' : 'Join UseBy today'}
          </Text>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <User size={20} color={colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Full name"
                  placeholderTextColor={colors.textMuted}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Mail size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email address"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Lock size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.primary} />
                ) : (
                  <Eye size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {isLogin && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
            <Text style={[styles.submitButtonText, { color: colors.surface }]}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textMuted }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={styles.switchAuth}>
            <Text style={[styles.switchAuthText, { color: colors.textMuted }]}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={[styles.switchAuthLink, { color: colors.primary }]}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 36,
    ...Typography.title,
    marginBottom: Spacing.sm,
  },
  tagline: {
    ...Typography.body,
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  title: {
    ...Typography.title,
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 16,
    marginBottom: Spacing.xxl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    height: 56,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    ...Typography.body,
    fontSize: 16,
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xl,
  },
  forgotPasswordText: {
    ...Typography.body,
  },
  submitButton: {
    borderRadius: BorderRadius.md,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  submitButtonText: {
    ...Typography.subtitle,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...Typography.body,
    marginHorizontal: Spacing.lg,
  },
  socialButton: {
    borderRadius: BorderRadius.md,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  socialButtonText: {
    ...Typography.subtitle,
  },
  switchAuth: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingBottom: 32,
  },
  switchAuthText: {
    ...Typography.body,
  },
  switchAuthLink: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
});