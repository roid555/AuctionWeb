package auction.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import auction.dto.ProductCardDTO;
import auction.enums.OrderStatus;
import auction.model.AppUser;
import auction.model.Order;
import java.sql.Date;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

        @Query("SELECT new auction.dto.ProductCardDTO(o.product.id, o.product.name, o.product.category,"
                        + " o.product.description, o.product.startingBid, o.product.autoBuyAmount, " +
                        " o.product.sellEndDate, o.bid, o.status) " +
                        "FROM Order o WHERE o.status = :status AND o.product.sellEndDate > :today")
        List<ProductCardDTO> getOngoingProducts(@Param("status") OrderStatus status, @Param("today") Date today);

        @Query("SELECT new auction.dto.ProductCardDTO(o.product.id, o.product.name, o.product.category,"
                        + " o.product.description, " +
                        "o.product.startingBid, o.product.autoBuyAmount, o.product.sellEndDate, o.bid, o.status) " +
                        "FROM Order o WHERE o.product.seller = :seller")
        List<ProductCardDTO> getSellerProducts(@Param("seller") AppUser seller);

        @Query("SELECT o FROM Order o WHERE o.status = :status AND o.product.sellEndDate <= :today")
        List<Order> getExpiredOrders(@Param("status") OrderStatus status, @Param("today") Date today);

        @Query("SELECT new auction.dto.ProductCardDTO(o.product.id, o.product.name, o.product.category,"
                        + " o.product.description, o.bid, o.status)" +
                        "FROM Order o WHERE o.highestBidder = :user AND o.status = SOLD")
        List<ProductCardDTO> getUserPurchases(@Param("user") AppUser user);

        @Query("SELECT new auction.dto.ProductCardDTO(o.product.id, o.product.name, o.product.category,"
                        + " o.product.description, " +
                        " o.product.autoBuyAmount, o.product.sellEndDate, o.bid) " +
                        "FROM Order o WHERE o.highestBidder = :user AND o.status = ON_GOING")
        List<ProductCardDTO> getActiveBids(@Param("user") AppUser user);

        Order findByProductId(Long productId);

}