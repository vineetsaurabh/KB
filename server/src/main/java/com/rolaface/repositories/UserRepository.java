package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Override
	User save(User user);
	
	@Override
	List<User> findAll();

	User findByUserid(int id);

	User findByUsername(String username);

	User findByEmail(String email);

	User findByPhone(String phone);
	
	@Override
	void delete(User user);

	@Query(value = "SELECT * FROM users u WHERE u.expertise LIKE %:expertise%", nativeQuery = true)
	List<User> findByExpertise(String expertise);
}
