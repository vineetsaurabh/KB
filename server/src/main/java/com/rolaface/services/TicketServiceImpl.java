package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Ticket;
import com.rolaface.repositories.TicketRepository;

@Service(value = "ticketService")
public class TicketServiceImpl implements TicketService {

	@Autowired
	private TicketRepository repository;

	@Override
	public Ticket save(Ticket ticket) {
		return repository.save(ticket);
	}

	@Override
	public Ticket findByName(String name) {
		return repository.findByName(name);
	}

	@Override
	public Ticket findById(int id) {
		return repository.findByTicketId(id);
	}

	@Override
	public List<Ticket> findTicketsByType(String type) {
		return repository.findTicketsByType(type);
	}

	@Override
	public List<Ticket> findTickets(String input) {
		return repository.findTickets(input);
	}

	@Override
	public List<Ticket> findAll() {
		return repository.findAll();
	}

	@Override
	public Ticket update(Ticket ticket) {
		Ticket ticketToUpdate = findById(ticket.getTicketId());
		if (ticketToUpdate != null) {
			ticketToUpdate.setType(ticket.getType());
			ticketToUpdate.setSummary(ticket.getSummary());
			ticketToUpdate.setDescription(ticket.getDescription());
			ticketToUpdate.setPriority(ticket.getPriority());
			ticketToUpdate.setProduct(ticket.getProduct());
			ticketToUpdate.setModule(ticket.getModule());
			ticketToUpdate.setOperation(ticket.getOperation());
			ticketToUpdate.setRatings(ticket.getRatings());

			ticketToUpdate.setStatus(ticket.getStatus());
			ticketToUpdate.setStatusLabel(ticket.getStatusLabel());
			ticketToUpdate.setLastModifiedDate(ticket.getLastModifiedDate());
			ticketToUpdate.setLastModifiedBy(ticket.getLastModifiedBy());
			ticketToUpdate.setCreatedBy(ticket.getCreatedBy());
			ticketToUpdate.setCreationDate(ticket.getCreationDate());
			ticketToUpdate.setAssignedTo(ticket.getAssignedTo());
			ticketToUpdate.setAssignedBy(ticket.getAssignedBy());
			ticketToUpdate.setAssignedOn(ticket.getAssignedOn());
			ticketToUpdate.setClosedBy(ticket.getClosedBy());
			ticketToUpdate.setClosedOn(ticket.getClosedOn());
			repository.save(ticketToUpdate);
		}
		return ticket;
	}

	@Override
	public Ticket delete(int ticketId) {
		Ticket ticketToDelete = findById(ticketId);
		repository.delete(ticketToDelete);
		return ticketToDelete;
	}

}
