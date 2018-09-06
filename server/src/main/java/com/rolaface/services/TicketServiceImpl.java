package com.rolaface.services;

import java.io.IOException;
import java.util.List;

import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.ContentType;
import javax.mail.internet.MimeMultipart;

import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Ticket;
import com.rolaface.entities.User;
import com.rolaface.repositories.TicketRepository;
import com.rolaface.repositories.UserRepository;
import com.rolaface.util.StringUtils;

@Service(value = "ticketService")
public class TicketServiceImpl implements TicketService {

	@Autowired
	private TicketRepository repository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Ticket save(Ticket ticket) {
		return repository.save(ticket);
	}

	@Override
	public Ticket createTicketFromEmail(Message emailMessage) throws MessagingException, IOException {
		Ticket ticket = new Ticket();
		ticket.setSummary(emailMessage.getSubject());
		ticket.setDescription(getTextFromMessage(emailMessage));
		ticket.setCreationDate(emailMessage.getSentDate());
		Address[] from = emailMessage.getFrom();
		String senderAddress = StringUtils.EMPTY_STRING;
		if (from.length > 0) {
			senderAddress = from[0].toString();
			String[] senderInfo = senderAddress.split(" ");
			if (senderInfo.length == 3) {
				String firstName = senderInfo[0];
				String lastName = senderInfo[1];
				String email = senderInfo[2].substring(1, senderInfo[2].length() - 1);
				User user = userRepository.findByEmail(email);
				if (user == null) {
					user = new User();
					user.setFirstName(firstName);
					user.setLastName(lastName);
					user.setEmail(email);
					user.setPassword("DUMMY");
					user.setUsername("ANONYMOUS");
					user.setPhone("NOT REGISTERED");
				}
				user = userRepository.save(user);
				ticket.setCreatedBy(user);
			}
		}
		Ticket newTicket = repository.save(ticket);
		String name = "ROLA-" + String.format("%4s", String.valueOf(newTicket.getTicketId())).replace(' ', '0');
		newTicket.setName(name);
		return repository.save(newTicket);
	}

	@Override
	public Ticket findByName(String name) {
		return repository.findByName(name);
	}

	@Override
	public Ticket findById(int id) {
		return repository.findByTicketId(id);
	}

	@Override
	public List<Ticket> findByType(String type) {
		return repository.findByType(type);
	}

	@Override
	public List<Ticket> findTickets(String input) {
		return repository.findTickets(input);
	}

	@Override
	public List<Ticket> findMyTeamTickets(int userid) {
		return repository.findMyTeamTickets(userid);
	}

	@Override
	public List<Ticket> findByPriority(String priority) {
		return repository.findByPriority(priority);
	}

	@Override
	public List<Ticket> findAll() {
		return repository.findAll();
	}

	@Override
	public Ticket update(Ticket ticket) {
		Ticket ticketToUpdate = findById(ticket.getTicketId());
		if (ticketToUpdate != null) {
			ticketToUpdate.setType(ticket.getType());
			ticketToUpdate.setSummary(ticket.getSummary());
			ticketToUpdate.setDescription(ticket.getDescription());
			ticketToUpdate.setPriority(ticket.getPriority());
			ticketToUpdate.setProduct(ticket.getProduct());
			ticketToUpdate.setModule(ticket.getModule());
			ticketToUpdate.setOperation(ticket.getOperation());
			ticketToUpdate.setRatings(ticket.getRatings());

			ticketToUpdate.setStatus(ticket.getStatus());
			ticketToUpdate.setStatusLabel(ticket.getStatusLabel());
			ticketToUpdate.setLastModifiedDate(ticket.getLastModifiedDate());
			ticketToUpdate.setLastModifiedBy(ticket.getLastModifiedBy());
			ticketToUpdate.setCreatedBy(ticket.getCreatedBy());
			ticketToUpdate.setCreationDate(ticket.getCreationDate());
			ticketToUpdate.setAssignedTo(ticket.getAssignedTo());
			ticketToUpdate.setAssignedBy(ticket.getAssignedBy());
			ticketToUpdate.setAssignedOn(ticket.getAssignedOn());
			ticketToUpdate.setClosedBy(ticket.getClosedBy());
			ticketToUpdate.setClosedOn(ticket.getClosedOn());
			repository.save(ticketToUpdate);
		}
		return ticket;
	}

	@Override
	public Ticket delete(int ticketId) {
		Ticket ticketToDelete = findById(ticketId);
		repository.delete(ticketToDelete);
		return ticketToDelete;
	}

	private String getTextFromMessage(Message message) throws IOException, MessagingException {
		String result = "";
		if (message.isMimeType("text/plain")) {
			result = message.getContent().toString();
		} else if (message.isMimeType("multipart/*")) {
			MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
			result = getTextFromMimeMultipart(mimeMultipart);
		}
		return result;
	}

	private String getTextFromMimeMultipart(MimeMultipart mimeMultipart) throws IOException, MessagingException {

		int count = mimeMultipart.getCount();
		if (count == 0) {
			throw new MessagingException("Multipart with no body parts not supported.");
		}
		boolean multipartAlt = new ContentType(mimeMultipart.getContentType()).match("multipart/alternative");
		if (multipartAlt) {
			// alternatives appear in an order of increasing
			// faithfulness to the original content. Customize as req'd.
			return getTextFromBodyPart(mimeMultipart.getBodyPart(count - 1));
		}
		String result = "";
		for (int i = 0; i < count; i++) {
			BodyPart bodyPart = mimeMultipart.getBodyPart(i);
			result += getTextFromBodyPart(bodyPart);
		}
		return result;
	}

	private String getTextFromBodyPart(BodyPart bodyPart) throws IOException, MessagingException {

		String result = "";
		if (bodyPart.isMimeType("text/plain")) {
			result = (String) bodyPart.getContent();
		} else if (bodyPart.isMimeType("text/html")) {
			String html = (String) bodyPart.getContent();
			result = Jsoup.parse(html).text();
		} else if (bodyPart.getContent() instanceof MimeMultipart) {
			result = getTextFromMimeMultipart((MimeMultipart) bodyPart.getContent());
		}
		return result;
	}
}
