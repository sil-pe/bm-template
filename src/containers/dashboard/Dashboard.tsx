import * as React from 'react';
import {ContentDialogTypes} from 'components/';
import * as settings from 'settings';
import {onOffline, onOnline, onResize} from '../../services/runtime-manager';

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
export type DashboardProps = DashboardDispatchProps & DashboardStateProps;

export class Dashboard extends React.Component<DashboardProps> {
  constructor(props: DashboardProps) {
    super(props);
    onOnline(() => props.onOnline());
    onOffline(() => props.onOffline());
    onResize(() => props.onResize());
  }

  render() {
    console.log(settings);
    return (
      <div>Hello world
        <div>AvailableWidth: {this.props.availableWidth}</div>
        <div>availableHeight: {this.props.availableHeight}</div>
        <div>isOnline:{this.props.isOnline ? 'Online' : 'Offline'}</div>
      </div>
    );
  }
}
