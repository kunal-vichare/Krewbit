import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  DashboardScreen,
} from '../screens/main';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </Drawer.Navigator>
  );
}