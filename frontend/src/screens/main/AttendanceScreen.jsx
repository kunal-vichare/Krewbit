import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { STRINGS } from '../../Constants/strings';
import { clockIn, clockOut, selectEmployeePerformance } from '../../redux/slices/appSlice';
import { Header } from '../../Components/Header';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { BarChart } from '../../Components/Chart';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  letterSpacing,
  elevation,
  shadow,
  flexValue,
  percentageCode,
  componentSizes,
} from '../../Helper/sizes';

export const AttendanceScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const attendanceLogs = useSelector((state) => state.app.attendanceLogs);
  const activeCheckIn = useSelector((state) => state.app.activeCheckIn);

  const userId = currentUser?.id;
  const isAdmin = currentUser?.role === 'admin';

  // Filter logs for this specific employee
  const userLogs = isAdmin 
    ? attendanceLogs // Admin sees all logs
    : attendanceLogs.filter(log => log.userId === userId);

  const isClockedIn = !!activeCheckIn[userId];
  const performance = selectEmployeePerformance(userId || 'EMP-202');

  const chartData = performance.weeklyTrend.map(item => ({
    label: item.day,
    value: item.hours,
  }));

  const handleClockToggle = () => {
    if (isClockedIn) {
      dispatch(clockOut(userId))
        .unwrap()
        .then((payload) => {
          Alert.alert('Checked Out', `${STRINGS.checkOutSuccess} ${payload.newLog.checkOut}.`);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
    } else {
      dispatch(clockIn(userId))
        .unwrap()
        .then((payload) => {
          Alert.alert('Checked In', `${STRINGS.checkInSuccess} ${payload.checkInTime}`);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
    }
  };

  const renderLogItem = ({ item }) => {
    return (
      <View style={styles.logItem}>
        <View style={styles.logLeft}>
          <Text style={styles.logDate}>{item.date}</Text>
          {isAdmin && <Text style={styles.logUser}>ID: {item.userId}</Text>}
          <Text style={styles.logTime}>In: {item.checkIn}  |  Out: {item.checkOut || '--'}</Text>
        </View>
        <View style={styles.logRight}>
          <Text style={styles.logDuration}>{item.duration || '--'}</Text>
          <View style={[styles.statusIndicator, item.status === 'Present' ? styles.presentBadge : styles.leaveBadge]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={STRINGS.attendanceTitle} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Clock console */}
        {!isAdmin && (
          <Card header="Shift Control Desk" style={styles.consoleCard}>
            <View style={styles.consoleContent}>
              <View style={styles.clockCircle}>
                <Text style={styles.clockLabel}>{STRINGS.elapsedTime}</Text>
                <Text style={styles.clockTimer}>
                  {isClockedIn ? 'Active Shift' : '00:00:00'}
                </Text>
                <Text style={styles.clockSubLabel}>
                  {isClockedIn ? `Checked In: ${activeCheckIn[userId]?.checkInTime}` : 'Offline'}
                </Text>
              </View>
              
              <Button
                title={isClockedIn ? STRINGS.clockOutBtn : STRINGS.clockInBtn}
                type={isClockedIn ? 'danger' : 'secondary'}
                onPress={handleClockToggle}
                style={styles.consoleBtn}
              />
            </View>
          </Card>
        )}

        {/* Analytics chart (Employee only) */}
        {!isAdmin && (
          <Card header={STRINGS.workingHoursTrend} style={styles.chartCard}>
            <BarChart data={chartData} maxValue={spacing.medium} />
            <Text style={styles.chartDescription}>
              Displaying hours logged during standard shifts this week.
            </Text>
          </Card>
        )}

        {/* History List */}
        <Text style={styles.historyTitle}>{STRINGS.attendanceTitle} History</Text>
        <Card noPadding style={styles.listCard}>
          {userLogs.length === 0 ? (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No attendance records logged.</Text>
            </View>
          ) : (
            <FlatList
              data={userLogs}
              renderItem={renderLogItem}
              keyExtractor={item => item.id}
              scrollEnabled={false} // since it's nested inside a ScrollView
              ItemSeparatorComponent={Separator}
            />
          )}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: flexValue.full,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.L,
    paddingBottom: spacing.XXL,
  },
  consoleCard: {
    marginBottom: spacing.L,
  },
  consoleContent: {
    alignItems: 'center',
    paddingVertical: spacing.small,
  },
  clockCircle: {
    width: componentSizes.clockCircleSize,
    height: componentSizes.clockCircleSize,
    borderRadius: borderRadius.circle,
    borderWidth: borderValue.thick,
    borderColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.03)',
    marginBottom: spacing.XL,
    shadowColor: colors.primary,
    shadowOffset: shadow.offsetLarge,
    shadowOpacity: shadow.opacityMedium,
    shadowRadius: shadow.radiusExtraLarge,
    elevation: elevation.highest,
  },
  clockLabel: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  clockTimer: {
    fontSize: fontSize.titleSmall,
    fontWeight: '800',
    color: colors.text,
    marginVertical: spacing.S,
  },
  clockSubLabel: {
    fontSize: fontSize.extraSmall,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  consoleBtn: {
    width: percentageCode.huge,
    marginVertical: spacing.none,
  },
  chartCard: {
    marginBottom: spacing.XL,
  },
  chartDescription: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.small,
  },
  historyTitle: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.M,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
    marginTop: spacing.M,
  },
  listCard: {
    marginBottom: spacing.M,
  },
  emptyList: {
    padding: spacing.xLarge,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: fontSize.body,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.L,
  },
  logLeft: {
    flex: flexValue.full,
  },
  logDate: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
  },
  logUser: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.Xs,
  },
  logTime: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  logRight: {
    alignItems: 'flex-end',
  },
  logDuration: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.S,
  },
  statusIndicator: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.three,
    borderRadius: borderRadius.sm,
  },
  presentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: borderValue.hairline,
    borderColor: colors.secondary,
  },
  leaveBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: borderValue.hairline,
    borderColor: colors.danger,
  },
  statusText: {
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
    color: colors.text,
  },
  separator: {
    height: componentSizes.separatorRegular,
    backgroundColor: colors.border,
  },
});

const Separator = () => <View style={styles.separator} />;

export default AttendanceScreen;
