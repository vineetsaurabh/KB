package com.rolaface.controllers;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rolaface.entities.Ticket;
import com.rolaface.entities.TicketDocument;
import com.rolaface.entities.TicketSearchHistory;
import com.rolaface.entities.TicketSubscribe;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.services.EmailService;
import com.rolaface.services.StateService;
import com.rolaface.services.TicketDocumentService;
import com.rolaface.services.TicketSearchHistoryService;
import com.rolaface.services.TicketService;
import com.rolaface.services.TicketSubscribeService;
import com.rolaface.services.UserService;
import com.rolaface.util.StringUtils;

@RestController
@RequestMapping({ "/ticket" })
public class TicketController {

	private final static String SUBSCRIPTION_SUBJECT = "ROLASIST Notification : Error has been updated";

	private final static String UPDATE_MESSAGE = "Your subscribed ticket has been updated. \n Ticket - %s \n Updated by %s";

	private final static String DELETE_MESSAGE = "Your subscribed ticket has been deleted. \n Ticket - %s \n Deleted by %s";

	private final static String TICKET_FILE_UPLOADED_MESSAGE = "A file has been uploaded by %s to your subscribed ticket - %s";

	private final static String TICKET_FILE_DELETED_MESSAGE = "A file has been deleted by %s from your subscribed ticket - %s";

	private final static String TICKET_ASSIGN_SUBJECT = "You have been assigned ticket(s)";

	private final static String TICKET_ASSIGN_MESSAGE = "You have been assigned ticket(s) \nTicket Name - %s \nAssigned by - %s";

	private final static String TICKET_CLOSE_SUBJECT = "A ticket has been close";

	private final static String TICKET_CLOSE_MESSAGE = "\nTicket Name - %s has been closed by %s";

	@Autowired
	private TicketService ticketService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private TicketSubscribeService ticketSubscribeService;

	@Autowired
	private TicketDocumentService ticketDocumentService;

	@Autowired
	private TicketSearchHistoryService ticketSearchHistoryService;

	@Autowired
	private UserService userService;

	@Autowired
	private StateService stateService;

	@PostMapping
	public Ticket create(@RequestBody Ticket ticket) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		ticket.setCreatedBy(user);
		ticket.setCreationDate(new Date());
		ticket.setStatus(stateService.findFirstState());
		if (ticket.getAssignedTo() == null) {
			if (ticket.getModule() != null) {
				ticket.setAssignedTo(ticket.getModule().getModuleOwner());
			} else if (ticket.getProduct() != null) {
				ticket.setAssignedTo(ticket.getProduct().getProductOwner());
			}
		}
		if (ticket.getAssignedTo() != null) {
			ticket.setAssignedOn(new Date());
			ticket.setAssignedBy(user);
		}
		Ticket newTicket = ticketService.save(ticket);

