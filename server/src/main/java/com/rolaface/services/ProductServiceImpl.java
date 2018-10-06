package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Product;
import com.rolaface.repositories.ProductRepository;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	public ProductRepository repository;

	@Override
	public Product create(Product product) {
		return repository.save(product);
	}

	@Override
	public Product findById(int id) {
		return repository.findByProductId(id);
	}

	@Override
	public List<Product> findAll() {
		return repository.findAll();
	}

	@Override
	public Product update(Product product) {
		Product defaultProduct = null;
		Product productToUpdate = findById(product.getProductId());
		if (productToUpdate != null) {
			productToUpdate.setProductName(product.getProductName());
			productToUpdate.setDescription(product.getDescription());
			productToUpdate.setProductOwner(product.getProductOwner());
			if (product.isDefaultProduct() && !productToUpdate.isDefaultProduct()) {
				defaultProduct = repository.findDefaultProduct();
				if (defaultProduct != null) {
					defaultProduct.setDefaultProduct(Boolean.FALSE);
					repository.save(defaultProduct);
				}
				productToUpdate.setDefaultProduct(product.isDefaultProduct());
			}
		}
		return repository.save(productToUpdate);
	}

	@Override
	public Product delete(int id) {
		Product productToDelete = findById(id);
		if (productToDelete != null) {
			repository.delete(productToDelete);
		}
		return productToDelete;
	}

}
