import { Injectable } from '@nestjs/common';
import { PrismaClient, Profile } from '@prisma/client';
import { Observable, from } from 'rxjs';

const prisma = new PrismaClient();

@Injectable()
export class ProfilesService {
  public createProfile(body: any): Observable<Profile> {
    return from(
      prisma.profile.create({
        data: {
          userId: body.uid,
          name: body.displayName || '',
          imageUrl: body.photoURL || '',
          email: body.email || '',
        },
      })
    );
  }

  public getProfile(id: string): Observable<Profile> {
    return from(
      prisma.profile.findUnique({
        where: {
          userId: id,
        },
      })
    );
  }

  public getProfiles(): Observable<Profile[]> {
    return from(prisma.profile.findMany());
  }
}
