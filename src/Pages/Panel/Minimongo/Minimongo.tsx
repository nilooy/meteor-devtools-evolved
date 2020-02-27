import { usePanelStore } from '@/Stores/PanelStore';
import { Hideable } from '@/Utils/Hideable';
import { ObjectTree } from '@/Utils/ObjectTree';
import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import { StatusBar } from '../../Layout/StatusBar';

interface Props {
  isVisible: boolean;
}

export const Minimongo: FunctionComponent<Props> = observer(({ isVisible }) => {
  const { minimongoStore } = usePanelStore();

  const isActiveCollectionMissing =
    minimongoStore.activeCollection &&
    !(minimongoStore.activeCollection in minimongoStore.collections);

  if (isActiveCollectionMissing) {
    minimongoStore.setActiveCollection(null);
  }

  return (
    <Hideable isVisible={isVisible}>
      {minimongoStore.activeCollectionDocuments.paginated.map(
        (document: Document) => (
          <ObjectTree key={document._id} object={document} />
        ),
      )}

      <StatusBar>
        <div style={{ marginRight: 'auto' }}>
          <Popover
            content={
              <Menu>
                {minimongoStore.collectionNames.map(key => (
                  <MenuItem
                    key={key}
                    icon='database'
                    text={key}
                    active={minimongoStore.activeCollection === key}
                    onClick={() => minimongoStore.setActiveCollection(key)}
                  />
                ))}
              </Menu>
            }
            position={Position.TOP_RIGHT}
            disabled={!minimongoStore.collectionNames.length}
          >
            <Button
              icon={minimongoStore.activeCollection ? 'database' : null}
              text={minimongoStore.activeCollection || 'Select Collection'}
              disabled={!minimongoStore.collectionNames.length}
            />
          </Popover>
        </div>
      </StatusBar>
    </Hideable>
  );
});
