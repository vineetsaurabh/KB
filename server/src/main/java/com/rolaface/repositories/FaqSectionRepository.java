package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.FaqSection;

@Repository
public interface FaqSectionRepository extends JpaRepository<FaqSection, Long> {

	@Override
	FaqSection save(FaqSection faqSection);

	FaqSection findByFaqSectionId(int faqSectionId);

	@Override
	List<FaqSection> findAll();

	@Override
	void delete(FaqSection faqSection);

}
