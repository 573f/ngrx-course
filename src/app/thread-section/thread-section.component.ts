import { ThreadsService } from './../services/threads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(
    private threadsService: ThreadsService
  ) { }

  ngOnInit() {
    this.threadsService.loadUserThreads();
  }

}
