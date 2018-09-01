package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.TicketSearchHistory;
import com.rolaface.model.SearchStringAndCount;

@Repository
public interface TicketSearchHistoryRepository extends JpaRepository<TicketSearchHistory, Long> {

	@Override
	TicketSearchHistory save(TicketSearchHistory ticketSearchHistory);

	TicketSearchHistory findByTicketSearchHistoryId(int ticketSearchHistoryId);

	List<TicketSearchHistory> findByUserid(int userid);

	List<TicketSearchHistory> findBySearchString(String searchString);

	@Override
	List<TicketSearchHistory> findAll();

	@Override
	void delete(TicketSearchHistory ticketSearchHistory);

	@Query(value = "SELECT search_string as searchString, COUNT(search_string) as searchStringCount "
			+ "FROM ticket_search_history GROUP BY search_string ORDER BY COUNT(search_string) DESC LIMIT 25", nativeQuery = true)
	List<SearchStringAndCount> findMostSearchedString();

}