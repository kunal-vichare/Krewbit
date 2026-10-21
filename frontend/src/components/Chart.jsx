import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../Helper/colors';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  flexValue,
  percentageCode,
  componentSizes,
} from '../Helper/sizes';

// Bar Chart Component (Flexbox-based)
export const BarChart = ({ data = [], maxValue = spacing.M, height = componentSizes.defaultChartHeight }) => {
  return (
    <View style={[styles.chartContainer, { height }]}>
      <View style={styles.chartYAxis}>
        <Text style={styles.yAxisText}>{maxValue}h</Text>
        <Text style={styles.yAxisText}>{Math.floor(maxValue / 2)}h</Text>
        <Text style={styles.yAxisText}>0h</Text>
      </View>
      
      <View style={styles.chartPlotArea}>
        {data.map((item, index) => {
          const percentage = Math.min((item.value / maxValue) * 100, 100);
          return (
            <View key={index} style={styles.barWrapper}>
              <View style={styles.barTrack}>
                <View 
                  style={[
                    styles.barFill, 
                    { height: `${percentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel}>{item.label}</Text>
              <Text style={styles.barValue}>{item.value}h</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Progress Line Bar Component (horizontal gauge)
export const ProgressBar = ({ percentage = spacing.none, color = colors.primary, height = componentSizes.defaultProgressHeight }) => {
  const clampedValue = Math.min(Math.max(percentage, 0), 100);
  return (
    <View style={styles.progressBarWrapper}>
      <View style={[styles.progressBarTrack, { height }]}>
        <View 
          style={[
            styles.progressBarFill, 
            { 
              width: `${clampedValue}%`, 
              backgroundColor: color,
              height 
            }
          ]} 
        />
      </View>
    </View>
  );
};

// Conic / Ring styled metric badge (simulating circle rings using concentric layout)
export const ProgressRingPlaceholder = ({ score = 85, title = 'Productivity' }) => {
  return (
    <View style={styles.ringContainer}>
      <View style={styles.ringOuter}>
        <View style={styles.ringInner}>
          <Text style={styles.ringScoreText}>{score}%</Text>
          <Text style={styles.ringLabelText}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginVertical: spacing.medium,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    paddingRight: spacing.small,
    paddingVertical: spacing.medium,
    borderRightWidth: borderValue.thin,
    borderRightColor: colors.border,
  },
  yAxisText: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    textAlign: 'right',
  },
  chartPlotArea: {
    flex: flexValue.full,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingLeft: spacing.small,
  },
  barWrapper: {
    alignItems: 'center',
    flex: flexValue.full,
    height: percentageCode.full,
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: componentSizes.barTrackWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.md,
    flex: flexValue.full,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: spacing.Sm,
  },
  barFill: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    width: percentageCode.full,
  },
  barLabel: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  barValue: {
    fontSize: fontSize.tiny,
    color: colors.text,
    fontWeight: 'bold',
    marginTop: spacing.Xs,
  },
  
  // Progress Bar styles
  progressBarWrapper: {
    width: percentageCode.full,
    marginVertical: spacing.Sm,
  },
  progressBarTrack: {
    width: percentageCode.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: borderRadius.xs,
    overflow: 'hidden',
  },
  progressBarFill: {
    borderRadius: borderRadius.xs,
  },

  // Concentric circle ring styles
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.M,
  },
  ringOuter: {
    width: componentSizes.ringOuterSize,
    height: componentSizes.ringOuterSize,
    borderRadius: borderRadius.roundMedium,
    borderWidth: borderValue.heavy,
    borderColor: colors.primary,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
  ringInner: {
    width: componentSizes.ringInnerSize,
    height: componentSizes.ringInnerSize,
    borderRadius: borderRadius.roundSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringScoreText: {
    fontSize: fontSize.titleMedium,
    fontWeight: '800',
    color: colors.text,
  },
  ringLabelText: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.Xs,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
