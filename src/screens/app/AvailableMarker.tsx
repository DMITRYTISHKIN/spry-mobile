import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import { icons } from 'src/common/helpers';
import Image from 'react-native-remote-svg'
import { ScooterService } from 'src/services/scooter.service';
import { MarkerModel } from 'src/models/marker.model';
import MarkerSvgComponent from 'src/svg/MarkerSvg';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface State {
  isSelected: boolean;
}

interface Props {
  scooter: MarkerModel;
}

export class AvailableMarker extends Component<any, State> {
  private destroy: Subject<void> = new Subject();

  constructor(props: any) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  componentDidMount() {
    ScooterService.currentMarker$.pipe(
      takeUntil(this.destroy),
      filter((scooter) => scooter && this.props.scooter.thingName === scooter.thingName || !scooter),
    ).subscribe((scooter) => {
      if (scooter) {
        this.setState({ isSelected: scooter.selected });
      } else {
        this.setState({ isSelected: false });
      }
    });
  }

  componentWillUnmount() {
    this.destroy.next();
    this.destroy.complete();
  }

  render() {
    if (!this.props.scooter) {
      return null;
    }

    return (
      <MarkerSvgComponent
        selected={this.state.isSelected}
      ></MarkerSvgComponent>
    )
  }
}
