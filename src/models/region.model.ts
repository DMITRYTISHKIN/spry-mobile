export class RegionModel {
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
