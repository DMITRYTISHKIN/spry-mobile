import { BehaviorSubject } from 'rxjs';
import { MarkerModel } from 'src/models/marker.model';
import { ScooterStatus } from 'src/models/scooter-status-enum';

export class ScooterService {
  public static currentMarker$: BehaviorSubject<MarkerModel> = new BehaviorSubject(null);
  public static statusRent$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private static _setStatus(
    status: ScooterStatus,
    scooter: MarkerModel = ScooterService.currentMarker$.getValue()
  ): void {
    if (!scooter) {
      return;
    }
    scooter.status = status;
    ScooterService.currentMarker$.next(scooter);
  }

  public static endRent(): void {
    const scooter = ScooterService.currentMarker$.getValue();
    if (!scooter) {
      return;
    }
    scooter.dateBooked = null;
    ScooterService._setStatus(ScooterStatus.Available, scooter);
    ScooterService.statusRent$.next(false);
  }

  public static startRent(): void {
    const scooter = ScooterService.currentMarker$.getValue();
    if (!scooter) {
      return;
    }
    scooter.dateBooked = new Date();
    ScooterService._setStatus(ScooterStatus.Booked, scooter);
    ScooterService.statusRent$.next(true);
  }

  public static toggleLocked(): void {
    const scooter = ScooterService.currentMarker$.getValue();

    if (scooter.status === ScooterStatus.Locked) {
      ScooterService._setStatus(ScooterStatus.Booked);
    } else {
      ScooterService._setStatus(ScooterStatus.Locked);
    }
  }

  public static selectScooter(): void {
    const scooter = ScooterService.currentMarker$.getValue();
    if (!scooter) {
      return;
    }
    if (scooter.status === ScooterStatus.Available) {
      scooter.selected = true;
      ScooterService.currentMarker$.next(scooter);
    }
  }

  public static deselectScooter(): void {
    const scooter = ScooterService.currentMarker$.getValue();
    if (!scooter) {
      return;
    }
    if (scooter.status === ScooterStatus.Available) {
      scooter.selected = false;
      ScooterService.currentMarker$.next(null);
    }
  }
}
