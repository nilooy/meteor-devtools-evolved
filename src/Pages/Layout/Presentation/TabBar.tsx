import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { IconName } from '@blueprintjs/core';
import classnames from 'classnames';
import { Button } from './Button';
import { lighten } from 'polished';
import { NAVBAR_HEIGHT } from '@/Styles/Constants';

const backgroundColor = '#202b33';

const TabBarWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  height: ${NAVBAR_HEIGHT}px;
  width: 100%;
  border-bottom: 1px solid ${lighten(0.1, backgroundColor)};

  background-color: ${backgroundColor};

  button.tab {
    &.active {
      background-color: ${lighten(0.1, backgroundColor)};
    }

    &:hover:not(.active) {
      background-color: ${lighten(0.05, backgroundColor)};
    }
  }

  .right-menu {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    button.menu-item {
      &:hover {
        background-color: ${lighten(0.05, backgroundColor)};
      }
    }
  }
`;

export interface ITab {
  key: string;
  content: JSX.Element | string;
  icon: IconName;
  handler?: () => void;
}

export interface IMenuItem {
  key: string;
  content: JSX.Element | string;
  icon: IconName;
  handler: () => void;
}

interface Props {
  tabs: ITab[];
  menu?: IMenuItem[];
  onChange?: (key: string) => void;
}

export const TabBar: FunctionComponent<Props> = ({ tabs, menu, onChange }) => {
  const [activeKey, setKey] = useState(tabs[0].key);

  return (
    <TabBarWrapper>
      {tabs.map(tab => (
        <Button
          key={tab.key}
          onClick={() => {
            setKey(tab.key);
            onChange && onChange(tab.key);
            tab.handler && tab.handler();
          }}
          className={classnames('tab', {
            active: activeKey === tab.key,
          })}
          icon={tab.icon}
        >
          {tab.content}
        </Button>
      ))}

      <div className='right-menu'>
        {menu &&
          menu.map(item => (
            <Button
              key={item.key}
              className='menu-item'
              onClick={item.handler}
              icon={item.icon}
            >
              {item.content}
            </Button>
          ))}
      </div>
    </TabBarWrapper>
  );
};