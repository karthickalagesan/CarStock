import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  getDetails() {
    return this.http.get('/assets/query_results.json', {
      responseType: 'json',
      observe: 'response',
    });
  }
}
