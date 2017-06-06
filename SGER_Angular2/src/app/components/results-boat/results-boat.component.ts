import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { ResultBoatService} from '../../services/result-boat.service';
import { PhaseService} from '../../services/phase.service';
import { EventService} from '../../services/event.service';

import { ResultBoat } from '../../class/data/resultBoat';
import { Phase } from '../../class/data/phase';
import { Event } from '../../class/data/event';


declare const TIME_TO_WAIT;
declare function PDFgen(html: string);

@Component({
  selector: 'app-results-boat',
  templateUrl: './results-boat.component.html',
  styleUrls: ['./results-boat.component.css'],
  providers: [ResultBoatService, PhaseService, EventService]
})
export class ResultsBoatComponent implements OnInit {
  protected resultBoatList: {ref: ResultBoat[]};
  protected phaseList: {ref: Phase[]};
  protected phase: {ref: Phase};
  protected event:{ref: Event};

  constructor(private eventService: EventService, private phaseService: PhaseService, private resultBoatService: ResultBoatService, private route: ActivatedRoute, private location: Location) {
    this.resultBoatList = {ref: []};
    this.phase = {ref: new Phase(0, '', false, [])};
    this.event = {ref: new Event(0,'', '', '', 0, 1, '', [], [], false)};
    this.route.params.switchMap((params: Params) => params['id']).subscribe(id => this.phase.ref.setId(+id));
  }

  public resultBoatPDF(): void{
    PDFgen(document.getElementById('ResultBoat').innerHTML);
  }
  ngOnInit() {
     this.resultBoatService.read(this.resultBoatList, this.phase.ref);
     this.eventService.readByPhase(this.event, this.phase.ref);
     this.phaseService.readById(this.phase);
     this.updateMenu.bind(this)();
  }

  private updateMenu(): void{
    if(this.event.ref.getId() != 0 && this.phase.ref.getName() != ''){
      var menuList = [];
      menuList.push({title: "Event: " + this.event.ref.getName(), link:"events-list"});
      menuList.push({title: "Phase: " + this.phase.ref.getName() + " - View Result Boats", link:"results-boat/" + this.phase.ref.getId()});
      document.getElementById('MenuData').innerHTML = JSON.stringify(menuList);
    }
    else
      setTimeout(this.updateMenu.bind(this), TIME_TO_WAIT);
  }
}
