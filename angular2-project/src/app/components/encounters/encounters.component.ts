import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { ColonistService } from '../../services/colonist';
import { JobService } from '../../services/job';
import { AppModule } from '../../app.module';

@Component ({
  selector: 'app-report',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  providers: [
    AlienService
  ]
})
export class EncounterComponent implements OnInit {

  constructor (private alienService: AlienService, colonistService: ColonistService, jobService: JobService, ) {}



  async ngOnInit() {
    const aliens = await this.alienService.getAliens();
    console.log(aliens);
  }
}