import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../Helper/colors';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  letterSpacing,
  percentageCode,
} from '../Helper/sizes';

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = '',
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          styles.input,
          error ? styles.inputError : null,
          inputStyle,
        ]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.L,
    width: percentageCode.full,
  },
  label: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.Sm,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.L,
    paddingVertical: spacing.medium,
    color: colors.text,
    fontSize: fontSize.bodyLarge,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.bodySmall,
    marginTop: spacing.S,
    fontWeight: '500',
  },
});

export default Input;
