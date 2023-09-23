import { Component } from '@angular/core';
import { LanguageSwitcherComponent, ThemeSwitcherComponent } from '@discord/accessibility';
@Component({
  standalone: true,
  imports: [LanguageSwitcherComponent, ThemeSwitcherComponent],
  selector: 'discord-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
