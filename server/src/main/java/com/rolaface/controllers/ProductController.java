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

import com.rolaface.entities.Product;
import com.rolaface.services.ProductService;

@RestController
@RequestMapping({ "/product" })
public class ProductController {

	@Autowired
	public ProductService productService;

	@PostMapping
	public Product create(@RequestBody Product product) {
		return productService.create(product);
	}

	@GetMapping(path = { "/{id}" })
	public Product findById(@PathVariable("id") int id) {
		return productService.findById(id);
	}

	@GetMapping
	public List<Product> findAll() {
		return productService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public Product update(@RequestBody Product product) {
		return productService.update(product);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Product delete(@PathVariable("id") int id) {
		return productService.delete(id);
	}

}
