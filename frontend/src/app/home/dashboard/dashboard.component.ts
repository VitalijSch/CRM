import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public pieChartLabels: string[] = ['Produkt A', 'Produkt B', 'Produkt C'];
  public pieChartData: number[] = [30, 50, 20];

  ngAfterViewInit() {
    Chart.register(...registerables);

    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          data: this.pieChartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Verkaufte Produkte'
          }
        }
      }
    });
  }

  public homeService: HomeService = inject(HomeService);

  public getSumOfAmount(): string {
    let sumAmount = this.homeService.orders().reduce((total, order) => {
      const quantity = Number(order.quantity);
      const amount = Number(order.amount);
      return total + (isNaN(quantity) || isNaN(amount) ? 0 : quantity * amount);
    }, 0);
    return String(sumAmount.toFixed(2)).replace('.', ',');
  }

  public getSumOfQuantity(): number {
    let sumQuantity = this.homeService.orders().reduce((total, order) => {
      const quantity = Number(order.quantity);
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    return sumQuantity;
  }
}
