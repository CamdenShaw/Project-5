import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { ColonistService } from '../../services/colonist';
import {FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Job } from '../../models/job';
import { Colonist, NewColonist } from '../../models/colonist';
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
  public colonistArray = [];
  public colonistJob;


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required,
        Validators.maxLength(100),
        Validators.minLength(2),
        this.noNumbers( /\d/ ),
        this.noNumbers( /[^\sA-Za-zçå]/ )
      ]),
    age:  new FormControl('', [Validators.required,
        Validators.max(80),
        Validators.min(18)
    ]),
    job_id: new FormControl('', [Validators.required])
  });

  constructor (
    private colonistService: ColonistService,
    private jobService: JobService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.jobs = await this.jobService.getJob();

    if ( typeof localStorage.getItem("colonist")) {
      if (localStorage.getItem("colonist").length === 0 ) {
        localStorage.setItem("colonist", "" );
        this.colonistArray = [];
      }
      else { this.colonistArray = (JSON.parse(localStorage.getItem("colonist"))); }
    }
    else {
      localStorage.setItem("colonist", "" );
      this.colonistArray = [];
    }
  }

   async registerColonist() {
    this.colonistJob = this.registerForm.get("job_id").value;
    const newColonist: NewColonist = {
      name: this.registerForm.get("name").value,
      age: this.registerForm.get("age").value,
      job_id: this.colonistJob
    }
    const newLocalColonist = await this.colonistService.newColonist( newColonist );
    const colonists = await this.colonistService.getColonist();
    const newLocal = await colonists[colonists.length - 1];
    localStorage.setItem("colonist_info", JSON.stringify(newLocal));
    console.log('colonist was saved!', colonists, 'headquarters has sent you the registration info for your new colonist: ', newLocal );
    if (this.registerForm.status === 'VALID') { this.router.navigate(['/encounters']);}
  }

  private noNumbers(validNameRegex): ValidatorFn {
    return (control): { [key: string] : any } => {
      const forbiddenName = validNameRegex.test(control.value);
      return forbiddenName ?  { 'forbiddenName' : { value: control.value } } : null;
    }
  }
}