		String name = "ROLA-" + String.format("%4s", String.valueOf(newTicket.getTicketId())).replace(' ', '0');
		newTicket.setName(name);
		return ticketService.update(newTicket);
	}

	@GetMapping(path = { "/{id}" })
	public Ticket getTicket(@PathVariable("id") int id) {
		return ticketService.findById(id);
	}

	@GetMapping
	public List<Ticket> findAll() {
		return ticketService.findAll();
	}

	@GetMapping(value = "/findtickets", params = "input")
	public List<Ticket> findTickets(@RequestParam("input") String searchString) {
		saveSearchHistory(searchString);
		return ticketService.findTickets(searchString);
	}

	@GetMapping(value = "/findbytype", params = "type")
	public List<Ticket> findByType(@RequestParam("type") String type) {
		return ticketService.findByType(type);
	}

	@GetMapping(value = "/findbypriority", params = "priority")
	public List<Ticket> findByPriority(@RequestParam("priority") String priority) {
		return ticketService.findByPriority(priority);
	}

	@GetMapping(value = "/findmyteamtickets")
	public List<Ticket> findMyTeamTickets() {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ticketService.findMyTeamTickets(contextUser.getUserId());
	}

	@GetMapping(value = "/findbyname", params = "name")
	public Ticket findByName(@RequestParam("name") String name) {
		return ticketService.findByName(name);
	}

	@PutMapping(path = { "/{id}" })
	public Ticket update(@RequestBody Ticket ticket) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		ticket.setLastModifiedDate(new Date());
		ticket.setLastModifiedBy(user);
		ticket = ticketService.update(ticket);
		if (ticket != null) {
			notifySubscription(ticket.getTicketId(),
					String.format(UPDATE_MESSAGE, ticket.getName(), user.getFirstName()));
		}
		return ticket;
	}

	@DeleteMapping(path = { "/{id}" })
	public Ticket delete(@PathVariable("id") int id) {
		Ticket deletedTicket = ticketService.delete(id);
		if (deletedTicket != null) {
			List<TicketSubscribe> subscribedErrors = ticketSubscribeService.findByTicketId(id);
			for (TicketSubscribe subscribedError : subscribedErrors) {
				ticketSubscribeService.delete(subscribedError);
			}
		}
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		notifySubscription(id, String.format(DELETE_MESSAGE, deletedTicket.getName(), user.getFirstName()));
		return deletedTicket;
	}

	@Transactional
	@GetMapping(value = "/deletetickets", params = "ticketids")
	public boolean deleteErrors(@RequestParam("ticketids") String ticketids) {
		try {
			for (String id : ticketids.split(",")) {
				delete(Integer.parseInt(id));
			}
			return true;
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		return false;
	}

	@PostMapping("/uploadfile")
	public ResponseEntity<Ticket> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("ticketid") String ticketid) {
		int ticketId = Integer.parseInt(ticketid);
		TicketDocument ticketDocument = new TicketDocument();
		ticketDocument.setTicketId(ticketId);
		ticketDocument.setFilename(file.getOriginalFilename());
		ticketDocument.setCreationDate(new Date());
		ticketDocument.setContentType(file.getContentType());
		ticketDocument.setSize(file.getSize());
		try {
			ticketDocument.setContent(file.getBytes());
			ticketDocumentService.create(ticketDocument);
			Ticket ticket = ticketService.findById(ticketId);

			ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String message = String.format(TICKET_FILE_UPLOADED_MESSAGE, user.getFirstName(), ticket.getName());
			notifySubscription(ticketId, message);

			return ResponseEntity.status(HttpStatus.OK).body(ticket);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
		}
	}

	@GetMapping("/downloadfile/{id}")
	public ResponseEntity<byte[]> download(@PathVariable("id") int id) {
		TicketDocument ticketDocument = ticketDocumentService.findById(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType(ticketDocument.getContentType()));
		headers.setContentDispositionFormData("inline", ticketDocument.getFilename());
		return new ResponseEntity<>(ticketDocument.getContent(), headers, HttpStatus.OK);
	}

	@DeleteMapping(path = { "/deletefile/{id}" })
	public Ticket deleteTicketDocument(@PathVariable("id") int id) {
		TicketDocument ticketDocument = ticketDocumentService.findById(id);
		Ticket ticket = ticketService.findById(ticketDocument.getTicketId());

		ticketDocumentService.delete(ticketDocument.getTicketDocId());
		ticket.getFiles().remove(ticketDocument);

		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String message = String.format(TICKET_FILE_DELETED_MESSAGE, user.getFirstName(), ticket.getName());
		notifySubscription(ticket.getTicketId(), message);

		return ticket;
	}

	public void notifySubscription(int errid, String message) {
		List<String> subscriptions = ticketSubscribeService.findSubscribedEmails(errid);
		emailService.sendMails(subscriptions, SUBSCRIPTION_SUBJECT, message);
	}

	private void saveSearchHistory(String searchString) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		TicketSearchHistory ticketSearchHistory = new TicketSearchHistory();
		ticketSearchHistory.setSearchString(searchString);
		ticketSearchHistory.setSearchedOn(new Date());
		ticketSearchHistory.setUserid(userId);
		ticketSearchHistoryService.create(ticketSearchHistory);
	}

	@Transactional
	@PutMapping(value = "/assignticket")
	public void assignTickets(@RequestBody List<Ticket> tickets) {
		if (tickets.get(0).getAssignedTo() == null) {
			return;
		}
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		String ticketNames = StringUtils.EMPTY_STRING;
		for (Ticket ticket : tickets) {
			ticket.setAssignedOn(new Date());
			ticket.setAssignedBy(user);
			ticket = ticketService.update(ticket);
			ticketNames = ticketNames + ticket.getName() + ", ";
		}
		String message = String.format(TICKET_ASSIGN_MESSAGE, ticketNames,
				user.getFirstName() + " " + user.getLastName());
		emailService.sendMail(tickets.get(0).getAssignedTo().getEmail(), TICKET_ASSIGN_SUBJECT, message);
	}

	@PutMapping(value = "/closeticket")
	public Ticket closeTicket(@RequestBody Ticket ticket) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		ticket.setClosedOn(new Date());
		ticket.setClosedBy(user);
		ticket = ticketService.update(ticket);
		String message = String.format(TICKET_CLOSE_MESSAGE, ticket.getName(),
				user.getFirstName() + " " + user.getLastName());
		emailService.sendMail(ticket.getAssignedTo().getEmail(), TICKET_CLOSE_SUBJECT, message);
		return ticket;
	}

}
