import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  postRoomDetails(roomDto: any) {
    return this.http.post(`${BASIC_URL}/api/admin/room`, roomDto, {
      headers: this.createAutorizationHeader(),
    });
  }

  getRooms(pageNumber: any) {
    return this.http.get(`${BASIC_URL}/api/admin/rooms/${pageNumber}`, {
      headers: this.createAutorizationHeader(),
    });
  }

  createAutorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
