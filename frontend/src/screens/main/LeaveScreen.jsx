import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { STRINGS } from '../../Constants/strings';
import { applyLeave, updateLeaveStatus } from '../../redux/slices/appSlice';
import { Header } from '../../Components/Header';
import { Card } from '../../Components/Card';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';

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
      tempErrors.startDate = STRINGS.requiredError;
      valid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      tempErrors.startDate = 'Use format YYYY-MM-DD';
      valid = false;
    }

    if (!endDate) {
      tempErrors.endDate = STRINGS.requiredError;
      valid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      tempErrors.endDate = 'Use format YYYY-MM-DD';
      valid = false;
    }

    if (!reason) {
      tempErrors.reason = STRINGS.requiredError;
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
          Alert.alert('Success', STRINGS.leaveAppliedSuccess);
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
      <Header title={STRINGS.leaveTitle} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Leave Balances Grid (Employee Only) */}
        {!isAdmin && (
          <View style={styles.balanceGrid}>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.casual}</Text>
              <Text style={styles.balanceLabel}>{STRINGS.casualLeave}</Text>
            </Card>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.sick}</Text>
              <Text style={styles.balanceLabel}>{STRINGS.sickLeave}</Text>
            </Card>
            <Card style={styles.balanceCard}>
              <Text style={styles.balanceNum}>{balances.earned}</Text>
              <Text style={styles.balanceLabel}>{STRINGS.earnedLeave}</Text>
            </Card>
          </View>
        )}

        {/* Apply Leave Form (Employee Only) */}
        {!isAdmin && (
          <Card header={STRINGS.applyLeaveTitle} style={styles.formCard}>
            <Text style={styles.formLabel}>{STRINGS.leaveTypeLabel}</Text>
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
              label={STRINGS.startDateLabel}
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChangeText={setStartDate}
              error={errors.startDate}
            />

            <Input
              label={STRINGS.endDateLabel}
              placeholder="YYYY-MM-DD"
              value={endDate}
              onChangeText={setEndDate}
              error={errors.endDate}
            />

            <Input
              label={STRINGS.reasonLabel}
              placeholder={STRINGS.reasonPlaceholder}
              value={reason}
              onChangeText={setReason}
              error={errors.reason}
            />

            <Button
              title={STRINGS.submitLeaveBtn}
              type="secondary"
              onPress={handleApply}
              style={styles.submitBtn}
            />
          </Card>
        )}

        {/* Applications List */}
        <Text style={styles.sectionHeader}>
          {isAdmin ? 'Pending Approvals & History' : STRINGS.leaveHistoryTitle}
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
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  balanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceCard: {
    width: '31%',
    alignItems: 'center',
    padding: 12,
    marginVertical: 0,
  },
  balanceNum: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.secondary,
  },
  balanceLabel: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  formCard: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: 16,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTypeTab: {
    backgroundColor: colors.primary,
  },
  typeTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTypeTabText: {
    color: colors.text,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: 8,
    marginVertical: 0,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listCard: {
    marginBottom: 10,
  },
  emptyList: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  appLeft: {
    flex: 1,
    paddingRight: 10,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  appType: {
    fontSize: 10,
    color: colors.primaryLight,
    fontWeight: '600',
    marginTop: 2,
  },
  appDates: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  appReason: {
    fontSize: 11,
    color: colors.textDim,
    marginTop: 6,
    fontStyle: 'italic',
  },
  appRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
  },
  statusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 0.5,
    borderColor: colors.warning,
  },
  statusApproved: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 0.5,
    borderColor: colors.secondary,
  },
  statusRejected: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 0.5,
    borderColor: colors.danger,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  approveBtn: {
    backgroundColor: colors.secondary,
  },
  rejectBtn: {
    backgroundColor: colors.danger,
  },
  actionBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});

const Separator = () => <View style={styles.separator} />;

export default LeaveScreen;
