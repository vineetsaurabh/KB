package com.rolaface.services;

import java.util.SortedSet;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.State;
import com.rolaface.repositories.StateRepository;

@Service(value = "stateService")
public class StateServiceImpl implements StateService {

	@Autowired
	public StateRepository repository;

	@Override
	public State create(State state) {
		return repository.save(state);
	}

	@Override
	public State findById(int id) {
		return repository.findByStateId(id);
	}

	@Override
	public State findFirstState() {
		return repository.findFirstState();
	}

	@Override
	public SortedSet<State> findAll() {
		return new TreeSet<State>(repository.findAll());
	}

	@Override
	public State update(State state) {
		State stateToUpdate = findById(state.getStateId());
		if (stateToUpdate != null) {
			stateToUpdate.setStateName(state.getStateName());
			stateToUpdate.setStateOrder(state.getStateOrder());
			stateToUpdate.setDescription(state.getDescription());
			stateToUpdate.setPromoteLabel(state.getPromoteLabel());
			stateToUpdate.setDemoteLabel(state.getDemoteLabel());
		}
		return repository.save(stateToUpdate);
	}

	@Override
	public State delete(int id) {
		State stateToDelete = findById(id);
		if (stateToDelete != null) {
			repository.delete(stateToDelete);
		}
		return stateToDelete;
	}

}
