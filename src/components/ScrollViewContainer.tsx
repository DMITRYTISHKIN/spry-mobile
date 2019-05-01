import React from 'react';
import {
  ScrollView,
} from 'react-native';

const ScrollViewContainer = (props: any) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <ScrollView {...this.props} style={style}>
      { children }
    </ScrollView>
  );
};


export default ScrollViewContainer;
