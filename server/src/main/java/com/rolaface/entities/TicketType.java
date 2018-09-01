package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ticket_types")
public class TicketType {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketTypeId;

	@Column(name = "ticket_type_name", unique = true, nullable = false)
	private String ticketTypeName;

	@Column
	private String description;

	@Column(name = "default_ticket_type", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean defaultTicketType;

	public int getTicketTypeId() {
		return ticketTypeId;
	}

	public void setTicketTypeId(int ticketTypeId) {
		this.ticketTypeId = ticketTypeId;
	}

	public String getTicketTypeName() {
		return ticketTypeName;
	}

	public void setTicketTypeName(String ticketTypeName) {
		this.ticketTypeName = ticketTypeName;
	}

	public boolean isDefaultTicketType() {
		return defaultTicketType;
	}

	public void setDefaultTicketType(boolean defaultTicketType) {
		this.defaultTicketType = defaultTicketType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}