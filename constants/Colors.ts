export const Colors = {
  dark: {
    background: '#040D12',
    surface: '#183D3D',
    primary: '#5C8374',
    text: '#93B1A6',
    textSecondary: '#93B1A6',
    textMuted: '#93B1A6',
    border: '#2A4A4A',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },
  light: {
    background: '#93B1A6',
    surface: '#FFFFFF',
    primary: '#183D3D',
    text: '#183D3D',
    textSecondary: '#183D3D',
    textMuted: '#5C8374',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
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