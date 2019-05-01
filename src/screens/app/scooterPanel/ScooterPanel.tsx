import React, { Component } from 'react';
import { Container, View } from 'native-base';

import styled from "styled-components";
import SlidingUpPanel from 'rn-sliding-up-panel';

import { MarkerModel } from 'src/models/marker.model';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import ScooterPanelAvailable from './ScooterPanelAvailable';
import ScooterPanelBooked from './ScooterPanelBooked';
import { ScooterService } from 'src/services/scooter.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface State {
  selectedMarker: MarkerModel
}

interface Props {
  navigation
}

export default class ScooterPanel extends Component<Props, State> {
  private destroy: Subject<void> = new Subject();

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMarker: null
    };
  }

  componentDidMount() {
    ScooterService.currentMarker$.pipe(
      takeUntil(this.destroy)
    ).subscribe((scooter) => {
      this.setState({ selectedMarker: scooter });
    });
  }

  componentWillUnmount() {
    this.destroy.next();
    this.destroy.complete();
  }

  onBegin(e) {
    ScooterService.startRent();
  }

  onEnd(e) {
    ScooterService.endRent();
  }

  onLock(e) {
    ScooterService.toggleLocked();
  }

  onDeselect(e) {
    ScooterService.deselectScooter();
  }

  render() {
    if (!this.state.selectedMarker) {
      return null;
    }

    if (this.state.selectedMarker.status === ScooterStatus.Available) {
      return (
        <SlidingUpPanel
          visible={!!this.state.selectedMarker}
          onRequestClose={this.onDeselect.bind(this)}
          showBackdrop={false}
          height={300}
          draggableRange={{top: 180, bottom: 0}}
        >
          <ScooterPanelAvailable
            navigation={this.props.navigation}
            scooter={this.state.selectedMarker}
            onBegin={this.onBegin.bind(this)}
          ></ScooterPanelAvailable>
        </SlidingUpPanel>);
    } else {
      return (
        <PanelContainer>
          <ScooterPanelBooked
            scooter={this.state.selectedMarker}
            onEnd={this.onEnd.bind(this)}
            onLock={this.onLock.bind(this)}
          ></ScooterPanelBooked>
        </PanelContainer>);
    };
  }
}

const PanelContainer = styled(Container)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  z-index: 999;
  background: transparent;
`;
