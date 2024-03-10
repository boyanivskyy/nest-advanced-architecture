import { Module } from '@nestjs/common';
import { AlarmsRepository } from 'src/alarms/application/ports/alarms.repository';
import { InMemoryAlarmRepository } from './repositories/alarms.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmsRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmsRepository],
})
export class InMemoryAlarmPersistenceModule {}
