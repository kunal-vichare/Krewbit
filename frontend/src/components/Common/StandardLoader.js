import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../Helper/colors';

export const LOADER_SIZE = {
  Small: 'small',
  Large: 'large',
};

export const StandardLoader = ({
  size = LOADER_SIZE.Small,
  color = colors.primary,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StandardLoader;

