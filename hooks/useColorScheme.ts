import { useColorScheme as useNativeColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useColorScheme() {
  const colorScheme = useNativeColorScheme();
  return colorScheme ?? 'dark';
}

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme];
}