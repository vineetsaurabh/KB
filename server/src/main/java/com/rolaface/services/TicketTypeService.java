package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketType;

@Service
public interface TicketTypeService {

	TicketType create(TicketType ticketType);

	TicketType findById(int id);

	List<TicketType> findAll();

	TicketType update(TicketType ticketType);

	TicketType delete(int id);

}
