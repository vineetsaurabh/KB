import { TokenStorage } from '../login/token.storage';
import { Component, Input, OnInit } from "@angular/core";
import { CommentService } from './comment.service';
import { ToastrService } from 'ngx-toastr';
import { Comment } from './comment.model';


@Component({
    selector: 'comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    @Input() comment: Comment;

    userid: string;
    htmlContent: string = '';
    edithtmlContent: string = '';
    editing: boolean = false;
    deleted: boolean = false;

    constructor(
        private commentService: CommentService,
        private toastService: ToastrService,
        private token: TokenStorage
    ) { }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
    }

    openInEdit() {
        this.editing = true; 
        this.edithtmlContent = this.comment.content;
    }

    updateComment(): void {
        if(this.comment.content != this.edithtmlContent) {
            this.comment.content = this.edithtmlContent;
            this.commentService.updateComment(this.comment)
                .subscribe(data => {
                    this.comment = data;
                    this.toastService.success(`Comment updated`);
                    this.editing = false;
                });
        } else {
            this.editing = false;
        }
    };

    deleteComment(comment): void {
        this.commentService.deleteComment(comment)
            .subscribe(data => {
                this.deleted = true;
                this.toastService.success(`Comment deleted`);
            });
    };

}
