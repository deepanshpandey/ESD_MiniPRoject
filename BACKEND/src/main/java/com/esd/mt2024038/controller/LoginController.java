package com.esd.mt2024038.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/login")
public class LoginController {

    private static final String USERNAME = "admin";
    private static final String PASSWORD = "pass";

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (USERNAME.equals(loginRequest.getUsername()) && PASSWORD.equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("/status")
    public ResponseEntity<Integer> getStatus() {
        return ResponseEntity.ok(HttpStatus.OK.value());
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}