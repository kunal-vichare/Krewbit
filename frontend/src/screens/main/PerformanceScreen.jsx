import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../Helper/colors';
import { strings } from '../../Constants/strings';
import { selectEmployeePerformance } from '../../Redux/slices/appSlice';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/Chart';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  lineHeight,
  flexValue,
  componentSizes,
} from '../../Helper/sizes';

export const PerformanceScreen = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const employees = useSelector((state) => state.auth.employees);

  const isAdmin = currentUser?.role === 'admin';
  const userId = currentUser?.id;

  // Filter employees belonging to the same company
  const companyEmployees = employees?.filter(e => e.companyId === currentUser?.companyId) || [];
  const [selectedEmp, setSelectedEmp] = useState(companyEmployees[0] || null);

  // Manager feedback input
  const [feedbackText, setFeedbackText] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState({}); // empId -> feedback

  const currentEmpId = isAdmin ? (selectedEmp?.id || 'EMP-202') : userId;
  const performance = selectEmployeePerformance(currentEmpId);

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert('Error', 'Please enter some feedback first.');
      return;
    }
    setSubmittedFeedback(prev => ({
      ...prev,
      [selectedEmp.id]: feedbackText
    }));
    Alert.alert('Success', `Feedback submitted to ${selectedEmp.name}.`);
    setFeedbackText('');
  };

  const getStatusColor = (score) => {
    if (score >= 90) return colors.secondary;
    if (score >= 80) return colors.primaryLight;
    return colors.warning;
  };

  const getStatusLabel = (score) => {
    if (score >= 90) return strings.highPerformer;
    if (score >= 80) return strings.satisfactory;
    return strings.needsImprovement;
  };

  return (
    <View style={styles.container}>
      <Header title={strings.performanceTitle} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Employee selector (Admin Only) */}
        {isAdmin && companyEmployees.length > 0 && (
          <Card header="Select Team Member" style={styles.selectorCard}>
            <View style={styles.selectorRow}>
              {companyEmployees.map((emp) => (
                <TouchableOpacity
                  key={emp.id}
                  style={[styles.selectorTab, selectedEmp?.id === emp.id ? styles.activeSelectorTab : null]}
                  onPress={() => setSelectedEmp(emp)}
                >
                  <Text style={[styles.selectorTabText, selectedEmp?.id === emp.id ? styles.activeSelectorTabText : null]}>
                    {emp.name.split(' ')[0]}
                  </Text>
                  <Text style={styles.selectorEmpId}>{emp.id}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        )}

        {/* Analytics Card */}
        <Card header={`${isAdmin ? (selectedEmp?.name || 'Employee') : 'My'} Performance Scorecard`}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreBlock}>
              <Text style={styles.scoreNum}>{performance.productivityScore}%</Text>
              <Text style={styles.scoreLabel}>{strings.performanceScore}</Text>
            </View>
            <View style={styles.scoreBlock}>
              <Text style={styles.scoreNum}>{performance.avgHours}h</Text>
              <Text style={styles.scoreLabel}>{strings.averageHoursText}</Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>{strings.taskCompletionText}</Text>
              <Text style={styles.metricVal}>{performance.completionRate}%</Text>
            </View>
            <ProgressBar percentage={performance.completionRate} color={colors.secondary} />
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Clock-In Consistency</Text>
              <Text style={styles.metricVal}>94%</Text>
            </View>
            <ProgressBar percentage={94} color={colors.primaryLight} />
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Performance Status Rank:</Text>
            <View style={[styles.statusTag, { borderColor: getStatusColor(performance.productivityScore) }]}>
              <Text style={[styles.statusTagText, { color: getStatusColor(performance.productivityScore) }]}>
                {getStatusLabel(performance.productivityScore)}
              </Text>
            </View>
          </View>
        </Card>

        {/* Manager Feedback Form (Admin Only) */}
        {isAdmin && selectedEmp && (
          <Card header={`Submit Review for ${selectedEmp.name}`} style={styles.feedbackFormCard}>
            <Input
              label="Review & Feedback"
              placeholder="e.g. Great velocity, maintain communication logs..."
              value={feedbackText}
              onChangeText={setFeedbackText}
              inputStyle={styles.feedbackInput}
            />
            <Button
              title="Submit Feedback"
              type="secondary"
              onPress={handleSubmitFeedback}
              style={styles.submitBtn}
            />
          </Card>
        )}

        {/* Feedback Display Card (Employee Only or Admin review summary) */}
        <Card header={strings.managerFeedbackTitle} style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>
            {isAdmin
              ? (submittedFeedback[selectedEmp?.id] || performance.feedback)
              : (submittedFeedback[userId] || performance.feedback)
            }
          </Text>
          <View style={styles.feedbackFooter}>
            <Text style={styles.reviewerText}>Reviewer: Sarah Jenkins (Admin)</Text>
            <Text style={styles.reviewerDate}>Cycle: Q2 2026</Text>
          </View>
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
  selectorCard: {
    marginBottom: spacing.L,
  },
  selectorRow: {
    flexDirection: 'row',
  },
  selectorTab: {
    flex: flexValue.full,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.M,
    alignItems: 'center',
    marginHorizontal: spacing.S,
  },
  activeSelectorTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectorTabText: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeSelectorTabText: {
    color: colors.text,
  },
  selectorEmpId: {
    fontSize: fontSize.tiny,
    color: colors.textDim,
    marginTop: spacing.Xs,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.medium,
    borderBottomWidth: borderValue.thin,
    borderBottomColor: colors.border,
    marginBottom: spacing.L,
  },
  scoreBlock: {
    alignItems: 'center',
  },
  scoreNum: {
    fontSize: fontSize.huge,
    fontWeight: '900',
    color: colors.text,
  },
  scoreLabel: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.S,
    fontWeight: '600',
  },
  metricItem: {
    marginBottom: spacing.L,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.Sm,
  },
  metricLabel: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    fontWeight: '600',
  },
  metricVal: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.M,
    paddingTop: spacing.mediumLarge,
    borderTopWidth: borderValue.hairline,
    borderTopColor: colors.border,
  },
  statusTitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    fontWeight: '600',
  },
  statusTag: {
    paddingHorizontal: spacing.M,
    paddingVertical: spacing.S,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: borderValue.subtle,
  },
  statusTagText: {
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  feedbackFormCard: {
    marginTop: spacing.L,
  },
  feedbackInput: {
    height: componentSizes.feedbackInputHeight,
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: spacing.small,
    marginVertical: spacing.none,
  },
  feedbackCard: {
    marginTop: spacing.L,
  },
  feedbackText: {
    fontSize: fontSize.body,
    color: colors.text,
    lineHeight: lineHeight.medium,
    fontStyle: 'italic',
  },
  feedbackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.mediumLarge,
    paddingTop: spacing.M,
    borderTopWidth: borderValue.hairline,
    borderTopColor: colors.border,
  },
  reviewerText: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    fontWeight: '700',
  },
  reviewerDate: {
    fontSize: fontSize.extraSmall,
    color: colors.textDim,
  },
});

export default PerformanceScreen;
