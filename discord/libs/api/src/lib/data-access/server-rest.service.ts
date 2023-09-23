import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Server } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class ServerRestService {
  private readonly http = inject(HttpClient);

  public getServer(profileId: string): Observable<Server> {
    return this.http
      .get<Server[]>(`http://localhost:3000/api/server?id=${profileId}`)
      .pipe(map(servers => servers?.[0]));
  }

  public getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(`http://localhost:3000/api/server`);
  }
}
