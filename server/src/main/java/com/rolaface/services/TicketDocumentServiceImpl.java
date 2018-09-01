package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketDocument;
import com.rolaface.repositories.TicketDocumentRepository;

@Service(value = "ticketDocumentService")
public class TicketDocumentServiceImpl implements TicketDocumentService {

	@Autowired
	private TicketDocumentRepository repository;

	@Override
	public TicketDocument create(TicketDocument ticketDocument) {
		return repository.save(ticketDocument);
	}

	@Override
	public TicketDocument findById(int id) {
		return repository.findByTicketDocId(id);
	}

	@Override
	public List<TicketDocument> findByTicketId(int ticketid) {
		return repository.findByTicketId(ticketid);
	}

	@Override
	public TicketDocument delete(int id) {
		TicketDocument ticketDocument = findById(id);
		if (ticketDocument != null) {
			repository.delete(ticketDocument);
		}
		return ticketDocument;
	}

}
