import React from "react";
import styled from "styled-components";
import { Input, Item, Label, View } from "native-base";

// components
import { Text } from "src/components/Typography";

const ErrorMessage = styled(Text)`
  color: tomato;
  position: absolute;
  right: 0;
  bottom: 15px;
`;

const InputHolder = styled(View)`
  margin-bottom: ${props => (props.multi ? 10 : 0)}px;
  width: 100%;
`;

export default function TextInput(props: any) {
  return (
    <InputHolder multi={props.multi} style={props.styleHolder}>
      <Item error={!!props.error} stackedLabel={props.stackedLabel}>
        <Label>{props.label}</Label>
        <Input
          style={props.style}
          onChangeText={props.onChangeText}
          value={props.value}
          label={props.label}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          autoFocus={props.autoFocus}
        />
      </Item>
      <ErrorMessage>{props.error}</ErrorMessage>
    </InputHolder>
  );
}
