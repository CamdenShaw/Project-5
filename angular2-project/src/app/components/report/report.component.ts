import {Component, OnInit} from '@angular/core';
import {AlienService} from '../../services/alien';
import {ColonistService} from '../../services/colonist';
import {JobService} from '../../services/job';

@Component ({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    AlienService
  ]
})
export class ReportComponent implements OnInit {

  constructor (private alienService: AlienService, colonistService: ColonistService, jobService: JobService, ) {}

  async ngOnInit() {
    const aliens = await this.alienService.getAliens();
    console.log(aliens);
  }


}