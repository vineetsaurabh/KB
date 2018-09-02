package com.rolaface.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "tickets")
public class Ticket {

	@Id
	@Column(name = "ticket_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@Column
	@GenericGenerator(name = "seq_ticket_name", strategy = "com.rolaface.util.TicketNameGenerator")
	@GeneratedValue(generator = "seq_ticket_name", strategy = GenerationType.SEQUENCE)
	private String name;

	@Column
	private String type;

	@Column
	private String summary;

	@Lob
	@Column
	private String description;

	@Column
	private String priority;

	@Column
	private String product;

	@Column
	private String module;

	@Column
	private String operation;

	@ManyToOne
	private State status;

	@ManyToOne
	private User createdBy;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;

	@ManyToOne
	private User assignedTo;

	@ManyToOne
	private User assignedBy;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date assignedOn;

	@ManyToOne
	private User lastModifiedBy;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModifiedDate;

	@ManyToOne
	private User closedBy;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date closedOn;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "ticket_id")
	private Set<TicketDocument> files;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "ticket_id")
	private Set<Rating> ratings;

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public State getStatus() {
		return status;
	}

	public void setStatus(State status) {
		this.status = status;
	}

	public Date getAssignedOn() {
		return assignedOn;
	}

	public void setAssignedOn(Date assignedOn) {
		this.assignedOn = assignedOn;
	}

	public Set<TicketDocument> getFiles() {
		return files;
	}

	public void setFiles(Set<TicketDocument> files) {
		this.files = files;
	}

	public Set<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(Set<Rating> ratings) {
		this.ratings = ratings;
	}

	public User getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(User assignedBy) {
		this.assignedBy = assignedBy;
	}

	public User getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(User lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public User getClosedBy() {
		return closedBy;
	}

	public void setClosedBy(User closedBy) {
		this.closedBy = closedBy;
	}

	public Date getClosedOn() {
		return closedOn;
	}

	public void setClosedOn(Date closedOn) {
		this.closedOn = closedOn;
	}

}
