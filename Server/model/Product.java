package auction.model;

import java.math.BigDecimal;
import java.sql.Date;

import auction.enums.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * The Product Entity for JPA/DB
 */

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Product {

    @SequenceGenerator(name = "productId", sequenceName = "productIdSeq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "productId")
    @Id
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private ProductCategory category;
    private String description;
    @Column(precision = 19, scale = 2)
    private BigDecimal startingBid;
    @Column(precision = 19, scale = 2)
    private BigDecimal autoBuyAmount;
    @ManyToOne
    private AppUser seller;
    private java.sql.Date sellEndDate;

    public Product(String name, ProductCategory category, String description, BigDecimal startingBid,
            BigDecimal autoBuyAmount,
            AppUser seller, Date sellEndDate) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.startingBid = startingBid;
        this.autoBuyAmount = autoBuyAmount;
        this.seller = seller;
        this.sellEndDate = sellEndDate;

    }

}
