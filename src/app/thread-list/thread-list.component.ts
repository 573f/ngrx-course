import { ThreadSummaryVM } from './../thread-section/thread-summary.vm';
import { Observable }               from 'rxjs/Observable';
import { Thread }                   from './../../../shared/model/thread';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  constructor() { }

  ngOnInit() {
  }

}
