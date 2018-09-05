package com.rolaface.extra;

import javax.mail.MessagingException;

public class EmailReceiverMain {

	public static void main(String[] args) throws MessagingException {
		EmailReceiver obj = new EmailReceiver();
		obj.receiveMail("rolasist.rolaface", "Rolaface@2018");
	}

}
