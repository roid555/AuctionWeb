package auction.model;

import java.math.BigDecimal;

import auction.enums.OrderStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@Table(name = "product_order") // "order" reserved name in sql
public class Order {

    @SequenceGenerator(name = "ordersId", sequenceName = "ordersIdSequ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ordersId")
    @Id
    private Long id;
    @ManyToOne
    private Product product;
    @ManyToOne
    private AppUser highestBidder;
    @Column(precision = 19, scale = 2)
    private BigDecimal bid;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public Order(Product product) {
        this.product = product;
        status = OrderStatus.ON_GOING;

    }

}
