
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../Helper/colors';
import { logout } from '../redux/slices/authSlice';

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
            activeOpacity={0.7}
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
            activeOpacity={0.7}
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
    height: 60,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  leftIconText: {
    color: colors.primaryLight,
    fontSize: 26,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  logoutText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default Header;
