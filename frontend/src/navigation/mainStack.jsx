import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import { AnnouncementsScreen, AttendanceScreen, FieldForceScreen, LeaveScreen, PerformanceScreen } from '../screens/main';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0B0F19' },
      }}
    >
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Leave" component={LeaveScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="Performance" component={PerformanceScreen} />
      <Stack.Screen name="FieldForce" component={FieldForceScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
