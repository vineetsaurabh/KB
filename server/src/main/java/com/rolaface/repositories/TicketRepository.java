package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

	@Override
	Ticket save(Ticket ticket);

	Ticket findByTicketId(int id);

	Ticket findByName(String name);

	List<Ticket> findByType(String type);

	@Query(value = "SELECT * FROM tickets t WHERE t.summary LIKE %:input% OR t.name LIKE %:input% OR t.description LIKE %:input%", nativeQuery = true)
	List<Ticket> findTickets(String input);

	@Query(value = "SELECT t.* FROM tickets t WHERE t.assigned_to_userid IN "
			+ "(SELECT b.userid FROM users_teams a, users_teams b WHERE a.teamid = b.teamid AND A.userid = ?1)", nativeQuery = true)
	List<Ticket> findMyTeamTickets(int userid);

	List<Ticket> findByPriority(String priority);

	@Override
	List<Ticket> findAll();

	@Override
	void delete(Ticket ticket);

}
