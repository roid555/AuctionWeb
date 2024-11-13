package auction.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.dto.ProductCardDTO;
import auction.service.AppUserService;
import auction.service.JWTService;
import auction.service.OrderService;
import auction.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/order")
public class OrderController {

    private final OrderService orderService;
    private final JWTService jwtService;
    private final AppUserService appUserService;
    private final ProductService productService;

    /* Place a bid of a specific product */
    @PutMapping("bid/{productId}/{newBid}")
    public ResponseEntity<String> placeBid(@PathVariable Long productId, @PathVariable BigDecimal newBid,
            HttpServletRequest request)
            throws Exception {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String userEmail = jwtService.extractUserEmail(token);
        orderService.setNewBid(productId, newBid, userEmail);
        return ResponseEntity.ok("bid placed");
    }

    /* auto buy product */
    @PutMapping("autobuy/{productId}")
    public ResponseEntity<String> autoBuyProduct(@PathVariable Long productId, HttpServletRequest request)
            throws Exception {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String userEmail = jwtService.extractUserEmail(token);
        return orderService.autoBuyProduct(productService.loadProductById(productId), userEmail);

    }

    /*
     * Return a all the products the user are selling including all status and dates
     */
    @GetMapping(path = "/userPurchases")
    public ResponseEntity<List<ProductCardDTO>> getSellerProducts(HttpServletRequest request) throws Exception {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String userEmail = jwtService.extractUserEmail(token);
        List<ProductCardDTO> products = orderService.loadUserPurchases(appUserService.loadAppUserByEmail(userEmail));
        return ResponseEntity.ok(products);
    }

    /* Return a list of all active bids that the user is the highest bidder */
    @GetMapping(path = "/activeBids")
    public ResponseEntity<List<ProductCardDTO>> getMethodName(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String userEmail = jwtService.extractUserEmail(token);
        List<ProductCardDTO> products = orderService.loadActiveBids(appUserService.loadAppUserByEmail(userEmail));
        return ResponseEntity.ok(products);
    }

}
