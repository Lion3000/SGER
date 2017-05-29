import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { ResultSubscriberService} from '../../services/result-subscriber.service';
import { PhaseService} from '../../services/phase.service';

import { ResultSubscriber } from '../../class/data/resultSubscriber';
import { Phase } from '../../class/data/phase';
//import { Event } from '../../class/data/event';
//import { Subscriber } from '../../class/data/subscriber';

declare function PDFgen(html: string);

@Component({
  selector: 'app-results-subscriber',
  templateUrl: './results-subscriber.component.html',
  styleUrls: ['./results-subscriber.component.css'],
  providers: [ResultSubscriberService]
})
export class ResultSubscriberComponent implements OnInit {
  protected resultSubscriberList: {ref: ResultSubscriber[]}
  protected phase: {ref: Phase};
//  protected event: {ref: Event};
//  protected subscriber: Subscriber;


  constructor(private resultSubscriberService: ResultSubscriberService, private route: ActivatedRoute, private location: Location) {
    this.resultSubscriberList = {ref: []};
    this.phase = {ref: new Phase(0, '', false, [])};
//    this.event = {ref: new Event(0,'', '', '', 0, 1, '', [], [], false)};
  //  this.subscriber = new Subscriber(0,'');
    this.route.params.switchMap((params: Params) => params['id']).subscribe(id => this.phase.ref.setId(+id));

  }

  public resultSubscriberPDF(): void{
    PDFgen(document.getElementById('ResultRoundRobin').innerHTML);
  }


  ngOnInit() {
    //subscriber.readByPhase(this.event,this.phase.ref);
    this.resultSubscriberService.read(this.resultSubscriberList, this.phase.ref);

  }


}
