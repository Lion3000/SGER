import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { ResultSubscriberService} from '../../services/result-subscriber.service';
import { PhaseService} from '../../services/phase.service';
import { EventService} from '../../services/event.service';

import { ResultSubscriber } from '../../class/data/resultSubscriber';
import { Phase } from '../../class/data/phase';
import { Event } from '../../class/data/event';

declare const TIME_TO_WAIT;
declare function PDFgen(html: string);

@Component({
  selector: 'app-results-subscriber',
  templateUrl: './results-subscriber.component.html',
  styleUrls: ['./results-subscriber.component.css'],
  providers: [ResultSubscriberService, PhaseService, EventService]
})
export class ResultSubscriberComponent implements OnInit {
  protected resultSubscriberList: {ref: ResultSubscriber[]}
  protected phase: {ref: Phase};
  protected event: {ref: Event};


  constructor(private eventService: EventService, private phaseService: PhaseService, private resultSubscriberService: ResultSubscriberService, private route: ActivatedRoute, private location: Location) {
    this.resultSubscriberList = {ref: []};
    this.phase = {ref: new Phase(0, '', false, [])};
    this.event = {ref: new Event(0,'', '', '', 0, 1, '', [], [], false)};
    this.route.params.switchMap((params: Params) => params['id']).subscribe(id => this.phase.ref.setId(+id));

  }

  public resultSubscriberPDF(): void{
    PDFgen(document.getElementById('ResultRoundRobin').innerHTML);
  }


  ngOnInit() {
    //subscriber.readByPhase(this.event,this.phase.ref);
    this.resultSubscriberService.read(this.resultSubscriberList, this.phase.ref);
    this.eventService.readByPhase(this.event, this.phase.ref);
    this.phaseService.readById(this.phase);
    this.updateMenu.bind(this)();
  }

  private updateMenu(): void{
   if(this.event.ref.getId() != 0 && this.phase.ref.getName() != ''){
     var menuList = [];
     menuList.push({title: "Event: " + this.event.ref.getName(), link:"events-list"});
     menuList.push({title: "Phase: " + this.phase.ref.getName() + " - View Result Subscribers", link:"results-subscriber/" + this.phase.ref.getId()});
     document.getElementById('MenuData').innerHTML = JSON.stringify(menuList);
   }
   else
     setTimeout(this.updateMenu.bind(this), TIME_TO_WAIT);
  }

}
