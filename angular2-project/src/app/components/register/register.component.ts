import { Component, OnInit } from '@angular/core';
import { ColonistService } from '../../services/colonist';
import { JobService } from '../../services/job';

@Component ({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    .warning { background: red; }
    .ok { background: green; }
  `],
  providers: [
    ColonistService
  ]
})

export class RegisterComponent implements OnInit {
  public jobs;
  public data = [
    {text: "Alien Encounter 1"},
    {text: "Alien Encounter 2"},
    {text: "Alien Encounter 3"},
    {text: "Alien Encounter 3"}
  ];
  constructor (
    private colonistService: ColonistService,
    private jobService: JobService
  ) {}

  async ngOnInit() {
    // setInterval(() => {
    //   this.data.push({text: `Encounter ${Math.random()}`});
    // }, 2000);

    
    // const data = {
    //   name: 'Hello There',
    //   age: 50,
    //   job_id: 2
  }
  removeListItem(item){
    this.data = this.data.filter(li => li !== item);
  }

  addListItem(item){
    this.data.push({ text: item });
  }
    // const newColonist = await this.colonistService.registerColonist(data);
    // console.log(newColonist);
    // this.jobs = await this.jobService.getJob();
    // console.log(this.jobs);
}
