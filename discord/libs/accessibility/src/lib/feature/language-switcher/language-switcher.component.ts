import { Component, inject } from '@angular/core';
import { InternationalizationService } from '@discord/accessibility';
import { Language, LanguageOption } from '@discord/api';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'discord-language-switcher',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  private readonly internationalizationService = inject(
    InternationalizationService
  );
  public translateService = inject(TranslateService);
  public Language: typeof Language = Language;
  public availableLanguages =
    this.internationalizationService.availableLanguages;

  public get activeLanguage(): LanguageOption | undefined {
    const currentLang = this.translateService.currentLang || Language.en;
    return this.availableLanguages.find(lang => lang.id === currentLang);
  }

  public switchLang(lang: Language) {
    this.internationalizationService.switchLang(lang);
  }
}
