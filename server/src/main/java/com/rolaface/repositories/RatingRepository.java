package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

	@Override
	Rating save(Rating rating);

	Rating findByRatingId(int ratingId);

	@Query(value = "SELECT * FROM ratings c WHERE c.ticket_id = ?1 AND c.userid = ?2", nativeQuery = true)
	Rating findMyRatingForTicket(int ticketId, int userid);

	List<Rating> findByTicketId(int ticketId);

	List<Rating> findByUserid(int userid);

	@Override
	List<Rating> findAll();

	@Override
	void delete(Rating rating);

}
