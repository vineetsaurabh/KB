import { HomepageComponent } from './login/homepage.component';

import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgxEditorModule } from 'ngx-editor';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { UserService } from './user/user.service';
import { EditUserComponent } from './user/edit-user.component';
import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';


import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material';
import { AuthService } from './login/auth.service';
import { TokenStorage } from './login/token.storage';
import { AuthInterceptor } from './login/auth.inteceptor';
import { ConfirmDeleteComponent } from './util/confirm-delete.component';
import { TableConfiguratorComponent } from './util/table-configurator.component';
import { HeaderComponent } from './common/header.component';
import { ReportService } from './report/report.service';
import { SearchReportMonthwiseComponent } from './report/search-report-monthwise.component';
import { SearchReportInputwiseComponent } from './report/search-report-inputwise.component';
import { ReadMoreComponent } from './util/read-more.component';
import { RoleService } from './role/role.service';
import { AddRoleComponent } from './role/add-role.component';
import { ListRoleComponent } from './role/list-role.component';
import { EditRoleComponent } from './role/edit-role.component';
import { AssignRoleComponent } from './user/assign-role.component';
import { CreateTicketComponent } from './ticket/create-ticket.component';
import { EditTicketComponent } from './ticket/edit-ticket.component';
import { ListTicketComponent } from './ticket/list-ticket.component';
import { TicketService } from './ticket/ticket.service';
import { SubscribedTicketsComponent } from './ticket/subscribe-ticket.component';
import { TicketDetailComponent } from './ticket/ticket-detail.component';
import { FindTicketResultComponent } from './ticket/find-ticket-result.component';
import { CommentComponent } from './comment/comment.component';
import { ListCommentComponent } from './comment/list-comment.component';
import { CommentService } from './comment/comment.service';
import { MyReportedTicketsComponent } from './ticket-filter/my-reported-tickets.component';
import { MyAssignedTicketsComponent } from './ticket-filter/my-assigned-tickets.component';
import { PriorityTicketsComponent } from './ticket-filter/priority-tickets.component';
import { RecentTicketsComponent } from './ticket-filter/recent-tickets.component';
import { MyTeamTicketsComponent } from './ticket-filter/my-team-tickets.component';
import { PriorityReportComponent } from './report/priority-report.component';
import { AssignTicketComponent } from './ticket/assign-ticket.component';
import { AssignTeamComponent } from './user/assign-team.component';
import { TeamService } from './team/team.service';
import { AddTeamComponent } from './team/add-team.component';
import { ListTeamComponent } from './team/list-team.component';
import { EditTeamComponent } from './team/edit-team.component';
import { AddTicketTypeComponent } from './ticket-type/add-ticket-type.component';
import { ListTicketTypeComponent} from './ticket-type/list-ticket-type.component';
import { EditTicketTypeComponent } from './ticket-type/edit-ticket-type.component';
import { TicketTypeService } from './ticket-type/ticket-type.service';
import { AddPriorityTypeComponent } from './priority-type/add-priority-type.component';
import { ListPriorityTypeComponent} from './priority-type/list-priority-type.component';
import { EditPriorityTypeComponent } from './priority-type/edit-priority-type.component';
import { PriorityTypeService } from './priority-type/priority-type.service';
import { StateService } from './state/state.service';
import { AddStateComponent } from './state/add-state.component';
import { ListStateComponent } from './state/list-state.component';
import { EditStateComponent } from './state/edit-state.component';
import { ProductService } from './product/product.service';
import { AddProductComponent } from './product/add-product.component';
import { ListProductComponent } from './product/list-product.component';
import { EditProductComponent } from './product/edit-product.component';
import { ModuleService } from './module/module.service';
import { AddModuleComponent } from './module/add-module.component';
import { ListModuleComponent } from './module/list-module.component';
import { EditModuleComponent } from './module/edit-module.component';
import { FaqService } from './faq/faq.service';
import { AddFaqComponent } from './faq/add-faq.component';
import { ListFaqComponent } from './faq/list-faq.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent, HeaderComponent, HomepageComponent,
        AddUserComponent, ListUserComponent, EditUserComponent,
        FindUserComponent, UserDetailComponent,
        ConfirmDeleteComponent, TableConfiguratorComponent, ReadMoreComponent,
        CreateTicketComponent, ListTicketComponent, EditTicketComponent, AssignTicketComponent,
        FindTicketResultComponent, TicketDetailComponent,
        CommentComponent, ListCommentComponent,
        SubscribedTicketsComponent, MyReportedTicketsComponent, MyAssignedTicketsComponent, MyTeamTicketsComponent,
        PriorityTicketsComponent, RecentTicketsComponent,
        PriorityReportComponent,
        SearchReportMonthwiseComponent, SearchReportInputwiseComponent,
        AddRoleComponent, ListRoleComponent, EditRoleComponent, AssignRoleComponent,
        AddTeamComponent, ListTeamComponent, EditTeamComponent, AssignTeamComponent,
        AddTicketTypeComponent, ListTicketTypeComponent, EditTicketTypeComponent,
        AddPriorityTypeComponent, ListPriorityTypeComponent, EditPriorityTypeComponent,
        AddStateComponent, ListStateComponent, EditStateComponent,
        AddProductComponent, ListProductComponent, EditProductComponent,
        AddModuleComponent, ListModuleComponent, EditModuleComponent,
        AddFaqComponent, ListFaqComponent, FaqComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        ToastContainerModule,
        FlexLayoutModule,
        NgxEditorModule,
        MomentModule,

        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    providers: [
        UserService,
        AuthService,
        ReportService,
        TokenStorage,
        TicketService,
        CommentService,
        RoleService, TeamService,
        ProductService, ModuleService,
        TicketTypeService, PriorityTypeService, StateService,
        FaqService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
