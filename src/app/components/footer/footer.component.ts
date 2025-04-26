import { Component } from '@angular/core'; 
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar'; // Importez AvatarModule
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
  selector: 'app-footer', 
  imports: [ 
    AvatarModule,
    ButtonModule,
    ToolbarModule,
    RouterLink

  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  visible=true;
  save():void{}
}
