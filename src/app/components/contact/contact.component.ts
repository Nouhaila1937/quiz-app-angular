import { Component, signal } from '@angular/core'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms'; 
import { MessageService } from 'primeng/api';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Toast } from 'primeng/toast';
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
    FormsModule,
    TextareaModule, 
    Toast
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
 loading = false;
  form: ContactForm={
    name: '',
    email: '',
    message: '',
    sujet:'',

  }


   constructor(private messageService: MessageService) {}

  isFormValid(): boolean {
    return !!this.form.name && 
           !!this.form.email && 
           !!this.form.sujet && 
           !!this.form.message &&
           this.validateEmail(this.form.email);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  send(): void {
    console.log('hi')
    if (!this.isFormValid()) {
      console.log(' form vide')
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir correctement tous les champs'
      });
      return;
    }

    this.loading = true;

    emailjs.send(
      "service_ctsekat", 
      "template_ae5mjp5",
      {
        ...this.form
      },
      {publicKey:'uYJUzAVQRtoQlYxgH'}
    )
    .then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Votre message a été envoyé avec succès!'
      });
      this.resetForm();
      this.loading = false;
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de l\'envoi du message.'
      });
      this.loading = false;
    });
  }

  resetForm(): void {
    this.form = {
      name: '',
      email: '',
      message: '',
      sujet: '',
    };
  }

  //   showSuccess() {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  //   }

  //    showError() {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  //   }
}