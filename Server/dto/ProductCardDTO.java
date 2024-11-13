package auction.dto;

import java.math.BigDecimal;
import java.sql.Date;

import auction.enums.OrderStatus;
import auction.enums.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * Product DTO to show inside the product table in the client
 */
@Getter
@AllArgsConstructor
public class ProductCardDTO {

    private Long id;
    private String name;
    private ProductCategory category;
    private String description;
    private BigDecimal startingBid;
    private BigDecimal autoBuyAmount;
    private java.sql.Date sellEndDate;
    private BigDecimal currentBid;
    private OrderStatus status;

    public ProductCardDTO(Long id, String name, ProductCategory category, String description, BigDecimal currentBid,
            OrderStatus status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.currentBid = currentBid;
        this.status = status;
    }

    public ProductCardDTO(Long id, String name, ProductCategory category, String description, BigDecimal startingBid,
            BigDecimal autoBuyAmount, BigDecimal currentBid, OrderStatus status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.startingBid = startingBid;
        this.autoBuyAmount = autoBuyAmount;
        this.currentBid = currentBid;
        this.status = status;
    }

    public ProductCardDTO(Long id, String name, ProductCategory category, String description, BigDecimal autoBuyAmount,
            Date sellEndDate, BigDecimal currentBid) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.autoBuyAmount = autoBuyAmount;
        this.sellEndDate = sellEndDate;
        this.currentBid = currentBid;
    }

}
