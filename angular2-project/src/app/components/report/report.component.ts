import {Component, OnInit} from '@angular-core';
import {AlienService} from '../../services/alien';
import {ColonistService} from '../../services/colonist';
import {JobService} from '../../services/job';

@Component ({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styles: []
})
export class ReportComponent implements OnInit {

  constructor (alienService: AlienService) {}

  ngOnInit() {
  }


}