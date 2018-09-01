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
@Table(name = "ticket_subscribe")
public class TicketSubscribe {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int subsciptionId;

	@Column(nullable = false)
	private int ticketId;

	@Column(nullable = false)
	private int userid;

	@Column(nullable = false)
	private String email;

	@Temporal(TemporalType.TIMESTAMP)
	@Column
	private Date subscribedOn;

	public int getSubsciptionId() {
		return subsciptionId;
	}

	public void setSubsciptionId(int subsciptionId) {
		this.subsciptionId = subsciptionId;
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getSubscribedOn() {
		return subscribedOn;
	}

	public void setSubscribedOn(Date subscribedOn) {
		this.subscribedOn = subscribedOn;
	}

}
