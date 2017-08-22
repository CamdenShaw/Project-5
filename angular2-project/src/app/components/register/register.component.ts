import { Component, OnInit } from '@angular/core';
import { ColonistService } from '../../services/colonist';
import { JobService } from '../../services/job';

@Component ({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
  providers: [
    ColonistService
  ]

})
export class RegisterComponent implements OnInit {
  constructor (
    private colonistService: ColonistService,
    private jobService: JobService
  ) {}

  async ngOnInit() {
    const data = {
      name: 'Hello There',
      age: 50,
      job_id: 2
    }
    const newColonist = await this.colonistService.registerColonist(data);
    console.log(newColonist);
    const jobs = await this.jobService.getJob();
    console.log(jobs);
  }

}