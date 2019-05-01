import { QueryEntity } from '@datorama/akita';
import { MarkersStore, MarkerState } from './markersStore';
import { MarkerModel } from 'src/models/marker.model';

export class MarkersQuery extends QueryEntity<MarkerState, MarkerModel> {
  getMarker$ = this.selectAll();
  constructor(protected store: MarkersStore) {
    super(store);
  }
}
