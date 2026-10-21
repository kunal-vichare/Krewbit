import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../Constants/colors';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Main Container layouts
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  
  // Flex Utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Cards & Containers
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardGlass: {
    backgroundColor: colors.cardBgGlass,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Typography Styles
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 12,
    letterSpacing: 0.3,
  },
  bodyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bodyTextMuted: {
    fontSize: 13,
    color: colors.textMuted,
  },
  boldText: {
    fontWeight: '700',
  },
  
  // Form elements styling
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  inputFieldError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  
  // Buttons
  btn: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnSecondary: {
    backgroundColor: colors.secondary,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  btnTextPrimary: {
    color: colors.text,
  },
  btnTextOutline: {
    color: colors.primary,
  },
  
  // Badges & Indicators
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeAdmin: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: colors.accent,
    borderWidth: 0.5,
  },
  badgeEmployee: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  
  // Utility Dimensions
  windowWidth: width,
  windowHeight: height,
});
