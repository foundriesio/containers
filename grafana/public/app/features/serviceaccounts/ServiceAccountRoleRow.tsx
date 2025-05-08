import { css, cx } from '@emotion/css';
import React, { PureComponent } from 'react';

import { UserRolePicker } from 'app/core/components/RolePicker/UserRolePicker';
import { contextSrv } from 'app/core/core';
import { AccessControlAction, OrgRole, Role, ServiceAccountDTO } from 'app/types';

import { OrgRolePicker } from '../admin/OrgRolePicker';

interface Props {
  label: string;
  serviceAccount: ServiceAccountDTO;
  onRoleChange: (role: OrgRole) => void;
  roleOptions: Role[];
  builtInRoles: Record<string, Role[]>;
}

export class ServiceAccountRoleRow extends PureComponent<Props> {
  render() {
    const { label, serviceAccount, roleOptions, builtInRoles, onRoleChange } = this.props;
    const canUpdateRole = contextSrv.hasPermissionInMetadata(AccessControlAction.ServiceAccountsWrite, serviceAccount);
    const rolePickerDisabled = !canUpdateRole;
    const labelClass = cx(
      'width-16',
      css`
        font-weight: 500;
      `
    );

    const inputId = `${label}-input`;
    return (
      <tr>
        <td className={labelClass}>
          <label htmlFor={inputId}>{label}</label>
        </td>
        <td className="width-25" colSpan={2}>
          {contextSrv.licensedAccessControlEnabled() ? (
            <UserRolePicker
              userId={serviceAccount.id}
              orgId={serviceAccount.orgId}
              builtInRole={serviceAccount.role}
              onBuiltinRoleChange={onRoleChange}
              roleOptions={roleOptions}
              builtInRoles={builtInRoles}
              disabled={rolePickerDisabled}
            />
          ) : (
            <OrgRolePicker
              aria-label="Role"
              value={serviceAccount.role}
              disabled={!canUpdateRole}
              onChange={onRoleChange}
            />
          )}
        </td>
        <td></td>
      </tr>
    );
  }
}
