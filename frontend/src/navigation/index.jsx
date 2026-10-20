import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './auth';
import MainNavigator from './mainStack';

export const AppNavigation = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <NavigationContainer>
      {!currentUser ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;

