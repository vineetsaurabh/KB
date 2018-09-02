package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

	@Override
	State save(State state);

	State findByStateName(String name);

	State findByStateId(int stateId);

	@Query(value = "SELECT * FROM states WHERE state_order = ( SELECT MIN(state_order) FROM states )", nativeQuery = true)
	State findFirstState();

	@Override
	List<State> findAll();

	@Override
	void delete(State state);

}
