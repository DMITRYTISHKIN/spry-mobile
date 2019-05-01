import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';

import { MainNavigator } from 'src/screens/main/MainNavigator';
import { ChannaelClientService } from './services/channel/channelClient';

export default class App extends React.Component {
  channaelClientService: ChannaelClientService;

  componentDidMount() {
    this.channaelClientService = new ChannaelClientService();
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
