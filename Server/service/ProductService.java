package auction.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import auction.dto.AddProductDTO;
import auction.model.AppUser;
import auction.model.Order;
import auction.model.Product;
import auction.repository.ProductRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final AppUserService appUserService;
    private final OrderService orderService;

    public Product loadProductById(Long id) throws Exception {
        return productRepository.findById(id).orElseThrow(() -> new Exception("Couldn't find Product ID"));

    }

    public ResponseEntity<String> registerProduct(AddProductDTO productDTO) {
        AppUser productSeller = appUserService.loadAppUserByEmail(productDTO.getSellerEmail());
        Product newProduct = new Product(
                productDTO.getName(),
                productDTO.getCategory(),
                productDTO.getDescription(),
                productDTO.getStartingBid(),
                productDTO.getAutoBuyAmount(),
                productSeller,
                productDTO.getSellEndDate());
        // save the new product
        productRepository.save(newProduct);
        // create a new Order row for the product
        orderService.saveOrder(new Order(newProduct));
        return ResponseEntity.ok("Item added successfully");
    }

}
