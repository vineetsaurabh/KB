import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Team } from './team.model';
import { TeamService } from './team.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';

@Component({
    templateUrl: './add-team.component.html'
})
export class AddTeamComponent extends SelectUserComponent {

    team: Team = new Team();

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private teamService: TeamService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddTeamComponent>) {
        super(fb, userService);
    }

    createTeam(userForm: NgForm): void {
        this.teamService.createTeam(this.team)
            .subscribe(data => {
                this.toastService.success(`User ${this.team.teamName} added`);
                this.dialogRef.close(false);
            });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setSpoc(user: User) {
        this.team.spoc = user;
    }

}