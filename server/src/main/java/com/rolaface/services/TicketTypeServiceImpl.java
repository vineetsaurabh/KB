package com.rolaface.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketType;
import com.rolaface.repositories.TicketTypeRepository;

@Service(value = "ticketTypeService")
public class TicketTypeServiceImpl implements TicketTypeService {

	@Autowired
	public TicketTypeRepository repository;

	@Override
	public TicketType create(TicketType ticketType) {
		return repository.save(ticketType);
	}

	@Override
	public TicketType findById(int id) {
		return repository.findByTicketTypeId(id);
	}

	@Override
	public List<TicketType> findAll() {
		return repository.findAll();
	}

	@Transactional
	@Override
	public TicketType update(TicketType ticketType) {
		TicketType defaultTicketType = null;
		TicketType ticketTypeToUpdate = findById(ticketType.getTicketTypeId());
		if (ticketTypeToUpdate != null) {
			ticketTypeToUpdate.setTicketTypeName(ticketType.getTicketTypeName());
			ticketTypeToUpdate.setDescription(ticketType.getDescription());
			if (!ticketTypeToUpdate.isDefaultTicketType()) {
				defaultTicketType = repository.findDefaultTicketType();
				if (defaultTicketType != null) {
					defaultTicketType.setDefaultTicketType(Boolean.FALSE);
					repository.save(defaultTicketType);
				}
				ticketTypeToUpdate.setDefaultTicketType(ticketType.isDefaultTicketType());
			}
		}
		return repository.save(ticketTypeToUpdate);
	}

	@Override
	public TicketType delete(int id) {
		TicketType ticketTypeToDelete = findById(id);
		if (ticketTypeToDelete != null) {
			repository.delete(ticketTypeToDelete);
		}
		return ticketTypeToDelete;
	}

}
