package auction.dto;

import java.math.BigDecimal;

import auction.enums.ProductCategory;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * product Data Transfer Object sent from the client to add to the DB
 */
@AllArgsConstructor
@Getter
public class AddProductDTO {

    private String name;
    // TODO: keep it??
    @Enumerated(EnumType.STRING)
    private ProductCategory category;
    private String description;
    private BigDecimal startingBid;
    private BigDecimal autoBuyAmount;
    private String sellerEmail;
    private java.sql.Date sellEndDate;

}
