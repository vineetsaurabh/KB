package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Override
	Comment save(Comment comment);

	Comment findByCommentId(int id);

	List<Comment> findByTicketId(int ticketId);

	@Override
	List<Comment> findAll();

	@Override
	void delete(Comment comment);

}
