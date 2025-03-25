import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports:[ FormsModule,ReactiveFormsModule ],
  template: `
    <h1>Hello from {{ name }}!</h1>
    
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>

    <button (click)="addGuest()">add Guest</button>

    <p>minlength:requiredLength: {{ formErrorMessages()?.['minlength'].requiredLength }}</p>
  `,
})
export class App {
  name = 'Angular';

  form = new FormControl(new Set([1]),[
    Validators.minLength(4),
    Validators.maxLength(6)
  ])

  formErrorMessages = toSignal(
    this.form.valueChanges.pipe(
      tap(() => console.log(this.form.errors)),
      map((val) => this.form.errors)
    )
  )

  addGuest():void {
    const value = new Set(this.form.value);
    
    value.add(value.size + 1)

    this.form.setValue(value);
  }
}

bootstrapApplication(App);
