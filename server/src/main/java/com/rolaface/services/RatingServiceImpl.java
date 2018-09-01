package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Rating;
import com.rolaface.repositories.RatingRepository;

@Service(value = "ratingService")
public class RatingServiceImpl implements RatingService {

	@Autowired
	private RatingRepository repository;

	@Override
	public Rating create(Rating rating) {
		return repository.save(rating);
	}

	@Override
	public Rating findById(int ratingid) {
		return repository.findByRatingId(ratingid);
	}

	@Override
	public Rating findMyRatingForTicket(int ticketId, int userid) {
		return repository.findMyRatingForTicket(ticketId, userid);
	}

	@Override
	public List<Rating> findAll() {
		return repository.findAll();
	}

	@Override
	public Rating update(Rating rating) {
		Rating ratingToUpdate = findById(rating.getRatingId());
		if (ratingToUpdate != null) {
			ratingToUpdate.setRating(rating.getRating());
			rating = repository.save(ratingToUpdate);
		}
		return rating;
	}

	@Override
	public Rating delete(int ratingid) {
		Rating rating = findById(ratingid);
		if (rating != null) {
			repository.delete(rating);
		}
		return rating;
	}

}
