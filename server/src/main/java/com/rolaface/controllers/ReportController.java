package com.rolaface.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.TicketSearchHistory;
import com.rolaface.model.SearchStringAndCount;
import com.rolaface.services.TicketSearchHistoryService;

@RestController
@RequestMapping({ "/report" })
public class ReportController {

	@Autowired
	private TicketSearchHistoryService ticketSearchHistoryService;

	@GetMapping(value = "/findallsearch")
	public List<TicketSearchHistory> findAll() {
		return ticketSearchHistoryService.findAll();
	}

	@GetMapping(value = "/mostsearchstring")
	public Map<String, Long> findMostSearchedString() {
		List<SearchStringAndCount> searchStringAndCountList = ticketSearchHistoryService.findMostSearchedString();
		Map<String, Long> searchStringAndCountMap = searchStringAndCountList.stream().collect(Collectors
				.toMap(SearchStringAndCount::getSearchString, SearchStringAndCount::getSearchStringCount, (u, v) -> {
					throw new IllegalStateException(String.format("Duplicate key %s", u));
				}, LinkedHashMap::new));
		return searchStringAndCountMap;
	}

}
