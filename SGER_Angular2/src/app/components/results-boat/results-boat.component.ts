import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { ResultBoatService} from '../../services/result-boat.service';
import { PhaseService} from '../../services/phase.service';

import { ResultBoat } from '../../class/data/resultBoat';
import { Phase } from '../../class/data/phase';
import { Event } from '../../class/data/event';



declare function PDFgen(html: string);

@Component({
  selector: 'app-results-boat',
  templateUrl: './results-boat.component.html',
  styleUrls: ['./results-boat.component.css'],
  providers: [ResultBoatService, PhaseService]
})
export class ResultsBoatComponent implements OnInit {
  protected resultBoatList: {ref: ResultBoat[]};
  protected phaseList: {ref: Phase[]};
  protected phase: {ref: Phase};
  protected event:{ref: Event};

  constructor(private resultBoatService: ResultBoatService, private route: ActivatedRoute, private location: Location) {
    this.resultBoatList = {ref: []};
    this.phase = {ref: new Phase(0, '', false, [])};
    this.route.params.switchMap((params: Params) => params['id']).subscribe(id => this.phase.ref.setId(+id));
  }

  public resultBoatPDF(): void{
    PDFgen(document.getElementById('ResultBoat').innerHTML);
  }
  ngOnInit() {
     this.resultBoatService.read(this.resultBoatList, this.phase.ref);

  }

}
