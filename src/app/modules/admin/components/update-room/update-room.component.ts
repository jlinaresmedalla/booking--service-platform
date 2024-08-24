import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.scss',
})
export class UpdateRoomComponent {
  updateRoomForm!: FormGroup;
  id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.getRoomById();
  }

  submitForm(): void {
    this.adminService
      .updateRoomDetails(this.id, this.updateRoomForm.value)
      .subscribe(
        (res: any) => {
          this.message.success('Room updated successfully', {
            nzDuration: 3000,
          });
          this.router.navigate(['/admin/dashboard']);
        },
        (error: any) => {
          this.message.error(error.error.message);
        }
      );
  }

  getRoomById() {
    this.adminService.getRoomById(this.id).subscribe(
      (res: any) => {
        this.updateRoomForm.patchValue({
          name: res.name,
          type: res.type,
          price: res.price,
        });
      },
      (error: any) => {
        this.message.error(error.error.message);
      }
    );
  }
}
