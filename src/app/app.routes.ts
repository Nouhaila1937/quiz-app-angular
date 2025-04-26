import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { QuizComponent } from './components/quiz/quiz.component';
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: HomeComponent },
  {path:'quiz', component: QuizComponent, pathMatch: 'full' }, // Ajout de pathMatch: 'full'
  {path:'contact' ,component:ContactComponent}

];
