import { Chart } from 'chart.js';
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ReportService } from "./report.service";
import { TicketService } from "../ticket/ticket.service";
import { ChartExportComponent } from './chart-export.component';

@Component({
    selector: 'priority-report',
    templateUrl: './priority-report.component.html'
})
export class PriorityReportComponent extends ChartExportComponent implements OnInit {

    title: string = "Priority Report";

    constructor(
        private reportService: ReportService,
        private ticketService: TicketService,
        private cdRef: ChangeDetectorRef) {
            super();
    }

    ngOnInit() {
        this.getTicketsForPriority();
    }

    getTicketsForPriority() {
        this.ticketService.getAllTickets()
            .subscribe(data => {
                const chartData = {};
                data.map(e => {
                    if (e.priority in chartData) {
                        chartData[e.priority] = chartData[e.priority] + 1;
                    } else {
                        chartData[e.priority] = 1;
                    }
                });

                const canvasDiv = document.getElementById("error-count");
                canvasDiv.innerHTML = "";
                const canvas: any = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                canvasDiv.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let rcaChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(chartData),
                        datasets: [{
                            data: Object.values(chartData),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        display: true,
                        pieceLabel: {
                            render: 'value',
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontColor: '#000000'
                        },
                        title: {
                            display: true,
                            text: 'Priorities',
                            fontSize: 20,
                            fontColor: '#1e90ff'
                        }
                    }
                });
            });
    }

}