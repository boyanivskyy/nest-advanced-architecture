import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmsRepository } from './ports/alarms.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmsRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return this.alarmRepository.save(alarm);
  }

  findAll() {
    return this.alarmRepository.findAll();
  }
}