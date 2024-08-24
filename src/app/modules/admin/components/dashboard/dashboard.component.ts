import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentPage = 1;
  rooms: any = [];
  total: any;
  loading = false;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.getRooms();
  }

  getRooms(): void {
    this.adminService.getRooms(this.currentPage - 1).subscribe(
      (response: { totalPages; roomDtoList }) => {
        console.log(response);
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

  showConfirm(roomId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId),
    });
  }

  deleteRoom(roomId: number): void {
    this.adminService.deleteRoom(roomId).subscribe(
      (res: any) => {
        this.message.success('Room deleted successfully', {
          nzDuration: 3000,
        });
        this.getRooms();
      },
      (error: any) => {
        this.message.error(error.error.message);
      }
    );
  }
}
