import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmsRepository } from 'src/alarms/application/ports/alarms.repository';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class OrmAlarmRepository implements AlarmsRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();

    return entities.map(AlarmMapper.toDomain);
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const entity = await this.alarmRepository.save(
      AlarmMapper.toPersistence(alarm),
    );

    return AlarmMapper.toDomain(entity);
  }
}
