import { FormControl } from '@angular/forms';

export interface CreateServerForm {
  serverName: FormControl<string | null>;
}

export interface CreateServerFormValue {
  serverName: string;
}
