import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/AuthService';

@Component({
  selector: 'app-logincomponent',
  imports: [ReactiveFormsModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe((success) => {
      if (success) {
        this.router.navigate(['/Home']);
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }
}
