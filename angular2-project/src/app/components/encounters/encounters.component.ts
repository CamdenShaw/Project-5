import { Component, OnInit, Input } from '@angular/core';
import { AlienService } from '../../services/alien';
import { EncountersService } from '../../services/encounter';
import { AppModule } from '../../app.module';
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component ({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  providers: [
    EncountersService
  ],
})
export class EncounterComponent implements OnInit {

  public newEncounters = JSON.parse(localStorage.getItem("encounters"));

  constructor (
    private encountersService: EncountersService,
    private router: Router
  ) {}

  async ngOnInit() {
    const importArray = await this.encountersService.getEncounters();
    const newArray = importArray.slice(-50).reverse();
    let arrayDiv = <HTMLElement> document.querySelector('.encounters-array');
    arrayDiv.innerHTML = `<h1 class="global-title">Global Reports</h1>`;
    newArray.forEach(item => {
      arrayDiv.innerHTML += `<h2 class="header-${item.id}">Report# ${JSON.stringify(item.id)}</h2>
                              <p class="date-${item.id}">${item.date}</p>
                              <p class="colonist-${item.colonist_id}">Witnessed by colonist-${item.colonist_id}</p>
                              <p class="intro alien-${item.id}">The following is the colonist\'s account of their encounter with ${item.atype}: 
                              <br><span>${item.action}</span></p>`;
                              
    });

    const encountersHtml = <HTMLElement> document.querySelector('.local-encounters-array');
    encountersHtml.innerHTML = `<h1 class="local-title">Local Reports</h1>`;

    if ( typeof localStorage.getItem("report") == "undefined" || localStorage.getItem("report") == null || localStorage.getItem("report") === "" ) {
      encountersHtml.innerHTML += `<h2 class="header-no-report"><span>No alien encounters near this Martian colony!</h2>
                                  <p class="yoda">Although, Yoda seems cool.</p>`;
    }
    else {
      console.log(localStorage.getItem("report"));
      const importLocalArray = await JSON.parse(localStorage.getItem("report"));
      const newLocalArray = importLocalArray.slice(-50).reverse();
      newLocalArray.forEach(item => {
        encountersHtml.innerHTML += `<h2 class="header-${item.local_id}"><span> Report# ${JSON.stringify(item.local_id)}</h2>
                                <p class="date-${item.encounter.id}">${item.encounter.date}</p>
                                <p class="colonist-${item.encounter.colonist_id}">Witnessed by colonist-${item.encounter.colonist_id}</p>
                                <p class="intro alien-${item.encounter.id}">The following is the colonist\'s account of their encounter with ${item.encounter.atype}: 
                                <br><span>${item.encounter.action}</span></p>`;
      });
    }

  }

}