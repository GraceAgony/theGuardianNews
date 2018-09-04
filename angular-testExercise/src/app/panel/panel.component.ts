import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Animations} from "../animation";

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  animations: [Animations.slideInOut]
})


export class PanelComponent {


  public isOpened(): boolean {
    return this.opened;
  }

  @Input() opened = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
