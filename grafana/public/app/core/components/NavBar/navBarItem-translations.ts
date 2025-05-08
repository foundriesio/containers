import { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

// Maps the ID of the nav item to a translated phrase to later pass to <Trans />
// Because the navigation content is dynamic (defined in the backend), we can not use
// the normal inline message definition method.
// Keys MUST match the ID of the navigation item, defined in the backend.
// see pkg/api/index.go
const TRANSLATED_MENU_ITEMS: Record<string, MessageDescriptor> = {
  home: defineMessage({ id: 'nav.home', message: 'Home' }),

  create: defineMessage({ id: 'nav.create', message: 'Create' }),
  'create-dashboard': defineMessage({ id: 'nav.create-dashboard', message: 'Dashboard' }),
  folder: defineMessage({ id: 'nav.create-folder', message: 'Folder' }),
  import: defineMessage({ id: 'nav.create-import', message: 'Import' }),
  alert: defineMessage({ id: 'nav.create-alert', message: 'Alert rule' }),

  dashboards: defineMessage({ id: 'nav.dashboards', message: 'Dashboards' }),
  'manage-dashboards': defineMessage({ id: 'nav.manage-dashboards', message: 'Browse' }),
  playlists: defineMessage({ id: 'nav.playlists', message: 'Playlists' }),
  snapshots: defineMessage({ id: 'nav.snapshots', message: 'Snapshots' }),
  'library-panels': defineMessage({ id: 'nav.library-panels', message: 'Library panels' }),
  'new-dashboard': defineMessage({ id: 'nav.new-dashboard', message: 'New dashboard' }),
  'new-folder': defineMessage({ id: 'nav.new-folder', message: 'New folder' }),

  explore: defineMessage({ id: 'nav.explore', message: 'Explore' }),

  alerting: defineMessage({ id: 'nav.alerting', message: 'Alerting' }),
  'alert-list': defineMessage({ id: 'nav.alerting-list', message: 'Alert rules' }),
  receivers: defineMessage({ id: 'nav.alerting-receivers', message: 'Contact points' }),
  'am-routes': defineMessage({ id: 'nav.alerting-am-routes', message: 'Notification policies' }),
  channels: defineMessage({ id: 'nav.alerting-channels', message: 'Notification channels' }),

  silences: defineMessage({ id: 'nav.alerting-silences', message: 'Silences' }),
  groups: defineMessage({ id: 'nav.alerting-groups', message: 'Groups' }),
  'alerting-admin': defineMessage({ id: 'nav.alerting-admin', message: 'Admin' }),

  cfg: defineMessage({ id: 'nav.config', message: 'Configuration' }),
  datasources: defineMessage({ id: 'nav.datasources', message: 'Data sources' }),
  users: defineMessage({ id: 'nav.users', message: 'Users' }),
  teams: defineMessage({ id: 'nav.teams', message: 'Teams' }),
  plugins: defineMessage({ id: 'nav.plugins', message: 'Plugins' }),
  'org-settings': defineMessage({ id: 'nav.org-settings', message: 'Preferences' }),
  apikeys: defineMessage({ id: 'nav.api-keys', message: 'API keys' }),
  serviceaccounts: defineMessage({ id: 'nav.service-accounts', message: 'Service accounts' }),

  live: defineMessage({ id: 'nav.live', message: 'Event streaming' }),
  'live-status': defineMessage({ id: 'nav.live-status', message: 'Status' }),
  'live-pipeline': defineMessage({ id: 'nav.live-pipeline', message: 'Pipeline' }),
  'live-cloud': defineMessage({ id: 'nav.live-cloud', message: 'Cloud' }),

  help: defineMessage({ id: 'nav.help', message: 'Help' }),

  'profile-settings': defineMessage({ id: 'nav.profile-settings', message: 'Preferences' }),
  'change-password': defineMessage({ id: 'nav.change-password', message: 'Change password' }),
  'sign-out': defineMessage({ id: 'nav.sign-out', message: 'Sign out' }),
};

export default TRANSLATED_MENU_ITEMS;
