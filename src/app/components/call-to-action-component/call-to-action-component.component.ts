import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-call-to-action-component',
  imports: [
    ButtonModule,
    RouterLink
  ],
  templateUrl: './call-to-action-component.component.html',
  styleUrl: './call-to-action-component.component.scss'
})
export class CallToActionComponentComponent {

}
