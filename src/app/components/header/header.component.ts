import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar'; // Importez AvatarModule
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule, // Importez AvatarModule
    ButtonModule,
    ToolbarModule,
    RouterLink
  
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loading = false;
  load(): void { }
}
