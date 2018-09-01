package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Comment;

@Service
public interface CommentService {

	Comment save(Comment comment);

	Comment findById(int commentId);

	List<Comment> findByTicketId(int ticketId);

	Comment update(Comment comment);

	Comment delete(int commentId);

}
