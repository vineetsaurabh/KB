package com.rolaface.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.rolaface.model.ContextUser;

@Component
public class AuditorAwareImpl implements AuditorAware<ContextUser> {
	
	@Override
	public Optional<ContextUser> getCurrentAuditor() {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return Optional.of(contextUser);
	}
	
}