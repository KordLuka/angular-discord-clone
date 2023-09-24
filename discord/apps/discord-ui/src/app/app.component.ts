import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { CreateServerModalComponent } from '@discord/server';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    NavbarComponent,
    CreateServerModalComponent,
    NgIf,
  ],
  selector: 'discord-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
