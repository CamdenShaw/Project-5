import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job';
import { ColonistService } from '../../services/colonist';
import {FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Job } from '../../models/job';
import {NewColonist} from '../../models/colonist';

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

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required,
        Validators.maxLength(100),
        Validators.minLength(2),
        this.noNumbers( /\d/ ),
        this.noNumbers( /[^A-Za-zçå]/ )
      ]),
    age:  new FormControl('', [Validators.required,
        Validators.max(80),
        Validators.min(-0.75)
    ]),
    job_id: new FormControl('', [Validators.required])
  });

  constructor (
    private colonistService: ColonistService,
    private jobService: JobService
  ) {}

  async ngOnInit() {
    this.jobs = await this.jobService.getJob();
    console.log(this.jobs);
  }

   async registerColonist() {
    const newColonist: NewColonist = {
      name: this.registerForm.get('name').value,
      age: this.registerForm.get('age').value,
      job_id: this.registerForm.get('job_id').value
    }
    const colonist = await this.colonistService.registerColonist(newColonist);
    console.log('colonist was saved!', colonist);
    return colonist;
  }

  private noNumbers(validNameRegex): ValidatorFn {
    return (control): { [key: string] : any } => {
      const forbiddenName = validNameRegex.test(control.value);
      return forbiddenName ?  { 'forbiddenName' : { value: control.value } } : null;
    }
  }
}