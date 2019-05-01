import { ID, guid } from '@datorama/akita';
import { ScooterStatus } from './scooter-status-enum';

export interface MarkerModel {
  id?: string;
  thingName: string;
  cuttentTime: Date;
  latitude: number;
  longitude: number;
  mainBatteryChanrge: number;
  cost?: number
  selected?: boolean;
  status?: ScooterStatus;
  dateBooked?: Date;
}

export class MarkerModelDto {
  static get(value: any): MarkerModel {
    return {
      thingName: value.thingName,
      cuttentTime: new Date(value.cuttentTime),
      latitude: value.latitude,
      longitude: value.longtitude,
      mainBatteryChanrge: value.mainBatteryChanrge,
      status: ScooterStatus.Available,
      cost: 0.15
    }
  }
}

export function createMarker(value: Partial<MarkerModel>) {
  return {
    id: guid(),
    thingName: value.thingName,
    cuttentTime: value.cuttentTime,
    latitude: value.latitude,
    longitude: value.longitude,
    mainBatteryChanrge: value.mainBatteryChanrge,
  } as MarkerModel;
}
