import { Component, OnInit } from '@angular/core';
import { Hacker } from '../hacker';
import { HackerService } from '../hacker.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  HackerNews: Hacker[] = [];

  constructor(private hackerService: HackerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHackerNews();
  }


  getHackerNews(): void {
    this.hackerService.getTopStories()
      .subscribe(hackerIds => {
        hackerIds.slice(0, 4).forEach(id => {
          this.hackerService.gethackers(id)
            .subscribe(hacker => {
              hacker.formattedTime = this.convertUnixTimestamp(hacker.time);
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


  openDialog(hacker: Hacker): void {
    this.dialog.open(ModalComponent, {
      data: { hacker } // Kirim data hacker ke modal
    });
  }

}
