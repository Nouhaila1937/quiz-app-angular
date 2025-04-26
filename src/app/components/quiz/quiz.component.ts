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
import { SliderModule } from 'primeng/slider';
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
    InputNumberModule,
    HeaderComponent,
    FooterComponent,
    SliderModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  categories = [  
    "Linux", "BASH", "PHP", "Docker", "HTML", "Postgres", "MySQL",
    "Laravel", "Kubernetes", "JavaScript", "Openshift",
    "Terraform", "React", "Django", "cPanel", "Ubuntu", "nodeJS",
    "WordPress", "Next.js", "VueJS", "Apache Kafka"
  ];

  selectedCategory: string = 'Linux';
  score: number = 0;
  submitted: boolean = false;
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

  loadQuestions() {
    this.loading = true;
    this.error = '';
    
    this.quizService.getQuestions(this.selectedCategory, this.numQuestions).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.answers = new Array(questions.length).fill('');
        this.loading = false;
        this.submitted = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des questions.';
        this.loading = false;
      }
    });
  }
  
  onSubmit() {
    this.score = 0;
    this.submitted = true;
  
    this.questions.forEach((question, index) => {
      if (this.answers[index] === question.correct_answer) {
        this.score++;
      }
    });
  }
  restartQuiz() {
    this.submitted = false;
    this.score = 0;
    this.answers = [];
    // Recharge ou réinitialise tes questions ici si besoin
  }
  
  // Helper method pour accéder aux propriétés de l'objet answers
  getObjectKeys(obj: any): string[] {
    if (!obj) return [];
    
    // Ne prendre que les clés qui ont des valeurs non nulles
    return Object.keys(obj).filter(key => 
      obj[key] !== null && 
      !key.includes('_correct') // Exclure les clés de réponses correctes
    );
  }
}