package com.master.InstagramClone.controllers;

import com.master.InstagramClone.config.JwtProvider;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.UserRepo;
import com.master.InstagramClone.request.LoginRequest;
import com.master.InstagramClone.response.AuthResponse;
import com.master.InstagramClone.services.CustomerUserDetailsService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @PostMapping("/signup")
    public AuthResponse addUser(@RequestBody User user) throws Exception {
        User isExist = userRepo.findByEmail(user.getEmail());

        if(isExist!=null){
            throw new Exception("this email already used with another account");
        }
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());
        User savedUser = userRepo.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token,"Register Successfully");

        return authResponse;
    }
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {

        if (loginRequest == null || loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password must be provided");
        }

        // Perform authentication
        Authentication authentication;
        try {
            authentication = authenticate(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
        } catch (Exception ex) {
            // You might want to handle bad credentials here
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        // Generate JWT token
        String token = JwtProvider.generateToken(authentication);

        // Create response object with token and message
        AuthResponse authResponse = new AuthResponse(token, "Login Successfully");

        // Return response with body and status 202 ACCEPTED
        return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
    }


    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

        if (userDetails==null){
            throw new BadCredentialsException("invalid Username");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Wrong Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,
                null,
                userDetails.getAuthorities());
    }
}
