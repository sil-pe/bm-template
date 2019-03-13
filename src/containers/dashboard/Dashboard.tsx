import * as React from 'react';
import * as settings from 'settings';
import {onOffline, onOnline, onResize} from '../../services/runtime-manager';
import {translate, InjectedTranslateProps} from 'react-i18next';

export type DashboardStateProps = {
  availableWidth: number;
  availableHeight: number;
  isOnline: boolean;
};

export type DashboardDispatchProps = {
  onOnline: () => void;
  onOffline: () => void;
  onResize: () => void;
};
export type DashboardProps = DashboardDispatchProps & DashboardStateProps & InjectedTranslateProps;

class DashboardBase extends React.Component<DashboardProps> {
  constructor(props: DashboardProps) {
    super(props);
    onOnline(() => props.onOnline());
    onOffline(() => props.onOffline());
    onResize(() => props.onResize());
  }

  render() {
    console.log(settings);
    return (
      <div>
        {this.props.t('dashboard.title')}
        <div>
          {this.props.t('runtime.availableWidth')}: {this.props.availableWidth}
        </div>
        <div>
          {this.props.t('runtime.availableHeight')}: {this.props.availableHeight}
        </div>
        <div>
          {this.props.t('runtime.connectivity')}:{' '}
          {this.props.t(this.props.isOnline ? 'runtime.online' : 'runtime.offline')}
        </div>
      </div>
    );
  }
}

export const Dashboard = translate()(DashboardBase);
