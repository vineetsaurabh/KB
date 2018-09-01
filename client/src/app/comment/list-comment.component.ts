import { Input, Component } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { TokenStorage } from '../login/token.storage';


@Component({
    selector: 'list-comment',
    templateUrl: './list-comment.component.html'
})
export class ListCommentComponent {

    @Input() ticketId: string;

    comments: Set<Comment>;
    htmlContent: string = '';
    userid: string;

    constructor(
        private toastService: ToastrService,
        private commentService: CommentService,
        private token: TokenStorage) {
    }

    ngOnInit() {
        this.userid = this.token.getCurrentUserId();
        this.getCommentsByTicketId();
    }

    getCommentsByTicketId() {
        this.commentService.getCommentsByTicketId(this.ticketId)
            .subscribe(data => {
                this.comments = data;
            });
    }

    saveComment(): void {
        let comment = new Comment();
        comment.content = this.htmlContent;
        comment.ticketId = this.ticketId;
        comment.userid = this.userid;
        this.commentService.createComment(comment)
            .subscribe(data => {
                this.htmlContent = '';
                this.getCommentsByTicketId();
                this.toastService.success(`Comment added`);
            });
    };

}
