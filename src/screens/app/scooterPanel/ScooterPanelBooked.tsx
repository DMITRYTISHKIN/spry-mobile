
import React, { Component } from 'react';
import { Container, Label, Text, Button as Btn } from 'native-base';

import styled from "styled-components";

import { MarkerModel } from 'src/models/marker.model';
import { View, Dimensions, StyleSheet } from 'react-native';
import Button from "src/components/Button";
import IconButton from 'src/components/IconButton';
import { icons } from 'src/common/helpers';
import { ScooterStatus } from 'src/models/scooter-status-enum';
import LockSvgComponent from 'src/svg/LockSvg';
import UnlockSvgComponent from 'src/svg/UnlockSvg';
import Timer from 'src/components/Timer';

interface State {
}

interface Props {
  scooter: MarkerModel,
  onLock: (scooter: MarkerModel) => void;
  onEnd: (scooter: MarkerModel) => void;
}

export default class ScooterPanelBooked extends Component<Props, State> {
  lockIcon = <LockSvgComponent></LockSvgComponent>;
  unlockIcon = <UnlockSvgComponent></UnlockSvgComponent>;

  constructor(props: Props) {
    super(props);
  }

  timeTimerFn() {
    const time = new Date().getTime() - this.props.scooter.dateBooked.getTime();
    let h = Math.floor(((((time / 1000)) / 60) / 60) & 60).toString();
    h = h.length === 1 ? `0${h}` : h;
    let m = Math.floor(((time / 1000) / 60) % 60).toString();
    m = m.length === 1 ? `0${m}` : m;
    let s = Math.floor((time / 1000) % 60).toString();
    s = s.length === 1 ? `0${s}` : s;
    return `${h}:${m}:${s}`;
  }

  costTimerFn() {
    const time = new Date().getTime() - this.props.scooter.dateBooked.getTime();
    let m = Math.ceil((time / 1000) / 60);
    return `${(this.props.scooter.cost * m).toLocaleString()} €`;
  }

  render() {
    if (!this.props.scooter || this.props.scooter.status === ScooterStatus.Available) {
      return null;
    }

    let iconLock;
    if (this.props.scooter.status === ScooterStatus.Locked) {
      iconLock = this.lockIcon;
    } else {
      iconLock = this.unlockIcon;
    }

    return (
      <PanelContainer>
        {this.props.scooter.status === ScooterStatus.Locked ? <LockText>Scooter is locked</LockText> : null}
        <ScooterInfo>
          <Timer style={styles.constText} fn={this.costTimerFn.bind(this)} timeout={1000}></Timer>
          <IconButton
            style={styles.qrIcon}
            onPress={() => this.props.onLock(this.props.scooter)}
          >
            { iconLock }
          </IconButton>
        </ScooterInfo>
        <ScooterInfo>
          <ScooterInfoItem>
            <LabelInfo>Time</LabelInfo>
            <Timer fn={this.timeTimerFn.bind(this)} timeout={900}></Timer>
          </ScooterInfoItem>
          <ScooterInfoItem>
            <LabelInfo>Scooter</LabelInfo>
            <Text>000023</Text>
          </ScooterInfoItem>
          <ScooterInfoItem style={{ justifyAlign: 'right' }}>
            <LabelInfo>Battery</LabelInfo>
            <Text>{ this.props.scooter.mainBatteryChanrge }</Text>
          </ScooterInfoItem>
        </ScooterInfo>
        <ScooterInfo>
          <RentButton
            onPress={() => this.props.onEnd(this.props.scooter)}
          >
            <RentButtonText>End rent</RentButtonText>
          </RentButton>
        </ScooterInfo>
      </PanelContainer>
    );
  }
}

const styles = StyleSheet.create({
  qrIcon: {
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 0
  },
  constText: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

const LockText = styled(Text)`
  color: red;
`;

const LabelInfo = styled(Label)`
  color: #838383;
`;

const ScooterInfo = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 100%;
  justify-content: space-between;
`;

const ScooterInfoItem = styled(View)`
  min-width: 30%;
`

const PanelContainer = styled(Container)`
  width: 100%;
  height: auto;
  background: #FFF;
  z-index: 999;
  padding: 10px 25px;
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
  font-size: 25px;
`;
