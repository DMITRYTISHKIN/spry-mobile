import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import { icons } from 'src/common/helpers';
import Image from 'react-native-remote-svg'
import { ScooterService } from 'src/services/scooter.service';
import { MarkerModel } from 'src/models/marker.model';
import MarkerSvgComponent from 'src/svg/MarkerSvg';
import { StyleSheet } from 'react-native';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface State {
  selectedMarker: MarkerModel
}

export class CurrentMarker extends Component<any, State> {
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

  render() {
    if (!this.state.selectedMarker || this.state.selectedMarker.status === ScooterStatus.Available) {
      return null;
    }

    return (
      <Marker
        coordinate={{
          latitude: this.state.selectedMarker.longitude,
          longitude: this.state.selectedMarker.latitude
        }}
        identifier={this.state.selectedMarker.thingName}
      >
        <MarkerSvgComponent
          lock={this.state.selectedMarker.status === ScooterStatus.Locked}
          selected={true}
        ></MarkerSvgComponent>
      </Marker>
    )
  }
}
