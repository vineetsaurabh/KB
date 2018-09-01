package com.rolaface.util;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class TicketNameGenerator implements IdentifierGenerator {

	private final static String PREFIX = "ROLA-";

	private final static String SEQ_PREPARED_STATEMENT = "SELECT nextval ('seq_ticket_name') as nextval";

	private final static String NEXT_VAL = "nextval";

	private final static String EXCEPTION_MESSAGE = "Unable to generate ROLAsist ticket name.";

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String ticketName = null;
		try (Connection connection = session.connection()) {
			PreparedStatement ps = connection.prepareStatement(SEQ_PREPARED_STATEMENT);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				int id = rs.getInt(NEXT_VAL);
				String sequence = String.format("%4s", String.valueOf(id)).replace(' ', '0');
				ticketName = PREFIX + sequence;
			}
		} catch (SQLException e) {
			throw new HibernateException(EXCEPTION_MESSAGE);
		}
		return ticketName;
	}

}
