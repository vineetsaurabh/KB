package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketSubscribe;

@Service
public interface TicketSubscribeService {

	TicketSubscribe save(TicketSubscribe ticketSubscribe);
	
	List<TicketSubscribe> findAll();

	TicketSubscribe findBySubsciptionId(int subsciptionId);

	List<TicketSubscribe> findByTicketId(int ticketId);

	List<TicketSubscribe> findByUserid(int userid);

	TicketSubscribe findSubscription(int ticketId, int userid);

	List<String> findSubscribedEmails(int ticketId);
	
	void delete(TicketSubscribe ticketSubscribe);

}