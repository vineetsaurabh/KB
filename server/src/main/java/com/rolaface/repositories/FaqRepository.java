package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Faq;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {

	@Override
	Faq save(Faq team);

	Faq findByFaqId(int faqId);

	@Override
	List<Faq> findAll();

	@Override
	void delete(Faq team);

}
