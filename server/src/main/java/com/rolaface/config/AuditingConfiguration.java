package com.rolaface.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.rolaface.model.ContextUser;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class AuditingConfiguration {
	
    @Bean
    public AuditorAware<ContextUser> auditorAware() {
        return new AuditorAwareImpl();
    }
    
}
