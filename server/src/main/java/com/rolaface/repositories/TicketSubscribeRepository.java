package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.TicketSubscribe;

@Repository
public interface TicketSubscribeRepository extends JpaRepository<TicketSubscribe, Long> {

	@Override
	TicketSubscribe save(TicketSubscribe ticketSubscribe);
	
	@Override
	List<TicketSubscribe> findAll();

	TicketSubscribe findBySubsciptionId(int subsciptionId);

	List<TicketSubscribe> findByTicketId(int ticketId);

	List<TicketSubscribe> findByUserid(int userid);

	@Query(value = "SELECT * FROM ticket_subscribe f WHERE f.ticket_id = ?1 AND f.userid = ?2", nativeQuery = true)
	TicketSubscribe findSubscription(int ticketId, int userid);

	@Query(value = "SELECT email FROM ticket_subscribe f WHERE f.ticket_id = ?1", nativeQuery = true)
	List<String> findSubscribedEmails(int ticketId);
	
	@Override
	void delete(TicketSubscribe ticketSubscribe);

}