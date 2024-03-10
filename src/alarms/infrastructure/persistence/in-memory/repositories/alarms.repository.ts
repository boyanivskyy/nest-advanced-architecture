import { Injectable } from '@nestjs/common';
import { AlarmsRepository } from 'src/alarms/application/ports/alarms.repository';
import { AlarmEntity } from '../entities/alarm.entity';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmsRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());

    return entities.map(AlarmMapper.toDomain);
  }

  async save(alarm: Alarm): Promise<Alarm> {
    if (this.alarms.has(alarm.id)) return;

    const entity = AlarmMapper.toPersistence(alarm);
    this.alarms.set(alarm.id, entity);

    return AlarmMapper.toDomain(entity);
  }
}
