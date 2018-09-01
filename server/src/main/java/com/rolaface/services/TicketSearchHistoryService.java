package com.rolaface.services;

import java.util.List;

import com.rolaface.entities.TicketSearchHistory;
import com.rolaface.model.SearchStringAndCount;

public interface TicketSearchHistoryService {

	TicketSearchHistory create(TicketSearchHistory ticketSearchHistory);

	TicketSearchHistory findById(int ticketSearchHistoryId);

	List<TicketSearchHistory> findBySearchString(String searchString);

	List<TicketSearchHistory> findByUserid(int userid);

	List<TicketSearchHistory> findAll();

	List<SearchStringAndCount> findMostSearchedString();

	TicketSearchHistory delete(int ticketSearchHistoryId);

}
