import { Component, OnInit } from '@angular/core';
import { Hacker } from '../hacker';
import { HackerService } from '../hacker.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class CardListComponent implements OnInit {
  HackerNews: Hacker[] = [];

  constructor(private hackerServices: HackerService) { }

  ngOnInit(): void {
    this.getHackerNews();

  }


   getHackerNews(): void {
    this.hackerServices.getTopStories()
      .subscribe(hackerIds => {
        hackerIds.slice(0, 5).forEach(id => {
          this.hackerServices.gethackers(id)
            .subscribe(hacker => {
              hacker.formattedTime = this.convertUnixTimestamp(hacker.time)
              this.HackerNews.push(hacker);
            });
        });
      });
  }

  convertUnixTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInMillis = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMillis / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Rata-rata 30 hari per bulan
    const diffInYears = Math.floor(diffInDays / 365); // Rata-rata 365 hari per tahun

    if (diffInYears >= 1) {
      return `${diffInYears} years ago`;
    } else if (diffInMonths >= 1) {
      return `${diffInMonths} month ago`;
    } else if (diffInDays >= 7) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else if (diffInDays >= 1) {
      return `${diffInDays} days ago`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return 'some time ago';
    }
  }

}
