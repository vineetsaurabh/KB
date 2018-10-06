package com.rolaface.controllers;

import java.util.List;

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

import com.rolaface.entities.FaqSection;
import com.rolaface.services.FaqSectionService;

@RestController
@RequestMapping({ "/faqSection" })
public class FaqSectionController {

	@Autowired
	public FaqSectionService faqSectionService;

	@PostMapping
	public FaqSection create(@RequestBody FaqSection faqSection) {
		return faqSectionService.create(faqSection);
	}

	@GetMapping(path = { "/{id}" })
	public FaqSection findById(@PathVariable("id") int id) {
		return faqSectionService.findById(id);
	}

	@GetMapping
	public List<FaqSection> findAll() {
		return faqSectionService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public FaqSection update(@RequestBody FaqSection faqSection) {
		return faqSectionService.update(faqSection);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public FaqSection delete(@PathVariable("id") int id) {
		return faqSectionService.delete(id);
	}

}
