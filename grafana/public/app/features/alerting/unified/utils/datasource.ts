import { DataSourceJsonData, DataSourceInstanceSettings } from '@grafana/data';
import { contextSrv } from 'app/core/services/context_srv';
import { AlertManagerDataSourceJsonData, AlertManagerImplementation } from 'app/plugins/datasource/alertmanager/types';
import { AccessControlAction } from 'app/types';
import { RulesSource } from 'app/types/unified-alerting';

import { getAllDataSources } from './config';

export const GRAFANA_RULES_SOURCE_NAME = 'grafana';
export const GRAFANA_DATASOURCE_NAME = '-- Grafana --';

export enum DataSourceType {
  Alertmanager = 'alertmanager',
  Loki = 'loki',
  Prometheus = 'prometheus',
}

export const RulesDataSourceTypes: string[] = [DataSourceType.Loki, DataSourceType.Prometheus];

export function getRulesDataSources() {
  if (!contextSrv.hasPermission(AccessControlAction.AlertingRuleExternalRead)) {
    return [];
  }

  return getAllDataSources()
    .filter((ds) => RulesDataSourceTypes.includes(ds.type) && ds.jsonData.manageAlerts !== false)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRulesDataSource(rulesSourceName: string) {
  return getRulesDataSources().find((x) => x.name === rulesSourceName);
}

export function getAlertManagerDataSources() {
  return getAllDataSources()
    .filter((ds) => ds.type === DataSourceType.Alertmanager)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getLotexDataSourceByName(dataSourceName: string): DataSourceInstanceSettings {
  const dataSource = getDataSourceByName(dataSourceName);
  if (!dataSource) {
    throw new Error(`Data source ${dataSourceName} not found`);
  }
  if (dataSource.type !== DataSourceType.Loki && dataSource.type !== DataSourceType.Prometheus) {
    throw new Error(`Unexpected data source type ${dataSource.type}`);
  }
  return dataSource;
}

export function getAllRulesSourceNames(): string[] {
  const availableRulesSources: string[] = getRulesDataSources().map((r) => r.name);

  if (contextSrv.hasPermission(AccessControlAction.AlertingRuleRead)) {
    availableRulesSources.push(GRAFANA_RULES_SOURCE_NAME);
  }

  return availableRulesSources;
}

export function getAllRulesSources(): RulesSource[] {
  const availableRulesSources: RulesSource[] = getRulesDataSources();

  if (contextSrv.hasPermission(AccessControlAction.AlertingRuleRead)) {
    availableRulesSources.push(GRAFANA_RULES_SOURCE_NAME);
  }

  return availableRulesSources;
}

export function getRulesSourceName(rulesSource: RulesSource): string {
  return isCloudRulesSource(rulesSource) ? rulesSource.name : rulesSource;
}

export function isCloudRulesSource(rulesSource: RulesSource | string): rulesSource is DataSourceInstanceSettings {
  return rulesSource !== GRAFANA_RULES_SOURCE_NAME;
}

export function isVanillaPrometheusAlertManagerDataSource(name: string): boolean {
  return (
    name !== GRAFANA_RULES_SOURCE_NAME &&
    (getDataSourceByName(name)?.jsonData as AlertManagerDataSourceJsonData)?.implementation ===
      AlertManagerImplementation.prometheus
  );
}

export function isGrafanaRulesSource(
  rulesSource: RulesSource | string
): rulesSource is typeof GRAFANA_RULES_SOURCE_NAME {
  return rulesSource === GRAFANA_RULES_SOURCE_NAME;
}

export function getDataSourceByName(name: string): DataSourceInstanceSettings<DataSourceJsonData> | undefined {
  return getAllDataSources().find((source) => source.name === name);
}

export function getRulesSourceByName(name: string): RulesSource | undefined {
  if (name === GRAFANA_RULES_SOURCE_NAME) {
    return GRAFANA_RULES_SOURCE_NAME;
  }
  return getDataSourceByName(name);
}

export function getDatasourceAPIId(dataSourceName: string) {
  if (dataSourceName === GRAFANA_RULES_SOURCE_NAME) {
    return GRAFANA_RULES_SOURCE_NAME;
  }
  const ds = getDataSourceByName(dataSourceName);
  if (!ds) {
    throw new Error(`Datasource "${dataSourceName}" not found`);
  }
  return String(ds.id);
}
