package auction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import auction.dto.LoginRequest;
import auction.dto.RegistrationRequest;
import auction.model.AppUser;
import auction.repository.AppUserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AppUserService {

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private final AppUserRepository appUserRepository;

    private JWTService jwtService;

    /* return a AppUser object of the recived email */
    public AppUser loadAppUserByEmail(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email);
        if (appUser == null) {
            throw new UsernameNotFoundException("Couldn't find Email");
        }
        return appUser;
    }

    /* register a new user */
    public ResponseEntity<String> signUpUser(RegistrationRequest request) {
        AppUser appUser = appUserRepository.findByEmail(request.getEmail());
        if (appUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already taken");
        }

        appUserRepository.save(new AppUser(request));
        return ResponseEntity.ok("registration complete");
    }

    /*
     * username == email in this system
     * verify the user and generate a token for him
     */

    public ResponseEntity<String> verify(LoginRequest appUser) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(appUser.getEmail(),
                        appUser.getPassword()));
        if (authentication.isAuthenticated())
            return ResponseEntity.ok(jwtService.generateToken(appUser.getEmail()));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access Denied");
    }
}
