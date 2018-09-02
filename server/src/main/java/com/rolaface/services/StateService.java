package com.rolaface.services;

import java.util.SortedSet;

import org.springframework.stereotype.Service;

import com.rolaface.entities.State;

@Service
public interface StateService {

	State create(State state);

	State findById(int id);

	State findFirstState();

	SortedSet<State> findAll();

	State update(State state);

	State delete(int id);

}
