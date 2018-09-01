package com.rolaface.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Comment;
import com.rolaface.repositories.CommentRepository;

@Service(value = "commentService")
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository repository;

	@Override
	public Comment save(Comment comment) {
		return repository.save(comment);
	}

	@Override
	public Comment findById(int id) {
		return repository.findByCommentId(id);
	}

	@Override
	public List<Comment> findByTicketId(int ticketId) {
		return repository.findByTicketId(ticketId);
	}

	@Override
	public Comment update(Comment comment) {
		Comment commentToUpdate = findById(comment.getCommentId());
		if (commentToUpdate != null) {
			commentToUpdate.setContent(comment.getContent());
			commentToUpdate.setModifiedOn(new Date());
			comment = repository.save(commentToUpdate);
		}
		return comment;
	}

	@Override
	public Comment delete(int id) {
		Comment comment = findById(id);
		if (comment != null) {
			repository.delete(comment);
		}
		return comment;
	}

}
