import { Component, Inject, OnInit } from '@angular/core';
import { Hacker, Comment } from '../hacker';
import { HackerService } from '../hacker.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  comments: Comment[] = [];
  HackerNews: Hacker[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hacker: Hacker },
    private hackerService: HackerService
  ) {}

  ngOnInit(): void {
    this.getComments();
    this.getHackerNews();
  }

  // get data card
  getHackerNews(): void {
    const hackerIdParent = this.data.hacker.id;
    this.hackerService.gethackers(hackerIdParent).subscribe((hacker) => {
      hacker.formattedTime = this.convertUnixTimestamp(hacker.time);
      this.HackerNews.push(hacker);
    });
  }
  // comment by dataID
  getComments(): void {
    const data = this.data.hacker.kids;

    data.forEach((hackerById) => {
      this.hackerService.getComments(hackerById).subscribe((comments) => {
        comments.formattedTime = this.convertUnixTimestamp(comments.time);

        this.comments.push(comments);
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
