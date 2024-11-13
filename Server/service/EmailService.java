package auction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import auction.model.AppUser;
import auction.model.Order;
import auction.model.Product;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /* Send email to the seller when the sell end */
    public void sendProductSoldEmail(Order order) {
        AppUser seller = order.getProduct().getSeller();
        Product product = order.getProduct();
        AppUser buyer = order.getHighestBidder();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(seller.getEmail());
        message.setSubject("Auction House - Product Sold!");
        message.setFrom("Auction House <auctionhouse212@gmail.com>");

        String emailContent = String.format(
                "Dear %s %s,%n%n" +
                        "Congratulations! Your product '%s' has been sold.%n%n" +
                        "Here are the details:%n" +
                        "Product Name: %s%n" +
                        "Sale Amount: $%.2f%n%n" +
                        "Buyer Information:%n" +
                        "Name: %s %s%n" +
                        "Email: %s%n%n" +
                        "Please contact the buyer to arrange the delivery.%n%n" +
                        "Best regards,%n" +
                        "Your Auction House Team",
                seller.getFirstName(),
                seller.getLastName(),
                product.getName(),
                product.getName(),
                order.getBid().doubleValue(),
                buyer.getFirstName(),
                buyer.getLastName(),
                buyer.getEmail());

        message.setText(emailContent);

        mailSender.send(message);
    }
}
