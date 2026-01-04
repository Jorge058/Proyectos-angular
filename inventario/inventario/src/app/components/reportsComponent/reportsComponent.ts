import { Component, inject, OnInit, signal } from '@angular/core';
import { DailyReport, VentasService } from '../../services/ventas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'reports-component',
  imports: [DatePipe],
  templateUrl: './reportsComponent.html',
  styleUrl: './reportsComponent.css',
})
export class ReportsComponent implements OnInit {
  reports = signal<DailyReport[]>([]);

  private salesService = inject(VentasService);

  ngOnInit() {
    this.salesService.getDailyReports().subscribe((data) => {
      this.reports.set(data);
    });
  }
}
