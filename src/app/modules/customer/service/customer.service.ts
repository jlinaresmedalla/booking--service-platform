import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getRooms(pageNumber: any) {
    return this.http.get(`${BASIC_URL}/api/customer/rooms/${pageNumber}`, {
      headers: this.createAutorizationHeader(),
    });
  }

  bookRoom(bookingDto: any) {
    return this.http.post(`${BASIC_URL}/api/customer/booking`, bookingDto, {
      headers: this.createAutorizationHeader(),
    });
  }

  getMyBookings(pageNumber: any) {
    const userId = UserStorageService.getUserId();
    return this.http.get(
      `${BASIC_URL}/api/customer/bookings/${userId}/${pageNumber}`,
      {
        headers: this.createAutorizationHeader(),
      }
    );
  }

  createAutorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
