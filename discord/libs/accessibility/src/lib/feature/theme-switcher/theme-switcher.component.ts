import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeServiceService } from '../../data-access/services/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  selector: 'discord-theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeServiceService);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
