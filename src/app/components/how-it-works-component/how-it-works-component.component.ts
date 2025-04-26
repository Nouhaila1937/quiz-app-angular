import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CardModule } from 'primeng/card';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-how-it-works-component',
  imports: [
    StepperModule,
    ButtonModule,
    CardModule ,
    AvatarModule
  ],
  templateUrl: './how-it-works-component.component.html',
  styleUrl: './how-it-works-component.component.scss'
})
export class HowItWorksComponentComponent {

}
