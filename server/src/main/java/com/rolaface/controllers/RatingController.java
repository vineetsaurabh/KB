package com.rolaface.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.Rating;
import com.rolaface.entities.Ticket;
import com.rolaface.model.ContextUser;
import com.rolaface.services.RatingService;
import com.rolaface.services.TicketService;

@RestController
@RequestMapping({ "/rating" })
public class RatingController {

	@Autowired
	private RatingService ratingService;

	@Autowired
	private TicketService causeService;

	@PostMapping
	public Rating create(@RequestBody Rating rating) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Ticket ticket = causeService.findById(rating.getTicketId());
		if (!user.getUsername().equals(ticket.getCreatedBy())) {
			rating.setUserid(user.getUserId());
			rating = ratingService.create(rating);
		}
		return rating;
	}

	@GetMapping(path = { "/{id}" })
	public Rating findRating(@PathVariable("id") int id) {
		return ratingService.findById(id);
	}

	private Rating findMyRatingForTicket(int causeid, int userid) {
		return ratingService.findMyRatingForTicket(causeid, userid);
	}

	@GetMapping
	public List<Rating> findAll() {
		return ratingService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public Rating update(@RequestBody Rating rating) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		Rating ratingToUpdate = findMyRatingForTicket(rating.getTicketId(), userId);
		if (ratingToUpdate != null) {
			ratingToUpdate.setRating(rating.getRating());
			rating = ratingService.update(ratingToUpdate);
		}
		return rating;
	}

	@DeleteMapping(path = { "/{id}" })
	public Rating delete(@PathVariable("id") int id) {
		return ratingService.delete(id);
	}

}
