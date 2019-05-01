import { BehaviorSubject } from 'rxjs';
import { RegionModel } from 'src/models/region.model';

export class LocationService {
  public static currentLocation$: BehaviorSubject<RegionModel> = new BehaviorSubject(null);

  public static watchLocation() {
    navigator.geolocation.watchPosition((position) => {
      const prevPosition = this.currentLocation$.getValue();
      const currentPosition = new RegionModel(position.coords.latitude, position.coords.longitude);
      if (!prevPosition ||
        currentPosition.latitude === prevPosition.latitude &&
        currentPosition.longitude === prevPosition.longitude
      ) {
        this.currentLocation$.next(currentPosition);
      }
    }, null);
  }
}
