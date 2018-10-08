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
import { AddStateComponent } from './state/add-state.component';
import { ListStateComponent } from './state/list-state.component';
import { EditStateComponent } from './state/edit-state.component';
import { AddProductComponent } from './product/add-product.component';
import { ListProductComponent } from './product/list-product.component';
import { EditProductComponent } from './product/edit-product.component';
import { AddModuleComponent } from './module/add-module.component';
import { ListModuleComponent } from './module/list-module.component';
import { EditModuleComponent } from './module/edit-module.component';
import { AddFaqComponent } from './faq/add-faq.component';
import { ListFaqComponent } from './faq/list-faq.component';
import { AddFaqSectionComponent } from './faq-section/add-faq-section.component';
import { EditFaqSectionComponent } from './faq-section/edit-faq-section.component';
import { ListFaqSectionComponent } from './faq-section/list-faq-section.component';
import { UserPreferenceComponent } from './user-preference/user-preference.component';

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
    {
        path: 'createState',
        component: AddStateComponent
    },
    {
        path: 'listStates',
        component: ListStateComponent,
        children: [
            {
                path: ':id',
                component: EditStateComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'addProduct',
        component: AddProductComponent
    },
    {
        path: 'listProducts',
        component: ListProductComponent,
        children: [
            {
                path: ':id',
                component: EditProductComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'addModule',
        component: AddModuleComponent
    },
    {
        path: 'listModules',
        component: ListModuleComponent,
        children: [
            {
                path: ':id',
                component: EditModuleComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'addFaq',
        component: AddFaqComponent
    },
    {
        path: 'listFaqs',
        component: ListFaqComponent
    },
    {
        path: 'addFaqSection',
        component: AddFaqSectionComponent
    },
    {
        path: 'listFaqSections',
        component: ListFaqSectionComponent,
        children: [
            {
                path: ':id',
                component: EditFaqSectionComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'myPreferences',
        component: UserPreferenceComponent
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
