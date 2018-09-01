package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Ticket;

@Service
public interface TicketService {

	Ticket save(Ticket ticket);

	Ticket findById(int id);

	Ticket findByName(String name);

	List<Ticket> findTicketsByType(String type);

	List<Ticket> findTickets(String input);

	List<Ticket> findAll();

	Ticket update(Ticket ticket);

	Ticket delete(int ticketId);

}
