package auction.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import auction.dto.ProductCardDTO;
import auction.enums.OrderStatus;
import auction.model.AppUser;
import auction.model.Order;
import auction.model.Product;
import auction.repository.OrderRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final AppUserService appUserService;
    private final EmailService emailService;

    /*
     * on server start, update the product status in case wasnt active at midnight
     */
    @PostConstruct
    public void init() {
        updateProductStatus();
    }

    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    /* set a new bid on a product */
    public String setNewBid(Long productId, BigDecimal newBid, String buyerEmail) throws Exception {
        Order order = orderRepository.findByProductId(productId);
        if (order.getStatus() != OrderStatus.ON_GOING) {
            throw new Exception("Item not available, please refresh the auction");
        }
        order.setBid(newBid);
        order.setHighestBidder(appUserService.loadAppUserByEmail(buyerEmail));
        orderRepository.save(order);
        return "Set new Bid Successfully";

    }

    /*
     * return a list of all the available products
     */
    public List<ProductCardDTO> getOngoingProducts() {
        return orderRepository.getOngoingProducts(OrderStatus.ON_GOING, new Date(System.currentTimeMillis()));
    }

    /*
     * return a list of product card the user sells
     */
    public List<ProductCardDTO> getSellerProducts(AppUser seller) {
        return orderRepository.getSellerProducts(seller);
    }

    /*
     * check every day at midnoght if there is some product that their sell end date
     * arrived and end the sell
     */
    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    @Transactional
    public void updateProductStatus() {
        List<Order> ongoingOrders = orderRepository.getExpiredOrders(OrderStatus.ON_GOING,
                new Date(System.currentTimeMillis()));
        for (Order order : ongoingOrders) {
            if (order.getHighestBidder() == null)
                order.setStatus(OrderStatus.UNSOLD);
            else {
                order.setStatus(OrderStatus.SOLD);
                emailService.sendProductSoldEmail(order);
            }
        }
        orderRepository.saveAll(ongoingOrders);
    }

    /* Auto buy a product */
    public ResponseEntity<String> autoBuyProduct(Product product, String userEmail) throws Exception {
        AppUser appUser = appUserService.loadAppUserByEmail(userEmail);
        Order order = orderRepository.findByProductId(product.getId());
        if (order.getStatus() != OrderStatus.ON_GOING) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product unavailable");
        }
        order.setHighestBidder(appUser);
        order.setStatus(OrderStatus.SOLD);
        order.setBid(product.getAutoBuyAmount());
        orderRepository.save(order);
        emailService.sendProductSoldEmail(order);
        return ResponseEntity.ok("Auto buy has Succeed");
    }

    /* return a list of product card the user bought */
    public List<ProductCardDTO> loadUserPurchases(AppUser appUserByEmail) {
        return orderRepository.getUserPurchases(appUserByEmail);
    }

    /* return a list of product card the user is the highest bidder */
    public List<ProductCardDTO> loadActiveBids(AppUser user) {
        return orderRepository.getActiveBids(user);
    }

}
