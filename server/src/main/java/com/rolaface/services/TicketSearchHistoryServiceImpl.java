package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketSearchHistory;
import com.rolaface.model.SearchStringAndCount;
import com.rolaface.repositories.TicketSearchHistoryRepository;

@Service
public class TicketSearchHistoryServiceImpl implements TicketSearchHistoryService {

	@Autowired
	private TicketSearchHistoryRepository repository;

	@Override
	public TicketSearchHistory create(TicketSearchHistory ticketSearchHistory) {
		return repository.save(ticketSearchHistory);
	}

	@Override
	public List<TicketSearchHistory> findBySearchString(String searchString) {
		return repository.findBySearchString(searchString);
	}

	@Override
	public TicketSearchHistory findById(int ticketSearchHistoryId) {
		return repository.findByTicketSearchHistoryId(ticketSearchHistoryId);
	}

	@Override
	public List<TicketSearchHistory> findByUserid(int userid) {
		return repository.findByUserid(userid);
	}

	@Override
	public List<TicketSearchHistory> findAll() {
		return repository.findAll();
	}

	@Override
	public List<SearchStringAndCount> findMostSearchedString() {
		return repository.findMostSearchedString();
	}

	@Override
	public TicketSearchHistory delete(int ticketSearchHistoryId) {
		TicketSearchHistory ticketSearchHistory = findById(ticketSearchHistoryId);
		if (ticketSearchHistory != null) {
			repository.delete(ticketSearchHistory);
		}
		return ticketSearchHistory;
	}

}
