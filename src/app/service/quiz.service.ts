import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
interface Answer {
  answer_a?: string;
  answer_b?: string;
  answer_c?: string;
  answer_d?: string;
}

interface Question {
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
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}