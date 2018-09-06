package com.rolaface.services;

import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.PostConstruct;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "emailReceiverService")
public class EmailReceiverService {

	@Autowired
	public TicketService ticketService;

	ExecutorService executorService = Executors.newSingleThreadExecutor();

	private static final String MAIL_STORE_PROTOCOL_KEY = "mail.store.protocol";

	private static final String MAIL_STORE_PROTOCOL = "imaps";

	private static final String EMAIL_STORE = "imap.gmail.com";

	private static final String EMAIL_STORE_FOLDER = "INBOX";

	private static final String USER_NAME = "rolasist.rolaface";

	private static final String PASSWORD = "Rolaface@2018";

	@PostConstruct
	public void receiveMail() {
		Properties properties = new Properties();
		properties.setProperty(MAIL_STORE_PROTOCOL_KEY, MAIL_STORE_PROTOCOL);

		executorService.execute(new Runnable() {
			@Override
			public void run() {
				try {
					Session emailSession = Session.getInstance(properties);
					Store emailStore = emailSession.getStore(MAIL_STORE_PROTOCOL);
					emailStore.connect(EMAIL_STORE, USER_NAME, PASSWORD);

					Folder emailFolder = emailStore.getFolder(EMAIL_STORE_FOLDER);
					emailFolder.open(Folder.READ_ONLY);
					Message[] messages = emailFolder.getMessages();
					Message latestEmail = messages[messages.length - 1];
					int lastEmailNumber = latestEmail.getMessageNumber();
					monitorMail(emailFolder, lastEmailNumber);
					emailFolder.close(false);
					emailStore.close();
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			}
		});
	}

	public void monitorMail(Folder emailFolder, int lastEmailNumber) throws MessagingException {
		while (true) {
			Message[] messages = emailFolder.getMessages();
			if (messages.length > 0) {

			}
			Message latestEmail = messages[messages.length - 1];
			int latestEmailNumber = latestEmail.getMessageNumber();
			if (lastEmailNumber < latestEmailNumber) {
				lastEmailNumber = latestEmailNumber;
				try {
					createTicket(latestEmail);
					lastEmailNumber = latestEmailNumber;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	public void createTicket(Message latestEmail) throws MessagingException, IOException {
		ticketService.createTicketFromEmail(latestEmail);
	}

}
