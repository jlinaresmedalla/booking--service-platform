import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent {
  currentPage = 1;
  total: any;
  reservations: any;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    this.getReservations();
  }

  getReservations(): void {
    this.adminService.getReservations(this.currentPage - 1).subscribe(
      (response: { totalPages; reservationDtoList }) => {
        this.reservations = response.reservationDtoList;
        this.total = response.totalPages * 5;
      },
      (error) => {
        this.message.error(`${error.error.message}`, { nzDuration: 5000 });
      }
    );
  }

  pageIndexChange(page: any): void {
    this.currentPage = page;
    this.getReservations();
  }

  changeReservationStatus(bookingId: number, status: string): void {
    this.adminService.changeReservationStatus(bookingId, status).subscribe(
      (response) => {
        this.getReservations();
        this.message.success('Reservation status changed successfully');
      },
      (error) => {
        this.getReservations();
      }
    );
  }
}
