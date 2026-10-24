import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { strings } from '../../Constants/strings';
import { clockIn, clockOut, selectEmployeePerformance } from '../../redux/slices/appSlice';
import { Header } from '../../Components/Header';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { DrawerActions } from '@react-navigation/native';
import { ProgressBar, ProgressRingPlaceholder } from '../../Components/Chart';
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
  componentSizes,
} from '../../Helper/sizes';
import {useTheme} from '../../Hooks/useTheme'

export const DashboardScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const employees = useSelector((state) => state.auth.employees);
  
  const announcements = useSelector((state) => state.app.announcements);
  const leaveBalances = useSelector((state) => state.app.leaveBalances);
  const activeCheckIn = useSelector((state) => state.app.activeCheckIn);

  const isAdmin = currentUser?.role === 'admin';
  const userId = currentUser?.id;
  const userBalances = leaveBalances[userId] || { casual: 5, sick: 5, earned: 5 };
  const totalLeaveLeft = userBalances.casual + userBalances.sick + userBalances.earned;

  const isClockedIn = !!activeCheckIn[userId];
  const performance = selectEmployeePerformance(userId || 'EMP-202');

  const handleClockToggle = () => {
    if (isClockedIn) {
      dispatch(clockOut(userId))
        .unwrap()
        .then((payload) => {
          Alert.alert('Checked Out', `${strings.checkOutSuccess} ${payload.newLog.checkOut}. Duration: ${payload.newLog.duration}`);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
    } else {
      dispatch(clockIn(userId))
        .unwrap()
        .then((payload) => {
          Alert.alert('Checked In', `${strings.checkInSuccess} ${payload.checkInTime}`);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
    }
  };

  const latestAnnouncement = announcements[0] || { title: 'No announcements', content: 'You are all caught up.' };

  return (
    <View style={styles.container}>
      <Header 
        title={strings.appName}
        leftIcon="☰"
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeBanner}>
          <View>
            <Text style={styles.welcomeText}>{strings.welcomeBack}</Text>
            <Text style={styles.userName}>{currentUser?.name}</Text>
            <Text style={styles.userRole}>{currentUser?.designation}</Text>
          </View>
          <View style={[styles.badge, isAdmin ? styles.badgeAdmin : styles.badgeEmployee]}>
            <Text style={styles.badgeText}>
              {isAdmin ? strings.adminBadge : strings.employeeBadge}
            </Text>
          </View>
        </View>

        {/* Company Workspace Banner */}
        <View style={styles.companyInfoCard}>
          <Text style={styles.companyLabel}>{strings.companyCodeText}</Text>
          <Text style={styles.companyValue}>{currentUser?.companyName} ({currentUser?.companyId})</Text>
        </View>

        {/* Navigation Grid Buttons */}
        <Text style={styles.sectionTitle}>Quick Access Tools</Text>
        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => navigation.navigate('Attendance')}
            activeOpacity={opacityValue.medium}
          >
            <Text style={styles.gridIcon}>📅</Text>
            <Text style={styles.gridText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => navigation.navigate('Leave')}
            activeOpacity={opacityValue.medium}
          >
            <Text style={styles.gridIcon}>🌴</Text>
            <Text style={styles.gridText}>Leave</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => navigation.navigate('Announcements')}
            activeOpacity={opacityValue.medium}
          >
            <Text style={styles.gridIcon}>📢</Text>
            <Text style={styles.gridText}>Noticeboard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => navigation.navigate('Performance')}
            activeOpacity={opacityValue.medium}
          >
            <Text style={styles.gridIcon}>📈</Text>
            <Text style={styles.gridText}>Performance</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, styles.fullWidthGridItem]} 
            onPress={() => navigation.navigate('FieldForce')}
            activeOpacity={opacityValue.medium}
          >
            <Text style={styles.gridIcon}>📍</Text>
            <Text style={styles.gridText}>Field Force GPS check-in</Text>
          </TouchableOpacity>
        </View>

        {/* Attendance Widget */}
        {!isAdmin && (
          <Card header={strings.todayStatus} style={styles.cardSpacing}>
            <View style={styles.attendanceRow}>
              <View>
                <Text style={styles.attendanceStateText}>
                  {isClockedIn ? 'SHIFT IS ACTIVE' : 'SHIFT NOT STARTED'}
                </Text>
                <Text style={styles.attendanceTimeSubText}>
                  {isClockedIn ? `Checked in at: ${activeCheckIn[userId]?.checkInTime}` : 'Tap below to log in today'}
                </Text>
              </View>
              <Button 
                title={isClockedIn ? strings.clockOutBtn : strings.clockInBtn} 
                type={isClockedIn ? 'danger' : 'secondary'}
                onPress={handleClockToggle}
                style={styles.clockBtn}
              />
            </View>
          </Card>
        )}

        {/* Main Stats Summary */}
        <View style={styles.statsRow}>
          {isAdmin ? (
            <Card style={styles.halfCard} header="Active Staff">
              <Text style={styles.bigStatNum}>{employees.filter(e => e.companyId === currentUser?.companyId).length}</Text>
              <Text style={styles.statSubText}>Enrolled Workers</Text>
            </Card>
          ) : (
            <Card style={styles.halfCard} header={strings.leavesRemaining}>
              <Text style={styles.bigStatNum}>{totalLeaveLeft}</Text>
              <Text style={styles.statSubText}>Total Available Days</Text>
            </Card>
          )}

          <Card style={styles.halfCard} header={strings.upcomingHoliday}>
            <Text style={styles.holidayName}>Solstice</Text>
            <Text style={styles.holidayDate}>June 23rd</Text>
          </Card>
        </View>

        {/* Noticeboard preview */}
        <Card header={strings.announcementsFeed} style={styles.cardSpacing}>
          <Text style={styles.announcementTitle}>{latestAnnouncement.title}</Text>
          <Text style={styles.announcementExcerpt} numberOfLines={2}>
            {latestAnnouncement.content}
          </Text>
          <TouchableOpacity 
            style={styles.viewAllBtn} 
            onPress={() => navigation.navigate('Announcements')}
          >
            <Text style={styles.viewAllText}>{strings.viewAll} Announcements →</Text>
          </TouchableOpacity>
        </Card>

        {/* Productivity Score Chart (Employee only) */}
        {!isAdmin && (
          <Card header="Performance Analytics Overview" style={styles.cardSpacing}>
            <View style={styles.analyticsRow}>
              <ProgressRingPlaceholder score={performance.productivityScore} title="Efficiency" />
              <View style={styles.analyticsTextDetails}>
                <Text style={styles.analyticsTitleText}>Overall Productivity Status</Text>
                <Text style={styles.analyticsBodyText}>
                  Your completion score is currently standing at <Text style={styles.bold}>{performance.completionRate}%</Text>, and you log an average of <Text style={styles.bold}>{performance.avgHours} hours</Text> daily.
                </Text>
                
                <Text style={styles.barLabel}>Task Completion Rate</Text>
                <ProgressBar percentage={performance.completionRate} color={colors.secondary} />
              </View>
            </View>
          </Card>
        )}

        {/* Analytics Summary (Admin only) */}
        {isAdmin && (
          <Card header="Workspace Productivity Summary" style={styles.cardSpacing}>
            <Text style={styles.analyticsTitleText}>Company Target Completion Rate</Text>
            <ProgressBar percentage={88} color={colors.secondary} />
            <Text style={styles.progressLabelText}>88% Completion rate this month</Text>

            <Text style={styles.analyticsTitleTextWithMargin}>Average Staff Working Hours</Text>
            <ProgressBar percentage={92} color={colors.primaryLight} />
            <Text style={styles.progressLabelText}>92% efficiency rating registered</Text>
          </Card>
        )}
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
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.L,
  },
  welcomeText: {
    fontSize: fontSize.bodyMedium,
    color: colors.textMuted,
    fontWeight: '500',
  },
  userName: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.text,
  },
  userRole: {
    fontSize: fontSize.body,
    color: colors.primaryLight,
    fontWeight: '600',
    marginTop: spacing.Xs,
  },
  badge: {
    paddingHorizontal: spacing.M,
    paddingVertical: spacing.five,
    borderRadius: borderRadius.md,
  },
  badgeAdmin: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: borderValue.subtle,
    borderColor: colors.accent,
  },
  badgeEmployee: {
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
    borderWidth: borderValue.subtle,
    borderColor: colors.primary,
  },
  badgeText: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.text,
  },
  companyInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: borderRadius.xl,
    borderWidth: borderValue.subtle,
    borderColor: colors.border,
    paddingHorizontal: spacing.mediumLarge,
    paddingVertical: spacing.M,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.XL,
  },
  companyLabel: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    marginRight: spacing.Sm,
    fontWeight: '600',
  },
  companyValue: {
    fontSize: fontSize.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.M,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.L,
  },
  gridItem: {
    width: percentageCode.nearHalf,
    backgroundColor: colors.cardBg,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    padding: spacing.L,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.medium,
  },
  fullWidthGridItem: {
    width: percentageCode.full,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gridIcon: {
    fontSize: fontSize.titleLarge,
    marginBottom: spacing.Sm,
  },
  gridText: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.text,
    marginLeft: spacing.Sm,
  },
  cardSpacing: {
    marginBottom: spacing.mediumLarge,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceStateText: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '800',
    color: colors.text,
  },
  attendanceTimeSubText: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  clockBtn: {
    paddingVertical: spacing.M,
    paddingHorizontal: spacing.large,
    marginVertical: spacing.none,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.Sm,
  },
  halfCard: {
    width: percentageCode.nearHalf,
    height: componentSizes.halfCardHeight,
    marginVertical: spacing.none,
  },
  bigStatNum: {
    fontSize: fontSize.titleSmall,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.S,
  },
  statSubText: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  holidayName: {
    fontSize: fontSize.medium,
    fontWeight: '800',
    color: colors.warning,
    marginTop: spacing.Sm,
  },
  holidayDate: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.Xs,
  },
  announcementTitle: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
  },
  announcementExcerpt: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.S,
    lineHeight: lineHeight.small,
  },
  viewAllBtn: {
    marginTop: spacing.M,
    alignSelf: 'flex-start',
  },
  viewAllText: {
    fontSize: fontSize.bodySmall,
    color: colors.primaryLight,
    fontWeight: '700',
  },
  analyticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyticsTextDetails: {
    flex: flexValue.full,
    marginLeft: spacing.L,
  },
  analyticsTitleText: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  analyticsTitleTextWithMargin: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.mediumLarge,
  },
  analyticsBodyText: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.S,
    lineHeight: lineHeight.tight,
    marginBottom: spacing.small,
  },
  bold: {
    color: colors.text,
    fontWeight: '700',
  },
  barLabel: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    fontWeight: '600',
  },
  progressLabelText: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.Xs,
    textAlign: 'right',
  },
});

export default DashboardScreen;
