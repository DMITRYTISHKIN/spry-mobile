import React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
import { View } from 'react-native';
import styled from "styled-components/native";

const Marker = styled.View`
  background-color: #007AFF;
  border-style: solid;
  border-width: 3px;
  padding: 5px;
  border-radius: 100;
  shadow-color: #000;
  shadow-opacity: 1;
  shadow-radius: 2;
  shadow-offset: 0px 0px;
`;

const MarkerContainer = styled.View`
  padding: 5px;
`;

interface Props {
  lock?: boolean;
  selected?: boolean;
  fill?: string
}

const MarkerSvgComponent = (props: Props) => (
  <MarkerContainer>
    <Marker style={{
      backgroundColor: props.lock ? 'red' : '#007AFF',
      borderColor: props.selected ? 'black' : 'transparent'
    }}>
      <Svg width={14} height={13} fill="none" {...props}>
        <Rect x={0.5} y={10.5} width={2} height={2} rx={1} stroke="#fff" />
        <Rect x={11.5} y={10.5} width={2} height={2} rx={1} stroke="#fff" />
        <Path d="M2 11.75h7.698L12.5 9" stroke="#fff" strokeWidth={0.7} />
        <Path
          d="M12.5 1.5V10M10 2.5L13.5 1"
          stroke="#fff"
          strokeWidth={0.7}
          strokeLinecap="round"
        />
      </Svg>
    </Marker>
  </MarkerContainer>
)

export default MarkerSvgComponent
