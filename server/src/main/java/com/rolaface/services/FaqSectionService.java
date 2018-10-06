package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.FaqSection;

@Service
public interface FaqSectionService {

	FaqSection create(FaqSection faqSection);

	FaqSection findById(int id);

	List<FaqSection> findAll();

	FaqSection update(FaqSection faqSection);

	FaqSection delete(int id);

}
