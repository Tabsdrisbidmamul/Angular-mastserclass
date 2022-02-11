import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
  title = 'forms-reactive';
  projectForm!: FormGroup;
  forbiddenProjectNames = ['Test'];
  statusValues = ['stable', 'critical', 'finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required],
        this.validateProjectNameAsync.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('stable'),
    });
  }

  validateProjectName(control: FormControl): { [key: string]: boolean } | null {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { forbiddenProjectName: true };
    }
    return null;
  }

  validateProjectNameAsync(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      map((value) =>
        this.forbiddenProjectNames.indexOf(value) !== -1
          ? { forbiddenProjectName: true }
          : null
      ),
      delay(1500)
    );
  }

  submit() {
    console.log(this.projectForm.value);
  }
}
