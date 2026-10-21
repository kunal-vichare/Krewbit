import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../Helper/colors';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  letterSpacing,
  lineHeight,
  elevation,
  shadow,
  flexValue,
} from '../Helper/sizes';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Main Container layouts
  safeArea: {
    flex: flexValue.full,
    backgroundColor: colors.background,
  },
  container: {
    flex: flexValue.full,
    backgroundColor: colors.background,
    padding: spacing.L,
  },
  scrollContainer: {
    flexGrow: flexValue.full,
    paddingBottom: spacing.xLarge,
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
    borderRadius: borderRadius.xxl,
    padding: spacing.large,
    marginVertical: spacing.small,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    shadowColor: colors.Black,
    shadowOffset: shadow.offsetMedium,
    shadowOpacity: shadow.opacityExtraLarge,
    shadowRadius: shadow.radiusMedium,
    elevation: elevation.high,
  },
  cardGlass: {
    backgroundColor: colors.cardBgGlass,
    borderRadius: borderRadius.xxl,
    padding: spacing.L,
    marginVertical: spacing.small,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
  },
  
  // Typography Styles
  title: {
    fontSize: fontSize.titleLarge,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: letterSpacing.normal,
  },
  subtitle: {
    fontSize: fontSize.bodyMedium,
    color: colors.textMuted,
    marginTop: spacing.S,
    lineHeight: lineHeight.normal,
  },
  sectionHeader: {
    fontSize: fontSize.section,
    fontWeight: '700',
    color: colors.text,
    marginVertical: spacing.medium,
    letterSpacing: letterSpacing.tight,
  },
  bodyText: {
    fontSize: fontSize.bodyMedium,
    color: colors.text,
    lineHeight: lineHeight.normal,
  },
  bodyTextMuted: {
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  boldText: {
    fontWeight: '700',
  },
  
  // Form elements styling
  inputGroup: {
    marginBottom: spacing.L,
  },
  inputLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.Sm,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.mediumLarge,
    paddingVertical: spacing.medium,
    color: colors.text,
    fontSize: fontSize.bodyLarge,
  },
  inputFieldError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.bodySmall,
    marginTop: spacing.S,
  },
  
  // Buttons
  btn: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.mediumLarge,
    paddingHorizontal: spacing.XL,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.small,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnSecondary: {
    backgroundColor: colors.secondary,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: borderValue.outline,
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: fontSize.medium,
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
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.S,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  badgeAdmin: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: colors.accent,
    borderWidth: borderValue.hairline,
  },
  badgeEmployee: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: colors.primary,
    borderWidth: borderValue.hairline,
  },
  badgeText: {
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  
  // Utility Dimensions
  windowWidth: width,
  windowHeight: height,
});
