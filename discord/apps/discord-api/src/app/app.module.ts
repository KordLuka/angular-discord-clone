import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { ServerController } from './server/server.controller';
import { ServerService } from './server/server.service';

@Module({
  imports: [],
  controllers: [AppController, ProfilesController, ServerController],
  providers: [AppService, ProfilesService, ServerService],
})
export class AppModule {}
