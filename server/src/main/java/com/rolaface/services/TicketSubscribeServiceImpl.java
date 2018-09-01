package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.TicketSubscribe;
import com.rolaface.repositories.TicketSubscribeRepository;

@Service(value = "ticketSubscribeService")
public class TicketSubscribeServiceImpl implements TicketSubscribeService {

	@Autowired
	private TicketSubscribeRepository repository;

	@Override
	public TicketSubscribe save(TicketSubscribe flexErrorSubscribe) {
		return repository.save(flexErrorSubscribe);
	}

	@Override
	public void delete(TicketSubscribe flexErrorSubscribe) {
		repository.delete(flexErrorSubscribe);
	}

	@Override
	public List<TicketSubscribe> findAll() {
		return repository.findAll();
	}

	@Override
	public TicketSubscribe findBySubsciptionId(int subsciptionId) {
		return repository.findBySubsciptionId(subsciptionId);
	}

	@Override
	public TicketSubscribe findSubscription(int errid, int userid) {
		return repository.findSubscription(errid, userid);
	}

	@Override
	public List<TicketSubscribe> findByTicketId(int ticketId) {
		return repository.findByTicketId(ticketId);
	}

	@Override
	public List<String> findSubscribedEmails(int ticketId) {
		return repository.findSubscribedEmails(ticketId);
	}

	@Override
	public List<TicketSubscribe> findByUserid(int userid) {
		return repository.findByUserid(userid);
	}

}