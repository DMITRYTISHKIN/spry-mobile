import React from "react";
import styled from "styled-components";
import { Button as NBButton, Icon as NBIcon } from "native-base";
import Image from 'react-native-remote-svg'

const Btn = styled(NBButton)`
  background: #fff;
  border-radius: 50px;
  height: 52px;
  width: 52px;
  shadow-color: #999;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  justify-content: center;
  display: flex;
  align-self: center;
`;

const Icon = styled(NBIcon)`
  font-size: 24px;
  color: #007aff;
  z-index: 1;
`;

export default function IconButton(props: any) {
  let icon;
  if (props.iconName) {
    icon = <Icon name={props.iconName} style={props.styleIcon} />;
  }

  if (props.source) {
    icon = <Image source={props.source} style={props.styleIcon}></Image>
  }

  if (props.children) {
    icon = props.children;
  }

  return (
    <Btn transparent style={props.style} onPress={props.onPress}>
      { icon }
    </Btn>
  );
}
