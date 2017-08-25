import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { ColonistService } from '../../services/colonist';
import {FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Job } from '../../models/job';
import { NewColonist } from '../../models/colonist';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    ColonistService,
    JobService
  ]
})

export class RegisterComponent implements OnInit {

  public jobs: Job[];
  public colonistStorage;
  public colonistArray;
  public colonistID;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required,
        Validators.maxLength(100),
        Validators.minLength(2),
        this.noNumbers( /\d/ ),
        this.noNumbers( /[^\sA-Za-zçå]/ )
      ]),
    age:  new FormControl('', [Validators.required,
        Validators.max(80),
        Validators.min(-0.75)
    ]),
    job_id: new FormControl('', [Validators.required])
  });

  constructor (
    private colonistService: ColonistService,
    private jobService: JobService,
    private router: Router
    
  ) {}

  async ngOnInit() {
    this.jobs = await this.jobService.getJob();
    if ( this.colonistStorage == null && this.colonistStorage === 'undefined' ) {
      localStorage.setItem("colonist", '' );
      this.colonistArray = [];
      this.colonistID = 0;
      console.log('empty array', this.colonistArray);
    }
    else {
        this.colonistStorage = localStorage.getItem("colonist");
        this.colonistArray = JSON.parse(this.colonistStorage);
        this.colonistID = this.colonistArray.length;
        console.log('not-so-empty array', this.colonistArray);
    }
  }

   async registerColonist() {
    const newColonist: NewColonist = {
      name: this.registerForm.get('name').value,
      job_id: this.registerForm.get('job_id').value,
      id: this.colonistID + 1,
      age: this.registerForm.get('age').value
    }
    const colonist = await this.colonistService.registerColonist(newColonist);
    console.log('colonist was saved!', newColonist);
    if (this.registerForm.status === 'VALID') { this.router.navigate(['/encounters']);}
  }

  private noNumbers(validNameRegex): ValidatorFn {
    return (control): { [key: string] : any } => {
      const forbiddenName = validNameRegex.test(control.value);
      return forbiddenName ?  { 'forbiddenName' : { value: control.value } } : null;
    }
  }
}