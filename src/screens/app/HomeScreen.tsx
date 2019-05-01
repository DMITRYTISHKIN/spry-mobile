import React, { Component } from "react";
import { Dimensions, Alert, Platform, PermissionsAndroid } from "react-native";
import styled from "styled-components/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { Container } from "src/components/Layout";
import IconButton from "src/components/IconButton";
import { QR_SCANNER } from "./AppConstants";
import { ChannaelClientService } from 'src/services/channel/channelClient';
import { MarkerModel } from 'src/models/marker.model';
import { filter, combineLatest, takeUntil } from "rxjs/operators";
import Image from 'react-native-remote-svg'
import ScooterPanel from './scooterPanel/ScooterPanel';
import { icons } from 'src/common/helpers';
import { RegionModel } from 'src/models/region.model';
import { Subject } from 'rxjs';
import { ScooterService } from 'src/services/scooter.service';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import { CurrentMarker } from './CurrentMarker';
import MarkerSvgComponent from 'src/svg/MarkerSvg';
import { AvailableMarker } from './AvailableMarker';

const MapContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
`;

const Map = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Actions = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 120px;
  justify-content: center;
`;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface State {
  region: RegionModel;
  markers: MarkerModel[];
  isRent: boolean;
  currentPosition: { latitude: number, longitude: number };
}

export default class HomeScreen extends Component<any, State> {
  private destroy: Subject<void> = new Subject();
  public currentPostionReady: Subject<void> = new Subject();
  public mapsReady: Subject<void> = new Subject();

  public map: MapView;
  public watchID: any;

  static navigationOptions = {
    drawerLabel: "Home"
  };

  constructor(props: any) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      isRent: false,
      currentPosition: null
    };
  }

  componentDidMount() {
    const marker = ScooterService.currentMarker$.getValue();
    if (marker) {
      const region = {
        latitude: marker.longitude,
        longitude: marker.latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.mapsReady.subscribe(() => {
        this.map.animateToRegion(region);
      });
    } else {
      this.currentPostionReady.pipe(
        takeUntil(this.destroy),
        combineLatest(this.mapsReady)
      ).subscribe(_ => {
        this.goToCurrent();
      });
    }

    ScooterService.statusRent$.pipe(
      takeUntil(this.destroy)
    ).subscribe((bool) => {
      this.setState({ isRent: bool });
    });

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted) this.watchLocation();
        });
    } else {
      this.watchLocation();
    }

    ChannaelClientService.channel$.pipe(
      takeUntil(this.destroy),
      filter(item => item !== null)
    ).subscribe((markers) => {
      this.setState({ markers });
    });
  }

  componentWillUnmount() {
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
    this.destroy.next();
    this.destroy.complete();
  }

  goToCurrent = () => {
    if (this.state.currentPosition) {
      const region = {
        latitude: this.state.currentPosition.latitude,
        longitude: this.state.currentPosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.map.animateToRegion(region, 1);
    }
  }

  selectedScooter(e) {
    const scooter = this.state.markers.find(marker => marker.thingName === e.nativeEvent.id);
    scooter.selected = true;
    ScooterService.currentMarker$.next(scooter);
    this.map.fitToSuppliedMarkers([scooter.thingName]);
  }

  onMapReady = (e) => {
    this.mapsReady.next();
  };

  watchLocation() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const prevPosition = this.state.currentPosition;
      const currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      if (!prevPosition ||
        currentPosition.latitude === prevPosition.latitude &&
        currentPosition.longitude === prevPosition.longitude
      ) {
        this.setState({ currentPosition });
        if (!prevPosition) {
          this.currentPostionReady.next();
        }
      }
    }, null);
  }

  render() {
    return (
      <MapContainer>
        <IconButton
          iconName="menu"
          style={{ position: "absolute", zIndex: 1, left: 15, top: 40 }}
          onPress={this.props.navigation.toggleDrawer}
        />
        <Map
          ref={ map => { this.map = map }}
          onMapReady={this.onMapReady}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          initialRegion={this.state.region}
          provider={PROVIDER_GOOGLE}
          onPress={(e) => {
            if (e.nativeEvent.action !== 'marker-press') {
              ScooterService.deselectScooter();
            }
          }}
        >
        {this.state.isRent ? null :
        this.state.markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: marker.longitude,
              longitude: marker.latitude
            }}
            identifier={marker.thingName}
            onPress={this.selectedScooter.bind(this)}
          >
            <AvailableMarker
              scooter={marker}
            ></AvailableMarker>
          </Marker>
        ))}
        <CurrentMarker></CurrentMarker>
        </Map>
        <Actions>
          <IconButton
            style={{ margin: 20 }}
            iconName="qr-scanner"
            onPress={() => {
              this.props.navigation.navigate(QR_SCANNER);
            }}
          />
          <IconButton
            style={{ margin: 20 }}
            iconName="navigate"
            onPress={() => {
              this.goToCurrent();
            }}
          />
        </Actions>
        <ScooterPanel navigation={this.props.navigation}></ScooterPanel>
      </MapContainer>
    );
  }
}
