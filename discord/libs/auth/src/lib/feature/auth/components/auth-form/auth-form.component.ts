import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFormService } from '../../../../data-access/services/auth-form.service';
import { AuthForm, AuthFormValue } from '@discord/api';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@discord/shared-ui';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  selector: 'discord-auth-form',
  templateUrl: './auth-form.component.html',
  providers: [AuthFormService],
})
export class AuthFormComponent {
  @Output() submitform = new EventEmitter<AuthFormValue>();
  @Output() google = new EventEmitter();
  @Input() isLoading?: boolean = false;
  @Input() isDisabled?: boolean = false;

  private readonly authFormService = inject(AuthFormService);
  public form!: FormGroup<AuthForm>;

  constructor() {
    this.form = this.authFormService.createForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();

    if (!email || !password) return;

    this.submitform.emit({ email, password });
  }

  public signInWithGoogle(): void {
    this.google.emit();
  }
}
