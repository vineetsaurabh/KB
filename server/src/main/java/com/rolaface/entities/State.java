package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "states")
public class State implements Comparable<State> {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int stateId;

	@Column(name = "state_name", unique = true, nullable = false)
	private String stateName;

	@Column(name = "state_order", unique = true, nullable = false)
	private int stateOrder;

	@Column
	private String description;

	@Column
	private String promoteLabel;

	@Column
	private String demoteLabel;

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getStateOrder() {
		return stateOrder;
	}

	public void setStateOrder(int stateOrder) {
		this.stateOrder = stateOrder;
	}

	public String getPromoteLabel() {
		return promoteLabel;
	}

	public void setPromoteLabel(String promoteLabel) {
		this.promoteLabel = promoteLabel;
	}

	public String getDemoteLabel() {
		return demoteLabel;
	}

	public void setDemoteLabel(String demoteLabel) {
		this.demoteLabel = demoteLabel;
	}

	@Override
	public int compareTo(State s) {
		return this.stateOrder - s.stateOrder;
	}

}