import React from 'react';
import { Text } from 'react-native';

export default class TabBarIcon extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style]}>Test</Text>;
  }
}
