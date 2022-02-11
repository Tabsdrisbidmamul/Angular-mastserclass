import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  submitted = false;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenUsername.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.signupForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Max',
    //     email: 'max@test.com',
    //   },
    //   gender: 'male',
    //   hobbies: [],
    // });

    this.signupForm.patchValue({
      userData: {
        username: 'Max',
        email: 'max@test.com',
      },
    });
  }

  addHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  get hobbyControls(): AbstractControl[] {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenUsername(control: FormControl): { [key: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { forbidden: true };
    }
    return null;
  }

  forbiddenEmail(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      map((value) =>
        value === 'test@test.com' ? { forbiddenEmail: true } : null
      ),
      delay(1500)
    );
  }

  submit() {
    this.submitted = true;
    console.log(this.signupForm);

    this.signupForm.reset({ gender: 'male' });
  }
}
