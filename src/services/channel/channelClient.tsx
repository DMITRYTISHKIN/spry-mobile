import io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { MarkerModel, MarkerModelDto } from 'src/models/marker.model';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, Alert } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export class ChannaelClientService {
  private readonly URL = 'ws://ec2-54-93-232-143.eu-central-1.compute.amazonaws.com/customer';
  private readonly CONFIG = {
    jsonp: false,
    reconnection: true,
    reconnectionAttempts: 32,
    reconnectionDelay: 50,
    reconnectionDelayMax: 30000,
    timeout: 2000,
    transports: ['websocket', 'polling']
  };

  public static channel$: BehaviorSubject<MarkerModel[]> = new BehaviorSubject(null);

  public socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.URL, this.CONFIG);
    this.socket.on('connect', (data) => {
      console.log('Client Connected');
    });
    this.socket.on('message', (data) => {
      console.log('Client Message ', data);

      ChannaelClientService.channel$.next(
        data
          .filter((item => item.mainBatteryChanrge))
          .map(item => MarkerModelDto.get(item))
      );
    });
    this.socket.on('disconnect', () => {
      console.log('Client Disconnected');
    });
    this.socket.on('error', (error) => {
      console.log(error);
    });
  }

  start() {

  }
}
