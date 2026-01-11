import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sale {
  id?: number;
  product_id: number;
  quantity: number;
  date: string;
}

export interface Sales {
  id?: number;
  product_id: number;
  product_name: string;
  product_price: string;
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

  getSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(this.apiUrl);
  }

  addSale(sale: Sale): Observable<any> {
    return this.http.post(this.apiUrl, sale);
  }

  editSale(id: number, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${id}`, sale);
  }

  getDailyReports(): Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(this.reportUrl);
  }
}
