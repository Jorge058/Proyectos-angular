import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sale {
  id?: number;
  product_id: number;
  quantity: number;
  date: string;
}
export interface DailyReport {
  date: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private apiUrl = '/api/sales';
  private reportUrl = '/api/reports/daily';

  http = inject(HttpClient);

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  addSale(sale: Sale): Observable<any> {
    return this.http.post(this.apiUrl, sale);
  }

  getDailyReports(): Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(this.reportUrl);
  }
}
