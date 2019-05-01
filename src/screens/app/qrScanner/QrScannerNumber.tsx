import React from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text } from 'react-native';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import { APP_FLOW } from 'src/screens/main/MainConstants';
import { ScooterService } from 'src/services/scooter.service';
import { ChannaelClientService } from 'src/services/channel/channelClient';
import { HOME } from '../AppConstants';

const { width, height } = Dimensions.get("window");
const sizeMarker = 250;



export default function QrScannerNumber(props: any) {
  const search = () => {
    const marker = ChannaelClientService.channel$.getValue();
    ScooterService.currentMarker$.next(marker[0]);
    ScooterService.selectScooter();
    props.navigation.navigate(HOME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>{ "Enter the number\nspecified on the scooter" }</Text>
      <ScrollView style={styles.numberStyle}>
        <View style={styles.numberContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Number"
            keyboardType="number-pad"
            autoFocus
          />
          <Button style={{backgroundColor: 'transparent'}} onPress={search.bind(this)}>
            <Text style={{color: '#007AFF'}}>Search</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    left: (width / 2) - (sizeMarker / 2),
    top: (height / 2) - (sizeMarker / 2),
    position: 'absolute',
    zIndex: 999,
    width: sizeMarker,
    height: sizeMarker,
  },
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
  numberStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textInput: {
    fontSize: 22
  },
  numberContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
    overflow: 'hidden'
  },
});
