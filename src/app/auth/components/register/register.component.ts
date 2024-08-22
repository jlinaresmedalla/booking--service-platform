import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../../DemoNgZorroAntdModule';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }
}
