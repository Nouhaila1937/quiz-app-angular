import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Answer {
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  [key: string]: string;
}

export interface Question {
  id: number;
  question: string;
  category: string;
  answers: Answer;
  correct_answers: { [key: string]: string };
  explanation: string;
  difficulty: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:5000/questions';

  constructor(private http: HttpClient) {}

  getQuestions(category: string, limit: number): Observable<Question[]> {
    const params = new HttpParams()
      .set('category', category)
      .set('limit', limit.toString());

    return this.http
      .get<Question[]>(this.apiUrl, { params })
      .pipe(
        tap(response => {
          console.log('API Response:', response);
        }),
        catchError(error => {
          console.error('Error fetching questions:', error);
          return throwError(() => new Error('Erreur lors du chargement des questions'));
        })
      );
  }
}