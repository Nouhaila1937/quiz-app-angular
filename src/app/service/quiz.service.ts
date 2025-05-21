import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export interface Answer {
  answer_a: string | null;
  answer_b: string | null;
  answer_c: string | null;
  answer_d: string | null;
  answer_e: string | null;
  answer_f: string | null;
  [key: string]: string | null;
}

export interface Question {
  id: number;
  question: string;
  category: string;
  answers: Answer;
  correct_answers: { [key: string]: string };
  multiple_correct_answers: string;
  correct_answer: string | null;
  explanation: string | null;
  tip: string | null;
  description: string | null;
  difficulty: string;
  tags: { name: string }[];
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
        map(response => {
          // Transformer chaque question pour identifier la réponse correcte
          return Array.isArray(response) ? response.map(question => {
            // Trouver quelle est la réponse correcte
            if (!question.correct_answer) {
              question.correct_answer = this.determineCorrectAnswer(question.correct_answers);
            }
            return question;
          }) : [];
        }),
        tap(response => {
          console.log('Processed Questions:', response);
        }),
        catchError(error => {
          console.error('Error fetching questions:', error);
          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else {
            console.error(`Server returned code: ${error.status}, body: ${JSON.stringify(error.error)}`);
          }
          return throwError(() => new Error('Erreur lors du chargement des questions'));
        })
      );
  }

  // Fonction pour déterminer quelle réponse est correcte
  determineCorrectAnswer(correctAnswers: { [key: string]: string }): string {
    // Recherche la clé correspondant à la réponse correcte (valeur "true")
    for (const [key, value] of Object.entries(correctAnswers)) {
      if (value === 'true') {
        // Convertit "answer_a_correct" en "answer_a"
        return key.replace('_correct', '');
      }
    }
    return '';
  }
}