import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-viewbookings',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule, RouterModule],
  templateUrl: './viewbookings.component.html',
  styleUrl: './viewbookings.component.scss',
})
export class ViewbookingsComponent {
  currentPage = 1;
  total: any;
  bookings: any;

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService
  ) {
    this.getBookings();
  }

  getBookings(): void {
    this.customerService.getMyBookings(this.currentPage - 1).subscribe(
      (res: any) => {
        this.bookings = res.reservationDtoList;
        this.total = res.totalPages * 5;
        this.message.success('Request submitted for approval!', {
          nzDuration: 3000,
        });
      },
      (error: any) => {
        this.message.error(error.error.message);
      }
    );
  }

  pageIndexChange(page: any): void {
    this.currentPage = page;
    this.getBookings();
  }
}
