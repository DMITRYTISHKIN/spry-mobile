import React from "react";
import styled from "styled-components";
import { KeyboardAvoidingView } from "react-native";
import { Button as NBButton } from "native-base";

const Btn = styled(NBButton)`
  justify-content: center;
  display: flex;
  align-self: center;
  height: 58;
  width: 100%;
`;

export interface Props {
  onPress: () => any;
  children: any
  hide: boolean;
  width: string;
}

export default function Button(props) {
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={110}
      style={{ width: props.width || "100%" }}
    >
      <Btn rounded onPress={props.onPress} style={props.style}>
        {props.children}
      </Btn>
    </KeyboardAvoidingView>
  );
}
