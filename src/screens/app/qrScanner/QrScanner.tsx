'use strict';

import React, { Component } from 'react';
import Torch from 'react-native-torch';
import { StyleSheet, Dimensions, View, Alert } from 'react-native';
import { Container } from "src/components/Layout";
import styled from "styled-components";
import IconButton from "src/components/IconButton";

import QRCodeScanner from 'react-native-qrcode-scanner';
import { HOME } from '../AppConstants';
import QrScannerMarker from './QrScannerMarker';
import QrScannerNumber from './QrScannerNumber';

const ScannerContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
  background: #999
`;

const Actions = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 120px;
  justify-content: center;
`;

const { width, height } = Dimensions.get("window");

interface State {
  icon: string,
  mode: Mode
}

enum Mode {
  qrCode = "qr-scanner",
  number = "keypad"
}

export default class QrScanner extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: Mode.qrCode,
      icon: "keypad"
    };
  }

  static navigationOptions = {
    drawerLabel: "QrScanner"
  };
  torchArtive = false;

  onSuccess(e) {
    Alert.alert(e);
  }

  render() {
    return (
      <ScannerContainer>
        <IconButton
          iconName="close"
          styleIcon={styles.buttonCloseIcon}
          style={styles.buttonClose}
          onPress={() => this.props.navigation.navigate(HOME)}
        />
        { this.state.mode === Mode.qrCode ?
          <QrScannerMarker /> :
          <QrScannerNumber navigation={this.props.navigation}/>
        }
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topViewStyle={styles.zeroContainer}
          cameraStyle={styles.cameraContainer}
          showMarker={true}
          markerStyle={styles.markerStyle}
        />
        <Actions>
          <IconButton
            style={{ margin: 20 }}
            iconName={this.state.icon}
            onPress={() => {
              let icon = this.state.mode === Mode.number ? Mode.qrCode : Mode.number;
              this.setState({ mode: icon, icon: this.state.mode })
            }}
          />
          <IconButton
            style={{ margin: 20 }}
            iconName="bulb"
            onPress={() => {
              this.torchArtive = !this.torchArtive;
              Torch.switchState(this.torchArtive);
            }}
          />
        </Actions>
      </ScannerContainer>
    );
  }
}

const sizeMarker = 250;

const styles = StyleSheet.create({
  cursorScanner: {
    position: 'absolute',
    zIndex: 999,
    top: (height / 2) - (sizeMarker / 2) - 1,
    left: (width / 2) - (sizeMarker / 2) - 1,
    width: sizeMarker + 2,
    height: sizeMarker + 2
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonClose: {
    position: "absolute",
    zIndex: 1,
    left: 15,
    top: 40,
    backgroundColor: "transparent"
  },
  buttonCloseIcon: {
    color: '#fff',
    fontSize: 52,
  },
  markerStyle: {
    borderColor: 'rgba(0,0,0,0.5)',
    borderStyle: 'solid',
    borderWidth: 10,
    borderLeftWidth: (width / 2) - (sizeMarker / 2),
    borderRightWidth: (width / 2) - (sizeMarker / 2),
    borderTopWidth: (height / 2) - (sizeMarker / 2),
    borderBottomWidth: (height / 2) - (sizeMarker / 2),
    width: width,
    height: height
  },
  cameraContainer: {
    height: height,
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
});
