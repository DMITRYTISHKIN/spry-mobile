import { MarkerModel, createMarker } from 'src/models/marker.model';
import { MarkersStore } from './markersStore';


export class MarkersService {
  constructor(
    private markersStore: MarkersStore
  ) {}

  add(value: Partial<MarkerModel>) {
    const marker = createMarker(value);
    this.markersStore.add(marker);
  }

  public getDataStream() {

  }
}
