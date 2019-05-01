import ViewContainer from 'src/components/ViewContainer';
import React from 'react';
import { View, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");
const widthCorner = 2;
const sizeMarker = 250;
const blockCorner = {
  position: 'absolute',
  borderColor: '#fff',
  borderStyle: 'solid',
  width: 20,
  height: 20,
  borderRadius: 2
}

export default function QrScannerMarker() {
  return (
    <View style={styles.cursorScanner}>
      <Text style={styles.centerText}>{ "Hover scanner on\nscooter QR code" }</Text>
      <View style={styles.blockLeftTop}></View>
      <View style={styles.blockRightTop}></View>
      <View style={styles.blockLeftBottom}></View>
      <View style={styles.blockRightBottom}></View>
    </View>
  );
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: -100,
    width: '100%',
    zIndex: 999,
  },
  cursorScanner: {
    position: 'absolute',
    zIndex: 999,
    top: (height / 2) - (sizeMarker / 2) - 1,
    left: (width / 2) - (sizeMarker / 2) - 1,
    width: sizeMarker + 2,
    height: sizeMarker + 2
  },
  blockLeftTop: Object.assign({}, blockCorner, {
    top: 0,
    left: 0,
    borderLeftWidth: widthCorner,
    borderTopWidth: widthCorner
  }),
  blockRightTop: Object.assign({}, blockCorner, {
    top: 0,
    right: 0,
    borderRightWidth: widthCorner,
    borderTopWidth: widthCorner
  }),
  blockLeftBottom: Object.assign({}, blockCorner, {
    bottom: 0,
    left: 0,
    borderLeftWidth: widthCorner,
    borderBottomWidth: widthCorner
  }),
  blockRightBottom: Object.assign({}, blockCorner, {
    bottom: 0,
    right: 0,
    borderRightWidth: widthCorner,
    borderBottomWidth: widthCorner
  }),
  cameraContainer: {
    height: height,
  },
});
