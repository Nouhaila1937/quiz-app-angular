import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-quiz',
  standalone: true, // Ajout de standalone: true
  imports: [
    CommonModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule
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
  questions: any[] = [];
  answers: { [key: string]: string } = {};

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getQuestions(this.selectedCategory, this.numQuestions)
      .subscribe((data: any) => {
        this.questions = data;
      });
  }

  onSubmit(): void {
    let score = 0;
    this.questions.forEach((question, index) => {
      const correctAnswerKey = Object.keys(question.correct_answers).find(key => question.correct_answers[key] === 'true');
      if (this.answers[index] === correctAnswerKey) {
        score++;
      }
    });
    alert(`Votre score : ${score} / ${this.questions.length}`);
  }
}