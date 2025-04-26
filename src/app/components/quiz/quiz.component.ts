import { Component, OnInit } from '@angular/core';
import { QuizService, Question } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputNumberModule 
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  categories = [  
    "Linux", "BASH", "PHP", "Docker", "HTML", "Postgres", "MySQL",
    "Laravel", "Kubernetes", "JavaScript", "Python", "Openshift",
    "Terraform", "React", "Django", "cPanel", "Ubuntu", "nodeJS",
    "WordPress", "Next.js", "VueJS", "Apache Kafka"
  ];

  selectedCategory: string = 'Linux';
  numQuestions: number = 5;
  questions: Question[] = [];
  answers: string[] = [];
  loading: boolean = false;
  error: string | null = null;
  responseData: any = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.error = null;
    this.answers = [];
    
    console.log(`Loading questions for ${this.selectedCategory}, limit: ${this.numQuestions}`);
    
    this.quizService.getQuestions(this.selectedCategory, this.numQuestions)
      .subscribe({
        next: (data: any) => {
          this.responseData = data; // Store the entire response for debugging
          console.log('Response data:', data);
          
          // Check if the response is an array
          if (Array.isArray(data)) {
            this.questions = data;
            this.answers = Array(this.questions.length).fill('');
            console.log('Questions parsed:', this.questions);
          } else {
            // If the response is not an array, try to find the questions array
            if (data.questions && Array.isArray(data.questions)) {
              this.questions = data.questions;
              this.answers = Array(this.questions.length).fill('');
            } else {
              this.error = "Format de réponse incorrect";
              console.error('Invalid response format:', data);
            }
          }
          
          this.loading = false;
        },
        error: (err) => {
          this.error = "Impossible de charger les questions. Veuillez réessayer plus tard.";
          console.error('Error details:', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    let score = 0;
    this.questions.forEach((question, index) => {
      const correctAnswerKey = Object.keys(question.correct_answers || {}).find(key => 
        question.correct_answers[key] === 'true');
      if (this.answers[index] === correctAnswerKey) {
        score++;
      }
    });
    alert(`Votre score : ${score} / ${this.questions.length}`);
  }
  
  // Helper method to debug data structure
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}