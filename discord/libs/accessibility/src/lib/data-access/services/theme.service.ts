import { Injectable } from '@angular/core';
import { Theme } from '@discord/api';

@Injectable({ providedIn: 'root' })
export class ThemeServiceService {
  private readonly localStorageThemeKey = 'theme';
  private readonly defaultTheme = Theme.dark;

  get localStorageTheme(): string | null {
    return localStorage.getItem(this.localStorageThemeKey);
  }

  get isDarkThemeActive(): boolean {
    return document
      .getElementsByTagName('body')[0]
      .classList.contains(Theme.dark);
  }

  constructor() {
    this.initTheme();
  }

  public toggleTheme(): void {
    document.getElementsByTagName('body')[0].classList.toggle(Theme.dark);
    localStorage.setItem(
      this.localStorageThemeKey,
      this.isDarkThemeActive ? Theme.dark : Theme.light
    );
  }

  private initTheme(): void {
    const localStorageTheme = this.localStorageTheme;

    if (localStorageTheme === Theme.dark) {
      if (this.isDarkThemeActive) return;
      document.getElementsByTagName('body')[0].classList.add(Theme.dark);
    } else if (localStorageTheme === Theme.light) {
      if (!this.isDarkThemeActive) return;
      document.getElementsByTagName('body')[0].classList.remove(Theme.dark);
    } else {
      if (this.isDarkThemeActive) return;
      document.getElementsByTagName('body')[0].classList.add(this.defaultTheme);
    }
  }
}
