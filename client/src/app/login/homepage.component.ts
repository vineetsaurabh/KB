import { Chart } from 'chart.js';
import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import 'chart.piecelabel.js';

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    constructor(private router: Router) { }

}
