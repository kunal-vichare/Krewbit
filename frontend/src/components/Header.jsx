
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../Helper/colors';
import { logout } from '../redux/slices/authSlice';
import {
  spacing,
  borderRadius,
  borderValue,
  opacityValue,
  fontSize,
  letterSpacing,
  flexValue,
  componentSizes,
} from '../Helper/sizes';

export const Header = ({
  title,
  showBack = false,
  rightElement,
  leftIcon,
  onLeftPress,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Custom action takes priority over default back navigation
  const handleLeftPress = onLeftPress || handleBack;

  const icon = leftIcon || (showBack ? '←' : null);

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {icon && (
          <TouchableOpacity
            onPress={handleLeftPress}
            style={styles.leftButton}
            activeOpacity={opacityValue.touchLight}
          >
            <Text style={styles.leftIconText}>{icon}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {rightElement ? (
          rightElement
        ) : currentUser ? (
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={opacityValue.touchLight}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: componentSizes.headerHeight,
    backgroundColor: colors.background,
    borderBottomWidth: borderValue.thin,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.L,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: flexValue.full,
  },
  leftButton: {
    paddingRight: spacing.L,
    paddingVertical: spacing.small,
  },
  leftIconText: {
    color: colors.primaryLight,
    fontSize: fontSize.titleLarge,
    fontWeight: 'bold',
  },
  title: {
    fontSize: fontSize.titleSmall,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: letterSpacing.tight,
    flexShrink: flexValue.full,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: spacing.Sm,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: borderValue.hairline,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  logoutText: {
    color: colors.danger,
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
  },
});

export default Header;
