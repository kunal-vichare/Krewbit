import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { STRINGS } from '../../Constants/strings';
import { login } from '../../redux/slices/authSlice';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import {
  spacing,
  borderRadius,
  borderValue,
  opacityValue,
  fontSize,
  letterSpacing,
  lineHeight,
  flexValue,
  percentageCode,
} from '../../Helper/sizes';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const roles = [
    { key: 'employee', label: STRINGS.roleEmployee },
    { key: 'admin', label: STRINGS.adminBadge },
  ];

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!email) {
      tempErrors.email = STRINGS.requiredError;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = STRINGS.invalidEmail;
      valid = false;
    }

    if (!password) {
      tempErrors.password = STRINGS.requiredError;
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = STRINGS.passwordLengthError;
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch(login({ email, password, role }))
        .unwrap()
        .then(() => {
          // Logged in! AppNavigation index will auto-redirect because state changes
        })
        .catch((error) => {
          Alert.alert('Authentication Failed', error || STRINGS.authFailed);
        });
    }
  };

  const navigateToRegister = () => {
    if (role === 'admin') {
      navigation.navigate('CompanyRegister');
    } else {
      navigation.navigate('EmployeeRegister');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appName}>{STRINGS.appName}</Text>
        <Text style={styles.title}>{STRINGS.loginTitle}</Text>
        <Text style={styles.subtitle}>{STRINGS.loginSubtitle}</Text>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>{STRINGS.selectRole}</Text>
        <View style={styles.roleTabs}>
          {roles.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[styles.roleTab, role === key && styles.activeTab]}
              onPress={() => {
                setRole(key);
                setErrors({});
              }}
              activeOpacity={opacityValue.medium}
            >
              <Text
                style={[
                  styles.roleTabText,
                  role === key && styles.activeTabText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.form}>
        <Input
          label={STRINGS.emailLabel}
          placeholder={STRINGS.emailPlaceholder}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />
        <Input
          label={STRINGS.passwordLabel}
          placeholder={STRINGS.passwordPlaceholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        <Button
          title={STRINGS.loginBtn}
          onPress={handleLogin}
          style={styles.loginBtn}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>{STRINGS.noAccountYet}</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerLink}>
              {role === 'admin' ? STRINGS.registerCompanyBtn : STRINGS.registerEmployeeBtn}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: flexValue.full,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xLarge,
    justifyContent: 'center',
    flexGrow: flexValue.full,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxLarge,
    marginTop: spacing.XL,
  },
  appName: {
    fontSize: fontSize.huge,
    fontWeight: '900',
    color: colors.primaryLight,
    letterSpacing: letterSpacing.wide,
    marginBottom: spacing.small,
  },
  title: {
    fontSize: fontSize.titleMedium,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.Sm,
    paddingHorizontal: spacing.XL,
    lineHeight: lineHeight.medium,
  },
  roleContainer: {
    marginBottom: spacing.xLarge,
  },
  roleLabel: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.small,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: borderRadius.xl,
    padding: spacing.S,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
  },
  roleTab: {
    flex: flexValue.full,
    paddingVertical: spacing.medium,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  roleTabText: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.text,
    fontWeight: '700',
  },
  form: {
    width: percentageCode.full,
  },
  loginBtn: {
    marginTop: spacing.small,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xLarge,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: fontSize.body,
    marginRight: spacing.Sm,
  },
  registerLink: {
    color: colors.primaryLight,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
});

export default LoginScreen;
