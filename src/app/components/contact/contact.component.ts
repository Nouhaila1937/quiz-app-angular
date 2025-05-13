import { Component, signal } from '@angular/core'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel'; 
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
interface ContactForm {
  name: string;
  email: string;
  message: string;
  sujet:string;
}

@Component({
  selector: 'app-contact',
  standalone: true, // Ajout de standalone: true
  imports: [
    CardModule,
    ButtonModule,
    Message,
    FormsModule,
    TextareaModule,
    FloatLabel,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
 
  form: ContactForm={
    name: '',
    email: '',
    message: '',
    sujet:'',

  }

  send():void{
    console.log(this.form);
    emailjs.send("service_ctsekat","template_ae5mjp5",
      {...this.form} ,
      {publicKey:'uYJUzAVQRtoQlYxgH'}
    )
    .then(()=>{
      console.log('message envoyé');
    }) 
  }
  //  constructor(private messageService: MessageService) {}

  //   showSuccess() {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  //   }

  //    showError() {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  //   }
}