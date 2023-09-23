import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { InitService } from '../../data-access/init.service';
import { SpinnerComponent } from '@discord/shared-ui';
import { switchMap, tap } from 'rxjs';
import { Server } from '@prisma/client';

@Component({
  selector: 'discord-init',
  standalone: true,
  imports: [CommonModule, NgIf, SpinnerComponent],
  templateUrl: './init.component.html',
})
export class InitComponent {
  private readonly initService = inject(InitService);
  public isLoading = this.initService.isLoading;
  public profile$ = this.initService.init().pipe(
    switchMap(profile =>
      this.initService.getServer(profile!.id).pipe(
        tap((server: Server) => {
          if (server) {
            // TODO
          } else {
            // TODO 
          }
        })
      )
    )
  );
}
