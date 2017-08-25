import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { EncountersService } from '../../services/encounter';
import { AppModule } from '../../app.module';

@Component ({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  providers: [
    AlienService,
    EncountersService
  ]
})
export class EncounterComponent implements OnInit {

  constructor (
    private alienService: AlienService,
    private encountersService: EncountersService,
  ) {}
  
  
  
    async ngOnInit() {
    }
  
  
}