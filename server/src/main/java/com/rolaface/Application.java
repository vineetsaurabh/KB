package com.rolaface;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextListener;

import com.rolaface.config.AuditorAwareImpl;
import com.rolaface.model.ContextUser;

@SpringBootApplication(scanBasePackages = { "com.rolaface.controllers", "com.rolaface.services",
		"com.rolaface.config" })
@EntityScan("com.rolaface.entities")
@EnableJpaRepositories("com.rolaface.repositories")
@Transactional
public class Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public RequestContextListener requestContextListener() {
		return new RequestContextListener();
	}

	@Bean
	public AuditorAware<ContextUser> auditorProvider() {
		return new AuditorAwareImpl();
	}

}