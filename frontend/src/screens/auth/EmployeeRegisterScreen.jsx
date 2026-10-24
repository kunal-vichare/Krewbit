import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { strings } from '../../Constants/strings';
import { registerEmployee } from '../../redux/slices/authSlice';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import {
  spacing,
  fontSize,
  lineHeight,
  flexValue,
  percentageCode,
} from '../../Helper/sizes';

export const EmployeeRegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [designation, setDesignation] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!fullName) {
      tempErrors.fullName = strings.requiredError;
      valid = false;
    }
    if (!email) {
      tempErrors.email = strings.requiredError;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = strings.invalidEmail;
      valid = false;
    }
    if (!password) {
      tempErrors.password = strings.requiredError;
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = strings.passwordLengthError;
      valid = false;
    }
    if (!companyId) {
      tempErrors.companyId = strings.requiredError;
      valid = false;
    }
    if (!designation) {
      tempErrors.designation = strings.requiredError;
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validate()) {
      dispatch(registerEmployee({ fullName, email, password, companyId, designation }))
        .unwrap()
        .then(() => {
          Alert.alert(
            'Registration Successful!',
            `You have registered under workspace ID: ${companyId.toUpperCase()}.\n\nYou can now sign in to your dashboard.`,
            [
              {
                text: 'Go to Login',
                onPress: () => navigation.navigate('Login'),
              },
            ]
          );
        })
        .catch((error) => {
          Alert.alert('Registration Failed', error);
        });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.registerAsEmployee}</Text>
        <Text style={styles.subtitle}>Enter your details and Company ID to sync with your employer's workspace</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={strings.fullNameLabel}
          placeholder={strings.fullNamePlaceholder}
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />
        <Input
          label={strings.emailLabel}
          placeholder={strings.emailPlaceholder}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />
        <Input
          label={strings.passwordLabel}
          placeholder={strings.passwordPlaceholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        <Input
          label={strings.companyIdLabel}
          placeholder={strings.companyIdPlaceholder}
          value={companyId}
          onChangeText={setCompanyId}
          error={errors.companyId}
          autoCapitalize="characters"
        />
        <Input
          label="Designation / Role"
          placeholder="e.g. Sales Officer, Systems Analyst"
          value={designation}
          onChangeText={setDesignation}
          error={errors.designation}
        />

        <Button
          title={strings.registerEmployeeBtn}
          onPress={handleRegister}
          style={styles.submitBtn}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>{strings.alreadyHaveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
    marginBottom: spacing.xxLarge,
    marginTop: spacing.XL,
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
    marginTop: spacing.small,
    paddingHorizontal: spacing.XL,
    lineHeight: lineHeight.medium,
  },
  form: {
    width: percentageCode.full,
  },
  submitBtn: {
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
  loginLink: {
    color: colors.primaryLight,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
});

export default EmployeeRegisterScreen;
