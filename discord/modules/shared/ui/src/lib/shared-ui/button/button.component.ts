import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, NgClass, NgIf],
  selector: 'discord-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() isLoading?: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Input() isOutline?: boolean = false;
  @Input() customClass?: string;
}
