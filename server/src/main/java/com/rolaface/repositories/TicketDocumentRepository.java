package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.TicketDocument;

@Repository
public interface TicketDocumentRepository extends JpaRepository<TicketDocument, Long> {

	@Override
	TicketDocument save(TicketDocument ticketDocument);

	TicketDocument findByTicketDocId(int id);

	List<TicketDocument> findByTicketId(int id);

	@Override
	List<TicketDocument> findAll();

	@Override
	void delete(TicketDocument ticketDocument);

}