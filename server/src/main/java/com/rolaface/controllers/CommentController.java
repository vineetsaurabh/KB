package com.rolaface.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.Comment;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.services.CommentService;
import com.rolaface.services.UserService;

@RestController
@RequestMapping({ "/comment" })
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping
	public Comment create(@RequestBody Comment comment) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		User user = userService.findById(userId);
		comment.setUser(user);
		comment.setCreatedOn(new Date());
		return commentService.save(comment);
	}

	@GetMapping(value = "/findbyticketid", params = "ticketid")
	public List<Comment> findByTicketId(@RequestParam("ticketid") String ticketId) {
		return commentService.findByTicketId(Integer.parseInt(ticketId));
	}

	@PutMapping(path = { "/{id}" })
	public Comment update(@RequestBody Comment comment) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		if (userId == comment.getUser().getUserid()) {
			comment = commentService.update(comment);
		}
		// TODO : ExceptionHandling
		return comment;
	}

	@DeleteMapping(path = { "/{id}" })
	public Comment delete(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		Comment comment = commentService.findById(id);
		if (userId == comment.getUser().getUserid()) {
			comment = commentService.delete(id);
		}
		// TODO : ExceptionHandling
		return comment;
	}

}
