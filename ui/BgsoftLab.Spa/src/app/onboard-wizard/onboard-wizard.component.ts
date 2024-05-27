import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-onboard-wizard',
  templateUrl: './onboard-wizard.component.html',
  styleUrls: ['./onboard-wizard.component.css']
})
export class OnboardWizardComponent implements OnInit {
  wizardFrom: FormGroup | undefined;

  ngOnInit(): void {
    this.wizardFrom = new FormGroup({
      step1Data: this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      }),
      step2Data: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      })
    });

    throw new Error('Method not implemented.');
  }

  constructor(private fb: FormBuilder) { }



}
