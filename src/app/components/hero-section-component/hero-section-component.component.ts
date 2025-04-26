import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero-section-component',
  standalone: true, // Ajout de standalone: true
  imports: [
    ButtonModule,
    RouterLink
  ],
  templateUrl: './hero-section-component.component.html',
  styleUrl: './hero-section-component.component.scss'
})
export class HeroSectionComponentComponent {

}
