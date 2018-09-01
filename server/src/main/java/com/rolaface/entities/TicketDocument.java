package com.rolaface.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ticket_documents")
public class TicketDocument {

	@Id
	@GeneratedValue
	@Column(name = "ticket_doc_id")
	private int ticketDocId;

	@Column(name = "ticket_id")
	private int ticketId;

	@Column
	private long size;

	@Column
	private String description;

	@Column
	private String filename;

	@Column(length = 100000)
	private byte[] content;

	@Column(name = "content_type")
	private String contentType;

	@Column
	private String createdBy;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;

	public int getTicketDocId() {
		return ticketDocId;
	}

	public void setTicketDocId(int ticketDocId) {
		this.ticketDocId = ticketDocId;
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

}
