import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, ChartjsComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit{
  /*data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };*/
  data: any;
  donnees: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8081/api/districts/reclamation-count').subscribe(data => {
      const labels = Object.keys(data);
      const reclamationCount = Object.values(data);
      const backgroundColors = [];
      // Générer une couleur aléatoire pour chaque moyen de transport
      for (let i = 0; i < labels.length; i++) {
        backgroundColors.push(this.generateRandomColor());
      }
      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Réclamations par district',
            backgroundColor: backgroundColors,
            data: reclamationCount
          }
        ]
      };
    });


    this.http.get<any>('http://localhost:8081/api/mts/reclamation-count').subscribe(resp => {
      const mtLabels = Object.keys(resp);
      const reclamationCountByMt = Object.values(resp);

      const backgroundColors = [];
      // Générer une couleur aléatoire pour chaque moyen de transport
      for (let i = 0; i < mtLabels.length; i++) {
        backgroundColors.push(this.generateRandomColor());
      }

      this.donnees = {
        labels: mtLabels,
        datasets: [
          {
            label: 'Réclamations par moyen de transport',
            backgroundColor: backgroundColors,
            data: reclamationCountByMt
          }
        ]
      };
    });

  }
  generateRandomColor(): string {
    // Générer une couleur aléatoire au format hexadécimal
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

}
