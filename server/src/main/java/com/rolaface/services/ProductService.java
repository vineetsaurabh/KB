package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Product;

@Service
public interface ProductService {

	Product create(Product product);

	Product findById(int id);

	List<Product> findAll();

	Product update(Product product);

	Product delete(int id);

}
