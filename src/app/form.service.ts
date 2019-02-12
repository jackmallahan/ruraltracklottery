import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Student } from './student';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private studentURL = 'api/heroes'; // URL to web api
  private db: AngularFireDatabase;


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  // getStudents(): Observable<Student[]> {

  //   // return this.db
  //   //   .get<Student[]>(this.studentURL)
  //   //   .pipe(catchError(this.handleError('getStudent', [])));
  // }

  /** Add a student to Firebase */

  addStudent(student: Student): void {
    this.http
      .post<Student>(this.studentURL, student, httpOptions)
      .pipe(catchError(this.handleError('addStudent', [])));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FormService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
