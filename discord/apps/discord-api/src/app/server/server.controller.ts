import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
  constructor(private serverService: ServerService) {}

  @Get(':id')
  public getServer(@Param('id') id: string) {
    return this.serverService.getServer(id);
  }

  @Get()
  public getServers() {
    return this.serverService.getServers();
  }

  // @Post()
  // public createServer(@Body() createServerDto: any) {
  //   return this.serverService.createServer(createServerDto);
  // }
}
