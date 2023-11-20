import { Component, OnInit } from '@angular/core';
import { Hacker } from '../hacker';
import { HackerService } from '../hacker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  HackerNews: Hacker[] = [];

  constructor(private hackerService: HackerService) { }

  ngOnInit(): void {
    this.getHackerNews();
  }

  getHackerNews(): void {
    this.hackerService.getTopStories()
      .subscribe(hackerIds => {
        hackerIds.slice(0, 5).forEach(id => {
          this.hackerService.gethackers(id)
            .subscribe(hacker => {
              this.HackerNews.push(hacker);
            });
        });
      });
  }
}
