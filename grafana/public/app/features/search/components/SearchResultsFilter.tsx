import { css } from '@emotion/css';
import React, { FC, FormEvent } from 'react';

import { GrafanaTheme, SelectableValue } from '@grafana/data';
import { Button, Checkbox, stylesFactory, useTheme, HorizontalGroup } from '@grafana/ui';

import { DashboardQuery, SearchLayout } from '../types';

import { ActionRow } from './ActionRow';
import { PreviewsSystemRequirements } from './PreviewsSystemRequirements';

export interface Props {
  allChecked?: boolean;
  canDelete?: boolean;
  canMove?: boolean;
  deleteItem: () => void;
  hideLayout?: boolean;
  moveTo: () => void;
  onLayoutChange: (layout: SearchLayout) => void;
  setShowPreviews: (newValue: boolean) => void;
  onSortChange: (value: SelectableValue) => void;
  onStarredFilterChange: (event: FormEvent<HTMLInputElement>) => void;
  onTagFilterChange: (tags: string[]) => void;
  onToggleAllChecked: () => void;
  query: DashboardQuery;
  showPreviews?: boolean;
  editable?: boolean;
}

export const SearchResultsFilter: FC<Props> = ({
  allChecked,
  canDelete,
  canMove,
  deleteItem,
  hideLayout,
  moveTo,
  onLayoutChange,
  setShowPreviews,
  onSortChange,
  onStarredFilterChange,
  onTagFilterChange,
  onToggleAllChecked,
  query,
  showPreviews,
  editable,
}) => {
  const showActions = canDelete || canMove;
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        {editable && (
          <div className={styles.checkboxWrapper}>
            <Checkbox aria-label="Select all" value={allChecked} onChange={onToggleAllChecked} />
          </div>
        )}
        {showActions ? (
          <HorizontalGroup spacing="md">
            <Button disabled={!canMove} onClick={moveTo} icon="exchange-alt" variant="secondary">
              Move
            </Button>
            <Button disabled={!canDelete} onClick={deleteItem} icon="trash-alt" variant="destructive">
              Delete
            </Button>
          </HorizontalGroup>
        ) : (
          <ActionRow
            {...{
              hideLayout,
              onLayoutChange,
              setShowPreviews,
              onSortChange,
              onStarredFilterChange,
              onTagFilterChange,
              query,
              showPreviews,
            }}
            showStarredFilter
          />
        )}
      </div>
      <PreviewsSystemRequirements
        topSpacing={2}
        bottomSpacing={3}
        showPreviews={showPreviews}
        onRemove={() => setShowPreviews(false)}
      />
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { sm, md } = theme.spacing;
  return {
    wrapper: css`
      display: flex;
      flex-direction: column;
    `,
    rowWrapper: css`
      height: ${theme.height.md}px;
      display: flex;
      justify-content: flex-start;
      gap: ${theme.spacing.md};
      align-items: center;
      margin-bottom: ${sm};

      > label {
        height: 20px;
        margin: 0 ${md} 0 ${sm};
      }
    `,
    checkboxWrapper: css`
      label {
        line-height: 1.2;
        width: max-content;
      }
    `,
  };
});
