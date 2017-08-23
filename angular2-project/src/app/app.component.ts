import { Component } from '@angular/core';
import { ColonistService } from './services/colonist';
import { JobService } from './services/job';
import { AlienService } from './services/alien';
import { ReportService } from './services/encounter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ColonistService, JobService, AlienService, ReportService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}