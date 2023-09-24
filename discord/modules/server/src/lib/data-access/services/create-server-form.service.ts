import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateServerForm } from '@discord/api';

@Injectable({ providedIn: 'root' })
export class CreateServerFormService {
  private readonly formBuilder = inject(FormBuilder);

  public createForm(): FormGroup<CreateServerForm> {
    return this.formBuilder.group({
      serverName: this.formBuilder.control('', [Validators.required]),
    });
  }
}
