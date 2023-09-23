import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  public createProfile(@Body() createProfileDto: any) {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get(':id')
  public getProfile(@Param('id') id: string) {
    return this.profilesService.getProfile(id);
  }

  @Get()
  public getProfiles() {
    return this.profilesService.getProfiles();
  }
}
