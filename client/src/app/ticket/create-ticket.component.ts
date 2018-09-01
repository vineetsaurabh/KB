import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { TicketType } from '../ticket-type/ticket-type.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { UserService } from '../user/user.service';
import { UserNameGroup } from '../user/user-name-group.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    templateUrl: './create-ticket.component.html'
})
export class CreateTicketComponent {

    ticket: Ticket = new Ticket();
    ticketTypes: TicketType[];
    defaultTicketType: TicketType;
    priorityTypes: PriorityType[];
    defaultPriorityType: PriorityType;
    userNameGroups: UserNameGroup[]
    userNameGroupOptions: Observable<UserNameGroup[]>;

    userNameForm: FormGroup = this.fb.group({
        userNameGroup: '',
    });

    constructor(
        private fb: FormBuilder,
        private ticketService: TicketService,
        private toastService: ToastrService,
        private ticketTypeService: TicketTypeService,
        private priorityTypeService: PriorityTypeService,
        private userService: UserService,
        public dialogRef: MatDialogRef<CreateTicketComponent>) {
    }

    ngOnInit() {
        this.ticketTypeService.getTicketTypes()
            .subscribe(data => {
                this.ticketTypes = data;
                this.ticket.type = data.filter(_ => _.defaultTicketType)[0].ticketTypeName;
            });

        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data;
                this.ticket.priority = data.filter(_ => _.defaultPriorityType)[0].priorityTypeName;
            });
        this.userService.getAssignee()
            .subscribe(data => {
                this.userNameGroups = data
                this.userNameGroupOptions = this.userNameForm.get('userNameGroup')!.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this._filterGroup(value))
                    );
            });
    }

    private _filterGroup(value: string): UserNameGroup[] {
        if (value) {
            return this.userNameGroups
                .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
                .filter(group => group.names.length > 0);
        }
        return this.userNameGroups;
    }

    setAssignee(userFullName: string) {
        this.ticket.assignedTo = userFullName;
    }

    createTicket(): void {
        this.ticketService.createTicket(this.ticket)
            .subscribe(data => {
                this.toastService.success(`Ticket ${data.name} added`);
                this.dialogRef.close(false);
            });
    };

}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
