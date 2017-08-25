import { AlienService } from '../../services/alien';
import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../../services/encounter';
import { ReportService } from '../../services/report'
import { Alien } from '../../models/alien';
import { NewEncounters } from '../../models/encounters';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ReportEncounter } from "../../models/report";
import { Router } from "@angular/router";
import { ColonistService } from '../../services/colonist';

@Component ({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    EncountersService,
    ReportService,
    ColonistService,
    AlienService,
  ]
})

export class ReportComponent implements OnInit {
  
  public aliens: Alien[];
  public encounter: NewEncounters[];
  public reportStorage;
  public reportArray = [];
  public report;
  public colonistStorage;
  public colonistArray;
  public colonist;
  public colonistId;
  public date;
  public encountersID;
  
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
      private alienService: AlienService,
      private encountersService: EncountersService,
      private reportService: ReportService,
      private router: Router
    ) {}
  
    async ngOnInit() {
      this.aliens = await this.alienService.getAliens();

      this.colonistStorage = await localStorage.getItem("colonist");
      this.colonistArray = await JSON.parse(this.colonistStorage);
      this.colonist = await this.colonistArray[this.colonistArray.length - 1];

      this.reportStorage = await localStorage.getItem("report");
      this.reportArray = await JSON.parse(this.reportStorage);

      this.date = new Date().toISOString().slice(0, 10);

      if ( this.reportStorage == null && this.reportStorage === 'undefined' ) {
        localStorage.reportStorage.setItem("report", '' );
        this.reportArray = [];
        this.encountersID = 1;
        console.log('empty array', this.reportArray);
      }
      else {
          this.reportStorage = localStorage.getItem("colonist");
          this.reportArray = JSON.parse(this.reportStorage);
          console.log('not-so-empty array', this.reportArray);
          this.encountersID = this.reportArray.length + 1;
      }
    }
  
    async reportEncounter() {
        const newEncounter: NewEncounters = {
          id: this.encountersID,
          atype: this.reportForm.get('alien_id').value,
          date: this.date,
          action: this.reportForm.get('description').value,
          colonist_id: this.colonist.id
      }
      const newReport: ReportEncounter = {
        'encounter': newEncounter
      }
      const report = await this.reportService.reportEncounter(newReport);
      console.log('colonist has provided a report of the encounter:', newReport, '</br>I guess we\'ll add it to the pile:', report);
      if (this.reportForm.status === 'VALID') { this.router.navigate(['/encounters']);}
    }
  
    private noNumbers(validNameRegex): ValidatorFn {
      return (control): { [key: string] : any } => {
        const forbiddenName = validNameRegex.test(control.value);
        return forbiddenName ?  { 'forbiddenName' : { value: control.value } } : null;
      }
    }
}