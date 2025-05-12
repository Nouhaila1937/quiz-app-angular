import { Component, ElementRef, ViewChild } from '@angular/core';
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
scrollToFooter() {
    // Recherche du footer dans le DOM par son tag HTML ou un ID spécifique
    const footerElement = document.querySelector('footer');
    
    if (footerElement) {
      // Défilement vers le footer avec animation fluide
      footerElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
}