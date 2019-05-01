import React from 'react';
import { View } from 'react-native';

const ViewContainer = (props: any) => {
  const { children, hide, style } = props;
  debugger
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};


export default ViewContainer;
