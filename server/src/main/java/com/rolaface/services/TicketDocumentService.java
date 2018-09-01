package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketDocument;

@Service
public interface TicketDocumentService {

	TicketDocument create(TicketDocument ticketDocument);

	TicketDocument findById(int id);

	List<TicketDocument> findByTicketId(int ticketId);

	TicketDocument delete(int id);

}