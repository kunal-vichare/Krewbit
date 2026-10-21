import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../Helper/colors';
import {
  spacing,
  borderRadius,
  borderValue,
  opacityValue,
  fontSize,
  letterSpacing,
  elevation,
  shadow,
} from '../Helper/sizes';

export const Card = ({
  children,
  style,
  onPress,
  header,
  footer,
  noPadding = false,
}) => {
  const Container = onPress ? TouchableOpacity : View;
  const touchProps = onPress ? { activeOpacity: opacityValue.touchHeavy, onPress } : {};

  return (
    <Container {...touchProps} style={[styles.card, style]}>
      {header && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
        </View>
      )}
      <View style={[styles.content, noPadding && styles.noPadding]}>
        {children}
      </View>
      {footer && (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{footer}</Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.xxl,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    marginVertical: spacing.small,
    shadowColor: colors.Black,
    shadowOffset: shadow.offsetMedium,
    shadowOpacity: shadow.opacityLarge,
    shadowRadius: shadow.radiusLarge,
    elevation: elevation.medium,
    overflow: 'hidden',
  },
  content: {
    padding: spacing.L,
  },
  noPadding: {
    padding: spacing.none,
  },
  headerContainer: {
    paddingHorizontal: spacing.L,
    paddingTop: spacing.mediumLarge,
    paddingBottom: spacing.small,
    borderBottomWidth: borderValue.hairline,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  footerContainer: {
    paddingHorizontal: spacing.L,
    paddingVertical: spacing.M,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderTopWidth: borderValue.hairline,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
  },
});

export default Card;
