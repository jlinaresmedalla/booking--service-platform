import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    DemoNgZorroAntdModule,
    CommonModule,
    RouterModule,
    NzDatePickerModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class RoomsComponent {
  currentPage = 1;
  rooms: any = [];
  total: any;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService
  ) {
    this.getRooms();
  }

  getRooms(): void {
    this.customerService.getRooms(this.currentPage - 1).subscribe(
      (response: { totalPages; roomDtoList }) => {
        this.rooms = response.roomDtoList;
        this.total = response.totalPages * 1;
      },
      (error) => {
        this.message.error(`${error.error.message}`, { nzDuration: 5000 });
      }
    );
  }

  pageIndexChange(page: any): void {
    this.currentPage = page;
    this.getRooms();
  }

  isVisibleMiddle = false;
  selectedDates: any = [];
  checkInDate: Date;
  checkOutDate: Date;
  id: number;

  onCalendarChange(result: any): void {
    if (result.length === 2) {
      this.checkInDate = result[0];
      this.checkOutDate = result[1];
    }
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  handleOkMiddle(): void {
    const obj = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
    this.customerService.bookRoom(obj).subscribe(
      (res: any) => {
        this.message.success('Request submitted for approval!', {
          nzDuration: 3000,
        });
        this.isVisibleMiddle = false;
      },
      (error: any) => {
        this.message.error(error.error.message);
      }
    );
  }

  showModalMiddle(id: number): void {
    this.isVisibleMiddle = true;
    this.id = id;
  }
}
