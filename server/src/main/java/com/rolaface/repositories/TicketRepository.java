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

	@Query(value = "SELECT * FROM tickets t WHERE t.type = ?1", nativeQuery = true)
	List<Ticket> findTicketsByType(String domain);

	@Query(value = "SELECT * FROM tickets t WHERE t.summary LIKE %:input% OR t.name LIKE %:input%", nativeQuery = true)
	List<Ticket> findTickets(String input);

	@Override
	List<Ticket> findAll();

	@Override
	void delete(Ticket ticket);

}