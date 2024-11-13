package auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import auction.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // List<Product> findBySeller(AppUser seller);

}
