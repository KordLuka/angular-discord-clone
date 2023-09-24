import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@discord/shared-ui';
import { CreateServerFormService } from '../../data-access/services/create-server-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateServerForm } from '@discord/api';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  imports: [TranslateModule, ButtonComponent, ReactiveFormsModule, NgIf],
  selector: 'discord-create-server-modal',
  templateUrl: './create-server-modal.component.html',
})
export class CreateServerModalComponent {
  public createServerFormService = inject(CreateServerFormService);
  public isSubmitted = signal<boolean>(false);

  public form: FormGroup<CreateServerForm> =
    this.createServerFormService.createForm();

  public onSubmit(): void {
    this.isSubmitted.set(true);

    if (this.form.invalid) return;
    
  }
}
