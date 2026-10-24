import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../Helper/colors';
import { strings } from '../../Constants/strings';
import { logFieldCheckpointThunk } from '../../redux/slices/appSlice';
import { Header } from '../../Components/Header';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import {
  spacing,
  borderRadius,
  borderValue,
  fontSize,
  letterSpacing,
  flexValue,
  componentSizes,
} from '../../Helper/sizes';

const SITES = [
  { id: '1', name: 'Municipal Office Complex', coords: '19.0760° N, 72.8777° E' },
  { id: '2', name: 'Main HQ Office', coords: '19.0820° N, 72.8812° E' },
  { id: '3', name: 'Metro Construction Site B', coords: '19.1225° N, 72.9104° E' },
];

export const FieldForceScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const fieldForceLogs = useSelector((state) => state.app.fieldForceLogs);

  const userId = currentUser?.id;
  const isAdmin = currentUser?.role === 'admin';

  // Filter logs
  const userLogs = isAdmin
    ? fieldForceLogs // Admin views all GPS checkins
    : fieldForceLogs.filter(log => log.userId === userId);

  const [selectedSite, setSelectedSite] = useState(SITES[0]);

  const handleLogCheckpoint = () => {
    dispatch(logFieldCheckpointThunk({ userId, checkpoint: selectedSite.name, coords: selectedSite.coords }))
      .unwrap()
      .then(() => {
        Alert.alert(
          'Success',
          `Site attendance registered at:\n${selectedSite.name}\n\nCoordinates: ${selectedSite.coords}`
        );
      });
  };

  const renderLogItem = ({ item }) => {
    return (
      <View style={styles.logItem}>
        <View style={styles.logLeft}>
          <Text style={styles.logSite}>{item.checkpoint}</Text>
          {isAdmin && <Text style={styles.logUser}>User ID: {item.userId}</Text>}
          <Text style={styles.logTime}>{item.time}</Text>
        </View>
        <Text style={styles.logCoords}>{item.coords}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={strings.fieldForceTitle} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* GPS Console (Employee Only) */}
        {!isAdmin && (
          <Card header={strings.gpsStatus} style={styles.consoleCard}>
            <View style={styles.statusBanner}>
              <View style={styles.dot} />
              <Text style={styles.statusText}>{strings.gpsConnected}</Text>
            </View>

            <Text style={styles.label}>{strings.checkPointPlaceholder}</Text>
            <View style={styles.siteGrid}>
              {SITES.map((site) => (
                <TouchableOpacity
                  key={site.id}
                  style={[styles.siteTab, selectedSite.id === site.id ? styles.activeSiteTab : null]}
                  onPress={() => setSelectedSite(site)}
                >
                  <Text style={[styles.siteText, selectedSite.id === site.id ? styles.activeSiteText : null]}>
                    {site.name}
                  </Text>
                  <Text style={styles.siteCoordsText}>{site.coords}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Active Site Check:</Text>
              <Text style={styles.summaryValue}>{selectedSite.name}</Text>
            </View>

            <Button
              title={strings.logCheckpointBtn}
              type="secondary"
              onPress={handleLogCheckpoint}
              style={styles.submitBtn}
            />
          </Card>
        )}

        {/* History of logged locations */}
        <Text style={styles.historyHeading}>Checkpoint Log History</Text>
        <Card noPadding style={styles.listCard}>
          {userLogs.length === 0 ? (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No field check-ins logged.</Text>
            </View>
          ) : (
            <FlatList
              data={userLogs}
              renderItem={renderLogItem}
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
  consoleCard: {
    marginBottom: spacing.L,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.M,
    borderRadius: borderRadius.md,
    borderWidth: borderValue.hairline,
    borderColor: colors.secondary,
    marginBottom: spacing.L,
  },
  dot: {
    width: componentSizes.dotSize,
    height: componentSizes.dotSize,
    borderRadius: borderRadius.xs,
    backgroundColor: colors.secondary,
    marginRight: spacing.small,
  },
  statusText: {
    color: colors.secondary,
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
  },
  label: {
    fontSize: fontSize.bodySmall,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.small,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.normal,
  },
  siteGrid: {
    marginBottom: spacing.small,
  },
  siteTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: borderValue.thin,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.medium,
    marginBottom: spacing.M,
  },
  activeSiteTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  siteText: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  activeSiteText: {
    color: colors.text,
  },
  siteCoordsText: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  divider: {
    height: componentSizes.separatorSubtle,
    backgroundColor: colors.border,
    marginVertical: spacing.mediumLarge,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.L,
  },
  summaryLabel: {
    fontSize: fontSize.bodySmall,
    color: colors.textMuted,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: fontSize.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  submitBtn: {
    marginVertical: spacing.none,
  },
  historyHeading: {
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
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.L,
  },
  logLeft: {
    flex: flexValue.full,
    paddingRight: spacing.small,
  },
  logSite: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  logUser: {
    fontSize: fontSize.extraSmall,
    color: colors.textMuted,
    marginTop: spacing.Xs,
  },
  logTime: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.S,
  },
  logCoords: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  separator: {
    height: componentSizes.separatorRegular,
    backgroundColor: colors.border,
  },
});

const Separator = () => <View style={styles.separator} />;

export default FieldForceScreen;
