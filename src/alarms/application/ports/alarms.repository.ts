import { Alarm } from 'src/alarms/domain/alarm';

export abstract class AlarmsRepository {
  abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
