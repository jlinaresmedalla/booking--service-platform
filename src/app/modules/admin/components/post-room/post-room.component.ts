import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-post-room',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.scss',
})
export class PostRoomComponent {
  roomDetailsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService
  ) {
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  submitForm(): void {
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe(
      (response) => {
        this.message.success('Room details posted successfully', {
          nzDuration: 5000,
        });
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        this.message.error(`${error.error.message}`, { nzDuration: 5000 });
      }
    );
  }
}
