import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthForm } from '@discord/api';

@Injectable()
export class AuthFormService {
  private readonly formBuilder = inject(FormBuilder);

  public createForm(): FormGroup<AuthForm> {
    return this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }
}
