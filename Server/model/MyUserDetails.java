package auction.model;

import java.util.Collections;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/*
 * class to implement the UserDetails for the spring-security
 */
public class MyUserDetails implements UserDetails {

    private AppUser appUser;

    public MyUserDetails(AppUser appUser) {
        this.appUser = appUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return appUser.getPassword();
    }

    /* userName == Email */
    @Override
    public String getUsername() {
        return appUser.getEmail();
    }

}
