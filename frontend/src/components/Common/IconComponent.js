import React from 'react';
import { Image } from 'react-native';

export const IconComponent = ({
  iconUrl,
  width = 20,
  height = 20,
  style,
  ...props
}) => {
  if (!iconUrl) return null;

  const source = typeof iconUrl === 'string' ? { uri: iconUrl } : iconUrl;

  return (
    <Image
      source={source}
      style={[{ width, height }, style]}
      resizeMode="contain"
      {...props}
    />
  );
};

export default IconComponent;

