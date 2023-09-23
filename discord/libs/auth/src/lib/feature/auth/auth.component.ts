import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthFormValue } from '@discord/api';
import { AuthService } from '../../data-access/services/auth.service';

enum FormType {
  register = 'register',
  login = 'login',
}

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, AuthFormComponent, NgIf],
  selector: 'discord-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly authService = inject(AuthService);
  public activeForm = signal<FormType>(FormType.login);
  public readonly FormType: typeof FormType = FormType;

  public readonly isCreating = this.authService.isCreating;

  public switchForm() {
    const type =
      this.activeForm() === FormType.login ? FormType.register : FormType.login;
    this.activeForm.set(type);
  }

  public onSubmit(formValues: AuthFormValue): void {
    this.authService.signInWithEmailAndPassword(
      formValues.email,
      formValues.password
    );
  }

  public onSignInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }
}
