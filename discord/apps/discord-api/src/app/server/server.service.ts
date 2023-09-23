import { Injectable } from '@nestjs/common';
import { PrismaClient, Server } from '@prisma/client';
import { Observable, from } from 'rxjs';

const prisma = new PrismaClient();

@Injectable()
export class ServerService {
  public getServer(profileId: string): Observable<Server> {
    return from(
      prisma.server.findFirst({
        where: {
          members: {
            some: {
              profileId: profileId,
            },
          },
        },
      })
    );
  }

  public getServers(): Observable<Server[]> {
    return from(prisma.server.findMany());
  }
}
