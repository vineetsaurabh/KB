package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Override
	Product save(Product product);

	Product findByProductName(String name);

	Product findByProductId(int productId);

	@Query(value = "SELECT * FROM products t WHERE t.default_product = true", nativeQuery = true)
	Product findDefaultProduct();

	@Override
	List<Product> findAll();

	@Override
	void delete(Product product);

}
