import { Component, OnInit } from '@angular/core';
import { Settings } from '../../class/data/settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [SettingsService]
})
export class AboutComponent implements OnInit {
  protected settings: {ref: Settings};

  constructor(protected settingsService: SettingsService) {
    this.settings = {ref: new Settings('','','','','','','','',0,false)};
  }

  ngOnInit() {
    this.settingsService.read(this.settings);
  }

}
