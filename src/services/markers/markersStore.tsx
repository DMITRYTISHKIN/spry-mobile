import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MarkerModel } from 'src/models/marker.model';

export interface MarkerState extends EntityState<MarkerModel> {}

@StoreConfig({ name: 'markers' })
export class MarkersStore extends EntityStore<MarkerState, MarkerModel> {
  constructor() {
    super();
  }
}
