package com.rolaface.extra;

import java.util.Properties;

import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Store;

public class EmailReceiver {

	private static final String MAIL_STORE_PROTOCOL_KEY = "mail.store.protocol";

	private static final String MAIL_STORE_PROTOCOL = "imap";

	private static final String EMAIL_STORE = "imap.gmail.com";

	private static final String EMAIL_STORE_FOLDER = "INBOX";

	public void receiveMail(String userName, String password) throws MessagingException {

		Properties properties = new Properties();
		properties.setProperty(MAIL_STORE_PROTOCOL_KEY, MAIL_STORE_PROTOCOL);
		Session emailSession = Session.getInstance(properties);
		Store emailStore = emailSession.getStore(MAIL_STORE_PROTOCOL);
		emailStore.connect(EMAIL_STORE, userName, password);

		Folder emailFolder = emailStore.getFolder(EMAIL_STORE_FOLDER);
		emailFolder.open(Folder.READ_ONLY);
		Message[] messages = emailFolder.getMessages();
		Message latestEmail = messages[messages.length - 1];
		int lastEmailNumber = latestEmail.getMessageNumber();
		monitorMail(emailFolder, lastEmailNumber);
		emailFolder.close(false);
		emailStore.close();
	}

	public void monitorMail(Folder emailFolder, int lastEmailNumber) throws MessagingException {
		while (true) {
			Message[] messages = emailFolder.getMessages();
			Message latestEmail = messages[messages.length - 1];
			int latestEmailNumber = latestEmail.getMessageNumber();
			if (lastEmailNumber < latestEmailNumber) {
				System.out.println(latestEmail.getMessageNumber());
				System.out.println(latestEmail.getSubject());
				lastEmailNumber = latestEmailNumber;
			}
		}
	}

}
