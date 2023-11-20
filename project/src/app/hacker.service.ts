import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hacker , Comment} from './hacker';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HackerService {

// routing
  private topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  private itemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET HackerNews top stories */
  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(this.topStoriesUrl);
  }

  /** GET stories by id*/
  gethackers(id: number): Observable<Hacker> {
    const url = `${this.itemUrl}${id}.json?print=pretty`;
    return this.http.get<Hacker>(url);
  }

  /** GET comment Hacker by id stories. */
  getComments(itemId: number): Observable<Comment> {
    const url = `${this.itemUrl}${itemId}.json?print=pretty`;
    return this.http.get<Comment>(url);
  }



  /** GET Hacker by id. Will 404 if id not found */
  getHackerNews(id: number): Observable<Hacker> {
    const url = `${this.topStoriesUrl}/${id}`;
    return this.http.get<Hacker>(url).pipe(
      tap(_ => this.log(`fetched Hacker id=${id}`)),
      catchError(this.handleError<Hacker>(`getHacker id=${id}`))
    );
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a hackerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`hackerService: ${message}`);
  }
}
