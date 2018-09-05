package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Faq;

@Service
public interface FaqService {

	Faq create(Faq faq);

	Faq findById(int id);

	List<Faq> findAll();

	Faq update(Faq faq);

	Faq delete(int id);

}
