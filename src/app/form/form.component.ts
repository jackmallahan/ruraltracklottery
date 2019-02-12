import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  studentForm: FormGroup;
  public students: Observable<Student[]>;

  constructor(
    private firebaseService: FirebaseService,
    private builder: FormBuilder,
  ) {}

  onSubmit(value) {
    this.firebaseService.createStudent(value)
      .then(
        res => {
          this.studentForm.reset();
        }
      );
  }

  ngOnInit() {
    this.studentForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      firstChoice: ['', Validators.required],
      secondChoice: ['', Validators.required],
      thirdChoice: ['', Validators.required],
      fourthChoice: ['', Validators.required],
      fifthChoice: ['', Validators.required]
    });
  }
}
