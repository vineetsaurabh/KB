package com.rolaface.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ticket_search_history")
public class TicketSearchHistory {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketSearchHistoryId;

	@Column(name = "search_string")
	private String searchString;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "search_time")
	private Date searchedOn;

	@Column
	private int userid;

	public int getTicketSearchHistoryId() {
		return ticketSearchHistoryId;
	}

	public void setTicketSearchHistoryId(int ticketSearchHistoryId) {
		this.ticketSearchHistoryId = ticketSearchHistoryId;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public Date getSearchedOn() {
		return searchedOn;
	}

	public void setSearchedOn(Date searchedOn) {
		this.searchedOn = searchedOn;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

}
