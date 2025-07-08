export const Colors = {
  light: {
    background: '#F0F5F9',
    surface: '#C9D6DF',
    primary: '#52616B',
    text: '#1E2022',
    textSecondary: '#1E2022',
    textMuted: '#52616B',
    border: '#C9D6DF',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    shadow: 'rgba(30, 32, 34, 0.1)',
  },
  dark: {
    background: '#1E2022',
    surface: '#52616B',
    primary: '#C9D6DF',
    text: '#F0F5F9',
    textSecondary: '#F0F5F9',
    textMuted: '#C9D6DF',
    border: '#52616B',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const Typography = {
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  body: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const Shadows = {
  light: {
    shadowColor: '#1E2022',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dark: {
    borderWidth: 1,
    borderColor: '#52616B',
  },
};