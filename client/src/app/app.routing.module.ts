import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';

import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { LoginComponent } from './login/login.component';
import { ConfirmDeleteComponent } from './util/confirm-delete.component';
import { SearchReportMonthwiseComponent } from './report/search-report-monthwise.component';
import { SearchReportInputwiseComponent } from './report/search-report-inputwise.component';
import { HomepageComponent } from './login/homepage.component';
import { ListRoleComponent } from './role/list-role.component';
import { EditRoleComponent } from './role/edit-role.component';
import { AddRoleComponent } from './role/add-role.component';
import { TableConfiguratorComponent } from './util/table-configurator.component';
import { AssignRoleComponent } from './user/assign-role.component';
import { EditTicketComponent } from './ticket/edit-ticket.component';
import { CreateTicketComponent } from './ticket/create-ticket.component';
import { ListTicketComponent } from './ticket/list-ticket.component';
import { SubscribedTicketsComponent } from './ticket/subscribe-ticket.component';
import { TicketDetailComponent } from './ticket/ticket-detail.component';
import { FindTicketResultComponent }  from './ticket/find-ticket-result.component';
import { AssignTicketComponent } from './ticket/assign-ticket.component';
import { AddTeamComponent } from './team/add-team.component';
import { ListTeamComponent } from './team/list-team.component';
import { EditTeamComponent } from './team/edit-team.component';
import { AssignTeamComponent } from './user/assign-team.component';
import { AddTicketTypeComponent } from './ticket-type/add-ticket-type.component';
import { ListTicketTypeComponent } from './ticket-type/list-ticket-type.component';
import { EditTicketTypeComponent } from './ticket-type/edit-ticket-type.component';
import { AddPriorityTypeComponent } from './priority-type/add-priority-type.component';
import { ListPriorityTypeComponent } from './priority-type/list-priority-type.component';
import { EditPriorityTypeComponent } from './priority-type/edit-priority-type.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'homepage',
        component: HomepageComponent
    },
        {
        path: 'find',
        component: FindTicketResultComponent
    },
    {
        path: 'addUser',
        component: AddUserComponent
    },
    {
        path: 'listUsers',
        component: ListUserComponent,
        children: [
            {
                path: ':id',
                component: EditUserComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            },
            {
                path: '',
                component: AssignRoleComponent
            },
            {
                path: '',
                component: AssignTeamComponent
            }
        ]
    },
    {
        path: 'findUser',
        component: FindUserComponent,
        children: [
            {
                path: ':id',
                component: UserDetailComponent
            },
            {
                path: '',
                component: ConfirmDeleteComponent
            }
        ]
    },
    {
        path: 'addRole',
        component: AddRoleComponent
    },
    {
        path: 'listRoles',
        component: ListRoleComponent,
        children: [
            {
                path: ':id',
                component: EditRoleComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
	{
        path: 'addTeam',
        component: AddTeamComponent
    },
    {
        path: 'listTeams',
        component: ListTeamComponent,
        children: [
            {
                path: ':id',
                component: EditTeamComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'createTicket',
        component: CreateTicketComponent
    },
    {
        path: 'listTickets',
        component: ListTicketComponent,
        children: [
            {
                path: ':id',
                component: EditTicketComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            },
            {
                path: '',
                component: AssignTicketComponent
            }
        ]
    },
    {
        path: 'subscribedTickets',
        component: SubscribedTicketsComponent
    },
    {
        path: 'findTicket/:id',
        component: TicketDetailComponent
    },
    {
        path: 'searchReportMonthwise',
        component: SearchReportMonthwiseComponent
    },
    {
        path: 'searchReportInputwise',
        component: SearchReportInputwiseComponent
    },
    {
        path: 'addticketType',
        component: AddTicketTypeComponent
    },
    {
        path: 'listTicketTypes',
        component: ListTicketTypeComponent,
        children: [
            {
                path: ':id',
                component: EditTicketTypeComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'addPriorityType',
        component: AddPriorityTypeComponent
    },
    {
        path: 'listPriorityTypes',
        component: ListPriorityTypeComponent,
        children: [
            {
                path: ':id',
                component: EditPriorityTypeComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }