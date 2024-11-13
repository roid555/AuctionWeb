package auction.model;

import auction.dto.RegistrationRequest;
import auction.enums.AppUserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * The AppUser class represent the users of the website
 * the users can add new products to sell or buy products from other users
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
public class AppUser {

    @SequenceGenerator(name = "userId", sequenceName = "userIdSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userId")
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole role;

    public AppUser(String firstName, String lastName, String email, String password,
            AppUserRole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public AppUser(RegistrationRequest request) {
        this.firstName = request.getFirstName();
        this.lastName = request.getLastName();
        this.email = request.getEmail();
        this.password = request.getPassword();

    }

}
