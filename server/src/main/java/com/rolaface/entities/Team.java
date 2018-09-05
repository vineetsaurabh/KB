package com.rolaface.entities;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "teams")
public class Team {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int teamid;

	@Column(name = "team_name", unique = true, nullable = false)
	private String teamName;

	@Column
	private String description;

	@ManyToMany(mappedBy = "teams")
	@JsonIgnore
	private Collection<User> users;

	@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	private User spoc;

	@JsonInclude()
	@Transient
	private String spocUserName;

	@JsonInclude()
	@Transient
	private int spocUserId;

	public User getSpoc() {
		return spoc;
	}

	public void setSpoc(User spoc) {
		this.spoc = spoc;
	}

	public Collection<User> getUsers() {
		return users;
	}

	public void setUsers(Collection<User> users) {
		this.users = users;
	}

	public int getTeamid() {
		return teamid;
	}

	public void setTeamid(int teamid) {
		this.teamid = teamid;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSpocUserName() {
		return spocUserName;
	}

	public void setSpocUserName(String spocUserName) {
		this.spocUserName = spocUserName;
	}

	public int getSpocUserId() {
		return spocUserId;
	}

	public void setSpocUserId(int spocUserId) {
		this.spocUserId = spocUserId;
	}

}