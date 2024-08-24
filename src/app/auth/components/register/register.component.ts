import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../../DemoNgZorroAntdModule';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.id !== null) {
        this.message.success('Register success', { nzDuration: 5000 });
        this.router.navigate(['/']);
      } else {
        this.message.error(`${res.message}`, { nzDuration: 5000 });
      }
    });
  }
}
