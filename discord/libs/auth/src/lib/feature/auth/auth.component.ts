import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'discord-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {}
