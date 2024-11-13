package auction.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import auction.dto.AddProductDTO;
import auction.dto.ProductCardDTO;
import auction.enums.ProductCategory;
import auction.service.AppUserService;
import auction.service.OrderService;
import auction.service.ProductService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/product")
@AllArgsConstructor
public class ProductController {

    private ProductService productService;
    private AppUserService appUserService;
    private OrderService orderService;

    /* register a new product */
    @PostMapping
    public ResponseEntity<String> addNewProduct(@RequestBody AddProductDTO productDTO) throws Exception {
        return productService.registerProduct(productDTO);
    }

    /* return all the product categories */
    @GetMapping(path = "/categories")
    public ResponseEntity<ProductCategory[]> getAllCategories() {
        return ResponseEntity.ok(ProductCategory.values());
    }

    /*
     * return a list of all the available products
     */
    @GetMapping(path = "/allProducts")
    public ResponseEntity<List<ProductCardDTO>> getAllProducts() {
        List<ProductCardDTO> products = orderService.getOngoingProducts();
        return ResponseEntity.ok(products);
    }

    /*
     * return a list of product card the user sells
     */
    @GetMapping(path = "/sellerProducts")
    public ResponseEntity<List<ProductCardDTO>> getSellerProducts(@RequestParam String sellerEmail) throws Exception {
        List<ProductCardDTO> products = orderService.getSellerProducts(appUserService.loadAppUserByEmail(sellerEmail));
        return ResponseEntity.ok(products);
    }
}
