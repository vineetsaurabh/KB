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

import com.rolaface.entities.Faq;
import com.rolaface.services.FaqService;

@RestController
@RequestMapping({ "/faq" })
public class FaqController {

	@Autowired
	public FaqService faqService;

	@PostMapping
	public Faq create(@RequestBody Faq faq) {
		return faqService.create(faq);
	}

	@GetMapping(path = { "/{id}" })
	public Faq findById(@PathVariable("id") int id) {
		return faqService.findById(id);
	}

	@GetMapping
	public List<Faq> findAll() {
		return faqService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public Faq update(@RequestBody Faq faq) {
		return faqService.update(faq);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Faq delete(@PathVariable("id") int id) {
		return faqService.delete(id);
	}

}
