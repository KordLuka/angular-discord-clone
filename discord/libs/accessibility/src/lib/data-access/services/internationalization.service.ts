import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, LanguageOption } from '@discord/api';

@Injectable({ providedIn: 'root' })
export class InternationalizationService {
  private readonly translateService = inject(TranslateService);
  private readonly defaultLanguage = Language.en;
  private readonly loraclStorageLangKey = 'lang';
  public availableLanguages: LanguageOption[] = [
    {
      label: 'Polish (PL)',
      id: Language.pl,
      img: '/assets/images/pl.svg',
    },
    {
      label: 'English (US)',
      id: Language.en,
      img: '/assets/images/us.svg',
    },
  ];

  constructor() {
    this.translateService.addLangs([Language.en, Language.pl]);
    const localStorageLang = localStorage.getItem(this.loraclStorageLangKey);
    this.switchLang(
      localStorageLang ? (localStorageLang as Language) : this.defaultLanguage
    );
  }

  public switchLang(lang: Language): void {
    this.translateService.use(lang);
    localStorage.setItem(this.loraclStorageLangKey, lang);
  }
}
