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
    InputNumberModule,
    HeaderComponent,
    FooterComponent
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
        next: (data: Question[]) => {
          this.responseData = data; // Store the entire response for debugging
          console.log('Response data:', data);
          
          if (Array.isArray(data) && data.length > 0) {
            this.questions = data;
            this.answers = Array(this.questions.length).fill('');
            console.log('Questions loaded:', this.questions);
          } else {
            this.error = "Aucune question disponible pour cette catégorie";
            console.error('Empty or invalid response format:', data);
          }
          
          this.loading = false;
        },
        error: (err) => {
          this.error = "Impossible de charger les questions. Veuillez réessayer plus tard.";
          console.error('Error details:', err);
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    let score = 0;
    let total = this.questions.length;
    
    this.questions.forEach((question, index) => {
      const selectedAnswer = this.answers[index];
      
      if (selectedAnswer && question.correct_answers) {
        const correctKey = `${selectedAnswer}_correct`;
        if (question.correct_answers[correctKey] === 'true') {
          score++;
        }
      }
    });
    
    alert(`Votre score : ${score} / ${total}`);
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