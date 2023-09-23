import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class ProfilesRestService {
  private readonly http = inject(HttpClient);

  public getProfile(id: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(
      `http://localhost:3000/api/profiles?id=${id}`
    );
  }

  public createProfile(body: any): Observable<Profile> {
    return this.http.post<Profile>(`http://localhost:3000/api/profiles`, body);
  }
}
