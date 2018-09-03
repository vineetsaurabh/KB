import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver/FileSaver';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { TokenStorage } from '../login/token.storage';
import { RolaguruUtils } from '../util/rolaguru.util';
import { Rating } from './rating.model';
import { User } from '../user/user.model';
import { State } from '../state/state.model';
import { StateService } from '../state/state.service';
import { Product } from "../product/product.model";
import { Module } from "../module/module.model";

@Component({
    selector: 'ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

    public ticket: Ticket = {
        ticketId: '',
        name: '',
        type: '',
        summary: '',
        description: '',
        priority: '',
        product: new Product(),
        module: new Module(),
        operation: '',
        status: new State(),
        statusLabel: '',
        assignedTo: new User(),
        assignedBy: new User(),
        assignedOn: new Date(),
        createdBy: new User(),
        creationDate: new Date(),
        lastModifiedBy: new User(),
        lastModifiedDate: new Date(),
        closedBy: new User(),
        closedOn: new Date(),
        checked: false,
        ratings: new Set<Rating>(),
    };
    ticketId: string;
    rolaguruUtils = RolaguruUtils.getInstance();

    userid: string;
    myRating: Rating = new Rating();
    myRatingTooltip: string = "Rate this Ticket";
    overallRating: number = 0;
    overallRatingTooltip: string = "No rating";
    overallRatingStar: string = "00000";
    totalRating: number = 0;
    noOfRatings: number = 0;

    states: State[];

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private ticketService: TicketService,
        private toastService: ToastrService,
        private stateService: StateService,
        private token: TokenStorage,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.ticketId = params.get('id');
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.dialog.afterAllClosed.subscribe(() => {
            this.getTicket();
            this.userid = this.token.getCurrentUserId();
        });
        this.stateService.getStates().subscribe(data => {
            this.states = data;
        });
    }

    private getTicket() {
        this.ticketService.getTicket(this.ticketId).subscribe((ticket) => {
            this.ticket = ticket;
            //this.noOfRatings = Object.keys(this.ticket.ratings).length;
            //this.calculateRating();
            //this.calculateOverallRating();
        });
    }

    findTicketByName() {
        this.ticketService.findTicketByName(this.ticket.name)
            .subscribe(data => {
                this.ticket = data;
                this.router.navigate(['findTicket/' + this.ticket.ticketId]);
            });
    }

    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    selectFileForTicket(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForTicket();
        event = null;
        return false;
    }

    uploadFileForTicket() {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.ticketService.uploadFile(this.currentFileUpload, this.ticket.ticketId)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.toastService.success(`${this.currentFileUpload.name} is uploaded`);
                    this.ticket = event.body;
                    this.currentFileUpload = undefined;
                }
            });
        this.selectedFiles = undefined;
    }

    download(file) {
        this.ticketService.downloadFile(file.ticketDocId)
            .subscribe(res => {
                saveAs(res.body, file.filename);
            });
    }

    showFile(file) {
        const fileToShow: any = document.getElementById(`file-${file.ticketDocId}`);
        this.ticketService.downloadFile(file.ticketDocId)
            .subscribe(res => {
                const url = URL.createObjectURL(res.body);
                fileToShow.addEventListener('load', () => URL.revokeObjectURL(url));
                fileToShow.src = url;
            });

    }

    delete(file) {
        this.ticketService.deleteFile(file.ticketDocId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.ticket = res;
            });
    }

    rate(i: number, myRating, ticket) {
        myRating.rating = i + 1;
        if (this.myRating.ticketId == undefined) {
            myRating.ticketId = ticket.ticketId;
            this.ticketService.createRating(myRating)
                .subscribe(data => {
                    this.myRatingTooltip = "My rating " + myRating.rating;
                    this.totalRating += myRating.rating;
                    this.noOfRatings++;
                    this.calculateOverallRating();
                    this.toastService.success(`Rated ${myRating.rating}`);
                });
        } else {
            this.ticketService.updateRating(myRating)
                .subscribe(data => {
                    this.totalRating = myRating.rating;
                    for (let rating of Array.from(this.ticket.ratings.values())) {
                        if (rating.userid != myRating.userid) {
                            this.totalRating = this.totalRating + rating.rating;
                        }
                    }
                    this.myRatingTooltip = "My rating " + myRating.rating;
                    this.calculateOverallRating();
                    this.toastService.warning(`Rating changed to ${myRating.rating}`);
                });
        }
    }

    calculateRating(): void {
        for (let rating of Array.from(this.ticket.ratings.values())) {
            this.totalRating = this.totalRating + rating.rating;
            if (rating.userid == +this.userid) {
                this.myRating = rating;
                this.myRatingTooltip = "My rating " + rating.rating;
            }
        }
    }

    calculateOverallRating(): void {
        if (this.noOfRatings > 0) {
            this.overallRating = Math.round(this.totalRating / this.noOfRatings * 10) / 10;
            this.overallRatingTooltip = "Overall rating " + this.overallRating;
            if (this.overallRating % 1 == 0) {
                this.overallRatingStar = '2'.repeat(this.overallRating) + '0'.repeat(5 - this.overallRating);
            } else {
                this.overallRatingStar = '2'.repeat(Math.floor(this.overallRating)) + '1' + '0'.repeat(4 - (Math.floor(this.overallRating)));
            }
        }
    }

    promote(): void {
        let index = this.states.findIndex(state => state.stateId === this.ticket.status.stateId);
        let nextState = this.states[index + 1];
        this.ticket.statusLabel = this.ticket.status.promoteLabel;
        this.ticket.status = nextState;
        if (index == this.states.length - 2) {
            this.ticketService.closeTicket(this.ticket)
                .subscribe(res => {
                    this.ticket = res;
                    this.toastService.success(`Ticket ${this.ticket.name} has been closed`);
                });
        } else {
            this.ticketService.updateTicket(this.ticket)
                .subscribe(res => {
                    this.toastService.success(`Ticket ${this.ticket.name} promoted to next state ${nextState.stateName}`);
                });
        }
    }

    demote(): void {
        let index = this.states.findIndex(state => state.stateId === this.ticket.status.stateId);
        let previousState = this.states[index - 1];
        this.ticket.statusLabel = this.ticket.status.demoteLabel;
        this.ticket.status = previousState;
        this.ticketService.updateTicket(this.ticket)
            .subscribe(res => {
                this.ticket = res;
                this.toastService.success(`Ticket ${this.ticket.name} demoted to previous state ${previousState.stateName}`);
            });
    }

}
