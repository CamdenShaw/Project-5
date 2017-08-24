import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { ColonistService } from '../../services/colonist';
import { JobService } from '../../services/job';
import { EncountersService } from '../../services/encounter';
import { ReportService } from '../../services/report'
import { Alien } from '../../models/alien';
import { Job } from '../../models/job';
import { NewEncounters } from '../../models/encounters';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { ReportEncounter } from "../../models/report";

@Component ({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    AlienService,
    JobService,
    EncountersService,
    ReportService,
    RegisterComponent,
    ColonistService
  ]
})

export class ReportComponent implements OnInit {

  public colonist: RegisterComponent[];
  
  public aliens: Alien[];
  public jobMuddy: Job[];
  public job;
  public encounter: NewEncounters[];
  
    reportForm = new FormGroup({
      description: new FormControl('', [Validators.required,
          Validators.maxLength(500),
          Validators.minLength(10),
          this.noNumbers( /\d/ ),
          this.noNumbers( /[^A-Za-zçå\.?,()!'";:\s]/ )
        ]),
      alien_id: new FormControl('', [Validators.required])
    });
  
    constructor (
      private jobService: JobService,
      private alienService: AlienService,
      private encountersService: EncountersService,
      private reportService: ReportService
    ) {}
  
    async ngOnInit() {
      this.aliens = await this.alienService.getAliens();
      //await this.colonist[this.colonist.length-1];
      this.jobMuddy = await this.jobService.getJob();
      this.job = await this.colonist[1];
      console.log(this.aliens);
    }



  
    async reportEncounter() {
        const newEncounter: NewEncounters = {
          id: null,
          atype: this.reportForm.get('alien-type').value,
          date: '',
          action: this.reportForm.get('encounter-description').value,
          colonist_id: null
      }
      // const newReport: ReportEncounter = {
      //   newEncounter;
      // }
      const report = await this.encountersService.newEncounter(newEncounter);
      console.log('Another close call!', newEncounter);
    }
  
    private noNumbers(validNameRegex): ValidatorFn {
      return (control): { [key: string] : any } => {
        const forbiddenName = validNameRegex.test(control.value);
        return forbiddenName ?  { 'forbiddenName' : { value: control.value } } : null;
      }
    }
}