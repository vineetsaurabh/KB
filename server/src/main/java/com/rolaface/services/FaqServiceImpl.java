package com.rolaface.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Faq;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.FaqRepository;

@Service(value = "faqService")
public class FaqServiceImpl implements FaqService {

	@Autowired
	private UserService userService;

	@Autowired
	public FaqRepository repository;

	@Override
	public Faq create(Faq faq) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		faq.setCreatedBy(user);
		faq.setCreatedOn(new Date());
		return repository.save(faq);
	}

	@Override
	public Faq findById(int id) {
		return repository.findByFaqId(id);
	}

	@Override
	public List<Faq> findAll() {
		return repository.findAll();
	}

	@Override
	public Faq update(Faq faq) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		Faq faqToUpdate = findById(faq.getFaqId());
		if (faqToUpdate != null) {
			faqToUpdate.setSummary(faq.getSummary());
			faqToUpdate.setDescription(faq.getDescription());
			faqToUpdate.setModifiedBy(user);
			faqToUpdate.setModifiedOn(new Date());
		}
		return repository.save(faqToUpdate);
	}

	@Override
	public Faq delete(int id) {
		Faq faqToDelete = findById(id);
		if (faqToDelete != null) {
			repository.delete(faqToDelete);
		}
		return faqToDelete;
	}

}
