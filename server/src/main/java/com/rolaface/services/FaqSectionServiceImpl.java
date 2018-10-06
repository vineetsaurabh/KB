package com.rolaface.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rolaface.entities.FaqSection;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.FaqSectionRepository;

@Service(value = "faqSectionService")
public class FaqSectionServiceImpl implements FaqSectionService {

	@Autowired
	private UserService userService;

	@Autowired
	public FaqSectionRepository repository;

	@Override
	public FaqSection create(FaqSection faqSection) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		faqSection.setCreatedBy(user);
		faqSection.setCreatedOn(new Date());
		return repository.save(faqSection);
	}

	@Override
	public FaqSection findById(int id) {
		return repository.findByFaqSectionId(id);
	}

	@Override
	public List<FaqSection> findAll() {
		return repository.findAll();
	}

	@Override
	public FaqSection update(FaqSection faqSection) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());
		FaqSection faqSectionToUpdate = findById(faqSection.getFaqSectionId());
		if (faqSectionToUpdate != null) {
			faqSectionToUpdate.setName(faqSection.getName());
			faqSectionToUpdate.setDescription(faqSection.getDescription());
			faqSectionToUpdate.setModifiedBy(user);
			faqSectionToUpdate.setModifiedOn(new Date());
		}
		return repository.save(faqSectionToUpdate);
	}

	@Override
	public FaqSection delete(int id) {
		FaqSection faqSectionToDelete = findById(id);
		if (faqSectionToDelete != null) {
			repository.delete(faqSectionToDelete);
		}
		return faqSectionToDelete;
	}

}
