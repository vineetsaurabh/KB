import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { TicketType } from '../ticket-type/ticket-type.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserNameGroup } from '../user/user-name-group.model';

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

    private _filterGroup(value: any): UserNameGroup[] {
        if (value) {
            return this.userNameGroups
                .map(group => ({ letter: group.letter, assignees: _filter(group.assignees, value) }))
                .filter(group => group.assignees.length > 0);
        }
        return this.userNameGroups;
    }

    displayFn(user?: User): string | undefined {
        return user ? user.firstName + " " + user.lastName : undefined;
    }

    setAssignee(user: User) {
        this.ticket.assignedTo = user;
    }

    createTicket(): void {
        this.ticketService.createTicket(this.ticket)
            .subscribe(data => {
                this.toastService.success(`Ticket ${data.name} added`);
                this.dialogRef.close(false);
            });
    };

}

export const _filter = (options: User[], user: User): User[] => {
    const filterValue = user.firstName.toLowerCase();
    return options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
};
