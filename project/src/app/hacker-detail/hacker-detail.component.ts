import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hacker } from '../hacker';
import { HackerService } from '../hacker.service';

@Component({
  selector: 'app-hacker-detail',
  templateUrl: './hacker-detail.component.html',
  styleUrls: [ './hacker-detail.component.css' ]
})
export class HackerDetailComponent implements OnInit {
  HackerNews: Hacker[] = [];

  constructor(
    private route: ActivatedRoute,
    private hackerService: HackerService,
  ) {}

  ngOnInit(): void {
    this.gethacker();
  }

  gethacker(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.hackerService.getComments(id)
console.log("datadetail",id)
  }


}
