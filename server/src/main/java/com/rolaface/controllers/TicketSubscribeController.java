package com.rolaface.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.Ticket;
import com.rolaface.entities.TicketSubscribe;
import com.rolaface.model.ContextUser;
import com.rolaface.services.EmailService;
import com.rolaface.services.TicketService;
import com.rolaface.services.TicketSubscribeService;

@RestController
@RequestMapping({ "/ticket-subscribe" })
public class TicketSubscribeController {

	private final static String SUBSCRIPTION_SUBJECT = "ROLAsist Notification : Your are subscribed to Ticket";

	private final static String UN_SUBSCRIPTION_SUBJECT = "ROLAsist Notification : Your are un-subscribed from Ticket";

	private final static String SUBSCRIPTION_MESSAGE = "You are subscribed to Ticket(s) - %s";

	private final static String UN_SUBSCRIPTION_MESSAGE = "You are un-subscribed to Ticket(s) - %s";

	@Autowired
	private TicketSubscribeService ticketSubscribeService;

	@Autowired
	private TicketService ticketService;

	@Autowired
	private EmailService emailService;

	@PostMapping
	public TicketSubscribe create(@RequestBody int ticketId) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		TicketSubscribe ticketSubscribe = ticketSubscribeService.findSubscription(ticketId, user.getUserId());
		if (ticketSubscribe == null) {
			ticketSubscribe = new TicketSubscribe();
			ticketSubscribe.setTicketId(ticketId);
			ticketSubscribe.setUserid(user.getUserId());
			ticketSubscribe.setEmail(user.getEmail());
			ticketSubscribe.setSubscribedOn(new Date());
			ticketSubscribe = ticketSubscribeService.save(ticketSubscribe);
		}
		if (ticketSubscribe != null) {
			String message = String.format(SUBSCRIPTION_MESSAGE, ticketId);
			emailService.sendMail(SUBSCRIPTION_SUBJECT, message);
		}
		return ticketSubscribe;
	}

	@DeleteMapping(path = { "/{id}" })
	public void delete(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		TicketSubscribe ticketSubscribe = ticketSubscribeService.findSubscription(id, userId);
		if (ticketSubscribe != null) {
			ticketSubscribe = ticketSubscribeService.findSubscription(id, userId);
			ticketSubscribeService.delete(ticketSubscribe);
		}
		if (ticketSubscribe != null) {
			String message = String.format(UN_SUBSCRIPTION_MESSAGE, ticketSubscribe.getTicketId());
			emailService.sendMail(UN_SUBSCRIPTION_SUBJECT, message);
		}
	}

	@GetMapping(value = "/getsubscribedtickets")
	public Set<Ticket> getSubscribedTickets() {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		List<TicketSubscribe> tickets = ticketSubscribeService.findByUserid(userId);
		Set<Ticket> subscribedErrors = new HashSet<>();
		for (TicketSubscribe ticket : tickets) {
			subscribedErrors.add(ticketService.findById(ticket.getTicketId()));
		}
		return subscribedErrors;
	}

	@GetMapping(value = "/getsubscribedticketids")
	public Set<String> getSubscribedTicketIds() {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		List<TicketSubscribe> tickets = ticketSubscribeService.findByUserid(userId);
		Set<String> subscribedErrors = new HashSet<>();
		for (TicketSubscribe ticket : tickets) {
			subscribedErrors.add(String.valueOf(ticket.getTicketId()));
		}
		return subscribedErrors;
	}

	@Transactional
	@GetMapping(value = "/subscribetickets", params = "ticketIds")
	public int subscribeErrors(@RequestParam("ticketIds") String ticketIds) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int noOfTicketSubscribed = 0;
		try {
			for (String ticketId : ticketIds.split(",")) {
				TicketSubscribe ticketSubscribe = ticketSubscribeService.findSubscription(Integer.parseInt(ticketId),
						user.getUserId());
				if (ticketSubscribe == null) {
					ticketSubscribe = new TicketSubscribe();
					ticketSubscribe.setTicketId(Integer.parseInt(ticketId));
					ticketSubscribe.setUserid(user.getUserId());
					ticketSubscribe.setEmail(user.getEmail());
					ticketSubscribe.setSubscribedOn(new Date());
					ticketSubscribeService.save(ticketSubscribe);
					noOfTicketSubscribed++;
				}
			}
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		String message = String.format(SUBSCRIPTION_MESSAGE, ticketIds);
		emailService.sendMail(SUBSCRIPTION_SUBJECT, message);
		return noOfTicketSubscribed;
	}

	@Transactional
	@GetMapping(value = "/unsubscribetickets", params = "ticketIds")
	public int unsubscribeErrors(@RequestParam("ticketIds") String ticketIds) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		int noOfTicketUnsubscribed = 0;
		try {
			for (String ticketId : ticketIds.split(",")) {
				TicketSubscribe ticketSubscribe = ticketSubscribeService.findSubscription(Integer.parseInt(ticketId),
						userId);
				if (ticketSubscribe != null) {
					ticketSubscribeService.delete(ticketSubscribe);
					noOfTicketUnsubscribed++;
				}
			}
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		String message = String.format(UN_SUBSCRIPTION_SUBJECT, ticketIds);
		emailService.sendMail(UN_SUBSCRIPTION_SUBJECT, message);
		return noOfTicketUnsubscribed;
	}

}
