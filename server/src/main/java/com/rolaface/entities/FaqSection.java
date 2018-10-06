package com.rolaface.entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "faq_sections")
public class FaqSection {

	@Id
	@Column(name = "faq_section_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int faqSectionId;

	@Column
	private String name;

	@Lob
	@Column
	private String description;

	@OneToMany(mappedBy = "faqSection", cascade = CascadeType.ALL)
	private Collection<Faq> faqs;

	@ManyToOne
	private User createdBy;

	@Column
	private Date createdOn;

	@ManyToOne
	private User modifiedBy;

	@Column
	private Date modifiedOn;

	public int getFaqSectionId() {
		return faqSectionId;
	}

	public void setFaqSectionId(int faqSectionId) {
		this.faqSectionId = faqSectionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public User getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(User modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	public Collection<Faq> getFaqs() {
		return faqs;
	}

	public void setFaqs(Collection<Faq> faqs) {
		this.faqs = faqs;
	}

}
