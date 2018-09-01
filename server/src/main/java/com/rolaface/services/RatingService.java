package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Rating;

@Service
public interface RatingService {

	Rating create(Rating rating);

	Rating findById(int ratingid);

	Rating findMyRatingForTicket(int ticketId, int userid);

	List<Rating> findAll();

	Rating update(Rating rating);

	Rating delete(int ratingid);

}
