import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
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

export const Button = ({
  onPress,
  title,
  type = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      case 'primary':
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'outline':
        return styles.textOutline;
      default:
        return styles.textDefault;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={opacityValue.touch}
      style={[
        styles.base,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? colors.primary : colors.text} size="small" />
      ) : (
        <Text style={[styles.textBase, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.mediumLarge,
    paddingHorizontal: spacing.XL,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: spacing.small,
    shadowColor: colors.Black,
    shadowOffset: shadow.offsetSmall,
    shadowOpacity: shadow.opacitySmall,
    shadowRadius: shadow.radiusSmall,
    elevation: elevation.low,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: borderValue.outline,
    borderColor: colors.primary,
    elevation: elevation.none,
    shadowOpacity: shadow.opacityNone,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    opacity: opacityValue.low,
    elevation: elevation.none,
    shadowOpacity: shadow.opacityNone,
  },
  textBase: {
    fontSize: fontSize.bodyLarge,
    fontWeight: '700',
    letterSpacing: letterSpacing.normal,
  },
  textDefault: {
    color: colors.text,
  },
  textOutline: {
    color: colors.primary,
  },
});
export default Button;
