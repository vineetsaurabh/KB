package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.TicketType;
import com.rolaface.services.TicketTypeService;

@RestController
@RequestMapping({ "/tickettype" })
public class TicketTypeController {

	@Autowired
	public TicketTypeService ticketTypeService;

	@PostMapping
	public TicketType create(@RequestBody TicketType ticketType) {
		return ticketTypeService.create(ticketType);
	}

	@GetMapping(path = { "/{id}" })
	public TicketType findById(@PathVariable("id") int id) {
		return ticketTypeService.findById(id);
	}

	@GetMapping
	public List<TicketType> findAll() {
		return ticketTypeService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public TicketType update(@RequestBody TicketType ticketType) {
		return ticketTypeService.update(ticketType);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public TicketType delete(@PathVariable("id") int id) {
		return ticketTypeService.delete(id);
	}

}
