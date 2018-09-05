import { Component, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Team } from './team.model';
import { TeamService } from './team.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';

@Injectable()
@Component({
    templateUrl: './edit-team.component.html'
})
export class EditTeamComponent extends SelectUserComponent {

    public team: Team = {
        teamid: '',
        teamName: '',
        description: '',
        users: new Set<User>(),
        spoc: new User(),
        spocUserName: '',
        spocUserId: '',
        checked: false,
    };
    id: string;
    teamForm: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private teamService: TeamService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditTeamComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Team) {
        super(fb, userService);
        this.team = this.data;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.team.spoc);
        this.teamForm = this.fb.group({
            teamid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
    }

    updateTeam() {
        this.teamService.updateTeam(this.team)
            .subscribe(res => {
                this.toastService.success(`User ${this.team.teamName} updated`);
                this.dialogRef.close(false);
            });
    }

    setSpoc(user: User) {
        this.team.spoc = user;
    }

}
