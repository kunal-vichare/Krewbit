import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { strings } from '../../Constants/strings';
import { applyLeave, updateLeaveStatus } from '../../redux/slices/appSlice';
import { Header } from '../../Components/Header';
import { Card } from '../../Components/Card';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  letterSpacing,
  flexValue,
  percentageCode,
  componentSizes,
} from '../../Helper/sizes';

export const LeaveScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const leaveBalances = useSelector((state) => state.app.leaveBalances);
  const leaveApplications = useSelector((state) => state.app.leaveApplications);

  const userId = currentUser?.id;
  const isAdmin = currentUser?.role === 'admin';

  // State for application form
  const [leaveType, setLeaveType] = useState('casual'); // 'casual', 'sick', 'earned'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  // Filter applications
  const userApplications = isAdmin
    ? leaveApplications // Admin sees all leave requests
    : leaveApplications.filter(app => app.userId === userId);

  const balances = leaveBalances[userId] || { casual: 5, sick: 5, earned: 5 };

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!startDate) {
      tempErrors.startDate = strings.requiredError;
      valid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      tempErrors.startDate = 'Use format YYYY-MM-DD';
      valid = false;
    }

    if (!endDate) {
      tempErrors.endDate = strings.requiredError;
      valid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      tempErrors.endDate = 'Use format YYYY-MM-DD';
      valid = false;
    }

    if (!reason) {
      tempErrors.reason = strings.requiredError;
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleApply = () => {
    if (validate()) {
      dispatch(applyLeave({
        userId,
        employeeName: currentUser.name,
        leaveType,
        startDate,
        endDate,
        reason
      }))
        .unwrap()
        .then(() => {
          Alert.alert('Success', strings.leaveAppliedSuccess);
          setStartDate('');
          setEndDate('');
          setReason('');
          setErrors({});
        })
        .catch((error) => {
          Alert.alert('Application Failed', error);
        });
    }
  };

  const handleApprove = (id) => {
    dispatch(updateLeaveStatus({ applicationId: id, status: 'Approved' }))
      .unwrap()
      .then(() => {
        Alert.alert('Approved', 'Leave request has been approved.');
      });
  };

  const handleReject = (id) => {
    dispatch(updateLeaveStatus({ applicationId: id, status: 'Rejected' }))
      .unwrap()
      .then(() => {
        Alert.alert('Rejected', 'Leave request has been rejected.');
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return styles.statusApproved;
      case 'Rejected':
        return styles.statusRejected;
      case 'Pending':
      default:
        return styles.statusPending;
    }
  };

  const renderApplicationItem = ({ item }) => {
    const isPending = item.status === 'Pending';
    return (
      <View style={styles.appItem}>
        <View style={styles.appLeft}>
          <Text style={styles.appTitle}>
            {isAdmin ? item.employeeName : `${item.leaveType.toUpperCase()} Leave`}
          </Text>
          {isAdmin && <Text style={styles.appType}>{item.leaveType.toUpperCase()} Leave</Text>}
          <Text style={styles.appDates}>
            {item.startDate} to {item.endDate}
          </Text>
          <Text style={styles.appReason} numberOfLines={2}>
            " {item.reason} "
          </Text>
        </View>
        <View style={styles.appRight}>
          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>
          
          {isAdmin && isPending && (
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.approveBtn]} 
                onPress={() => handleApprove(item.id)}
              >
                <Text style={styles.actionBtnText}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.rejectBtn]} 
                onPress={() => handleReject(item.id)}
              >
                <Text style={styles.actionBtnText}>✗</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={strings.leaveTitle} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Leave Balances Grid (Employee Only) */}
        {!isAdmin && (
          <View style={styles.balanceGrid}>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.casual}</Text>
              <Text style={styles.balanceLabel}>{strings.casualLeave}</Text>
            </Card>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.sick}</Text>
              <Text style={styles.balanceLabel}>{strings.sickLeave}</Text>
            </Card>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.earned}</Text>
              <Text style={styles.balanceLabel}>{strings.earnedLeave}</Text>
            </Card>
          </View>
        )}

        {/* Apply Leave Form (Employee Only) */}
        {!isAdmin && (
          <Card header={strings.applyLeaveTitle} style={styles.formCard}>
            <Text style={styles.formLabel}>{strings.leaveTypeLabel}</Text>
            <View style={styles.typeSelector}>
              {['casual', 'sick', 'earned'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeTab, leaveType === type ? styles.activeTypeTab : null]}
                  onPress={() => setLeaveType(type)}
                >
                  <Text style={[styles.typeTabText, leaveType === type ? styles.activeTypeTabText : null]}>
                    {type.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label={strings.startDateLabel}
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChangeText={setStartDate}
              error={errors.startDate}
            />

            <Input
              label={strings.endDateLabel}
              placeholder="YYYY-MM-DD"
              value={endDate}
              onChangeText={setEndDate}
              error={errors.endDate}
            />

            <Input
              label={strings.reasonLabel}
              placeholder={strings.reasonPlaceholder}
              value={reason}
              onChangeText={setReason}
              error={errors.reason}
            />

            <Button
              title={strings.submitLeaveBtn}
              type="secondary"
              onPress={handleApply}
              style={styles.submitBtn}
            />
          </Card>
        )}

        {/* Applications List */}
        <Text style={styles.sectionHeader}>
          {isAdmin ? 'Pending Approvals & History' : strings.leaveHistoryTitle}
        </Text>
        <Card noPadding style={styles.listCard}>
          {userApplications.length === 0 ? (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No leave applications recorded.</Text>
            </View>
          ) : (
            <FlatList
              data={userApplications}
              renderItem={renderApplicationItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
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
  balanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.L,
  },
  balanceCard: {
    width: percentageCode.aroundThird,
    alignItems: 'center',
    padding: spacing.medium,
    marginVertical: spacing.none,
  },
  balanceNum: {
    fontSize: fontSize.titleMedium,
    fontWeight: '800',
    color: colors.secondary,
  },
  balanceLabel: {
    fontSize: fontSize.tiny,
    color: colors.textMuted,
    marginTop: spacing.S,
    textAlign: 'center',
    fontWeight: '600',
  },
  formCard: {
    marginBottom: spacing.XL,
  },
  formLabel: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.small,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: borderRadius.lg,
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    padding: spacing.S,
    marginBottom: spacing.L,
  },
  typeTab: {
    flex: flexValue.full,
    paddingVertical: spacing.M,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTypeTab: {
    backgroundColor: colors.primary,
  },
  typeTabText: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTypeTabText: {
    color: colors.text,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: spacing.small,
    marginVertical: spacing.none,
  },
  sectionHeader: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.M,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
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
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.L,
  },
  appLeft: {
    flex: flexValue.full,
    paddingRight: spacing.M,
  },
  appTitle: {
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
    color: colors.text,
  },
  appType: {
    fontSize: fontSize.extraSmall,
    color: colors.primaryLight,
    fontWeight: '600',
    marginTop: spacing.Xs,
  },
  appDates: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  appReason: {
    fontSize: fontSize.small,
    color: colors.textDim,
    marginTop: spacing.Sm,
    fontStyle: 'italic',
  },
  appRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.S,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.small,
  },
  statusBadgeText: {
    fontSize: fontSize.extraSmall,
    fontWeight: '700',
    color: colors.text,
  },
  statusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: borderValue.hairline,
    borderColor: colors.warning,
  },
  statusApproved: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: borderValue.hairline,
    borderColor: colors.secondary,
  },
  statusRejected: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: borderValue.hairline,
    borderColor: colors.danger,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: spacing.S,
  },
  actionBtn: {
    width: componentSizes.actionBtnSize,
    height: componentSizes.actionBtnSize,
    borderRadius: borderRadius.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.small,
  },
  approveBtn: {
    backgroundColor: colors.secondary,
  },
  rejectBtn: {
    backgroundColor: colors.danger,
  },
  actionBtnText: {
    color: colors.text,
    fontSize: fontSize.bodyMedium,
    fontWeight: '700',
  },
  separator: {
    height: componentSizes.separatorRegular,
    backgroundColor: colors.border,
  },
});

const Separator = () => <View style={styles.separator} />;

export default LeaveScreen;
