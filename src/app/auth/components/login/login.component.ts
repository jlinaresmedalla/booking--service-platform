import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { DemoNgZorroAntdModule } from '../../../DemoNgZorroAntdModule';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submitForm() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.userId) {
          const user = { id: res.userId, role: res.userRole };
          UserStorageService.saveUser(user);
          UserStorageService.saveToken(res.jwt);

          this.message.success('Login success', { nzDuration: 5000 });
        }
      },
      (error) => {
        this.message.error('Bad Credentials', { nzDuration: 5000 });
      }
    );
  }
}
