package com.rolaface.controllers;

import java.util.SortedSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.State;
import com.rolaface.services.StateService;

@RestController
@RequestMapping({ "/state" })
public class StateController {

	@Autowired
	public StateService stateService;

	@PostMapping
	public State create(@RequestBody State state) {
		return stateService.create(state);
	}

	@GetMapping(path = { "/{id}" })
	public State findById(@PathVariable("id") int id) {
		return stateService.findById(id);
	}

	@GetMapping
	public SortedSet<State> findAll() {
		return stateService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public State update(@RequestBody State state) {
		return stateService.update(state);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public State delete(@PathVariable("id") int id) {
		return stateService.delete(id);
	}

}
