package auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.dto.LoginRequest;
import auction.dto.RegistrationRequest;
import auction.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "api/")
@AllArgsConstructor
public class UserController {

    private AppUserService appUserService;

    /* verify the user and generate a token for him */
    @PostMapping("login")
    public ResponseEntity<String> postMethodName(@RequestBody LoginRequest appUser) {
        return appUserService.verify(appUser);
    }

    /* register a user to the system */
    @PostMapping(path = "registration")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        return appUserService.signUpUser(request);
    }

    /* check if a user token is valid */
    @GetMapping(path = "user/validateToken")
    public ResponseEntity<String> validateToken() {
        return ResponseEntity.ok("Valid Token");
    }

}
