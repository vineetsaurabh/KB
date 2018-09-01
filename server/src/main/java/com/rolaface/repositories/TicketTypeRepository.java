package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.TicketType;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {

	@Override
	TicketType save(TicketType ticketType);

	TicketType findByTicketTypeName(String name);

	TicketType findByTicketTypeId(int ticketTypeId);

	@Query(value = "SELECT * FROM ticket_types t WHERE t.default_ticket_type = true", nativeQuery = true)
	TicketType findDefaultTicketType();

	@Override
	List<TicketType> findAll();

	@Override
	void delete(TicketType ticketType);

}
