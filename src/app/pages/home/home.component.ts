import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroSectionComponentComponent } from '../../components/hero-section-component/hero-section-component.component';
import { HowItWorksComponentComponent } from '../../components/how-it-works-component/how-it-works-component.component';
import { WhyChooseUsComponentComponent } from '../../components/why-choose-us-component/why-choose-us-component.component';
import { CallToActionComponentComponent } from '../../components/call-to-action-component/call-to-action-component.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroSectionComponentComponent,
    HowItWorksComponentComponent,
    WhyChooseUsComponentComponent,
    CallToActionComponentComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
