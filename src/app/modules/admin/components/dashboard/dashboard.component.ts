import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    private message: NzMessageService
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

  actionEdit = () => {
    /* Edit action logic */
  };
  actionDelete = () => {
    /* Delete action logic */
  };
}
