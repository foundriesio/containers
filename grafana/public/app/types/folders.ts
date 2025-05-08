import { DashboardAcl } from './acl';

export interface FolderDTO {
  id: number;
  uid: string;
  title: string;
  url: string;
  version: number;
  canSave: boolean;
  canEdit: boolean;
  canAdmin: boolean;
  canDelete: boolean;
}

export interface FolderState {
  id: number;
  uid: string;
  title: string;
  url: string;
  canSave: boolean;
  canDelete: boolean;
  hasChanged: boolean;
  version: number;
  permissions: DashboardAcl[];
  canViewFolderPermissions: boolean;
}

export interface FolderInfo {
  id?: number;
  title?: string;
  url?: string;
  canViewFolderPermissions?: boolean;
}
