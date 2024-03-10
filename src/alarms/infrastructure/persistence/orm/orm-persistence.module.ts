import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmsRepository } from 'src/alarms/application/ports/alarms.repository';
import { OrmAlarmRepository } from './repositories/alarms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmsRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmsRepository],
})
export class OrmAlarmPersistenceModule {}
