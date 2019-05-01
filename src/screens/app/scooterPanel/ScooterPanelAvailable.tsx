import React, { Component } from 'react';
import { Container, Label, Text, Button as Btn } from 'native-base';

import styled from "styled-components";

import { MarkerModel } from 'src/models/marker.model';
import { View, Dimensions, StyleSheet } from 'react-native';
import Button from "src/components/Button";
import IconButton from 'src/components/IconButton';
import { icons } from 'src/common/helpers';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import QrSvgComponent from 'src/svg/QrSvg';
import { QR_SCANNER } from '../AppConstants';

interface State {
}

interface Props {
  scooter: MarkerModel;
  navigation: any;
  onBegin: (scooter: MarkerModel) => void;
}

export default class ScooterPanelAvailable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.scooter) {
      return null;
    }

    return (
      <PanelContainer>
        <ExpandButton></ExpandButton>
        <ScooterInfo>
          <ScooterInfoItem>
            <LabelInfo>Battery</LabelInfo>
            <Text>{ this.props.scooter.mainBatteryChanrge }</Text>
          </ScooterInfoItem>
          <ScooterInfoItem>
            <LabelInfo>Rate per min.</LabelInfo>
            <Text>1,95 €</Text>
          </ScooterInfoItem>
          <ScooterInfoItem>
            <LabelInfo>Scooter</LabelInfo>
            <Text>000023</Text>
          </ScooterInfoItem>
        </ScooterInfo>
        <ScooterInfo>
          <RentButton
            onPress={() => this.props.onBegin(this.props.scooter)}
            width={Dimensions.get('window').width - 52 - 50 - 30}
          >
            <RentButtonText>Start rent</RentButtonText>
          </RentButton>
          <IconButton style={styles.qrIcon} onPress={() => { this.props.navigation.navigate(QR_SCANNER); }}>
            <QrSvgComponent></QrSvgComponent>
          </IconButton>
        </ScooterInfo>
      </PanelContainer>
    );
  }
}

const ExpandButton = styled(Btn)`
  height: 0px;
  width: 60px;
  padding: 0;
  borderColor: #DFDFDF;
  borderStyle: solid;
  borderWidth: 2px;
  margin: 3px auto 10px auto;
  borderRadius: 15px;
`

const styles = StyleSheet.create({
  qrIcon: {
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 0
  }
})

const LabelInfo = styled(Label)`
  color: #838383;
`

const ScooterInfo = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
`

const ScooterInfoItem = styled(View)`
`

const PanelContainer = styled(Container)`
  width: 100%;
  height: auto;
  background: #FFF;
  z-index: 999;
  padding: 10px 25px;
  borderTopLeftRadius: 25px;
  borderTopRightRadius: 25px;
  shadowColor: #00000030;
  shadowRadius: 11;
  shadowOpacity: 1;
`;

const RentButton = styled(Button)`
  background: #007AFF;
  display: flex;
  margin-right: 25px;
`;

const RentButtonText = styled(Text)`
  font-size: 25px
`
