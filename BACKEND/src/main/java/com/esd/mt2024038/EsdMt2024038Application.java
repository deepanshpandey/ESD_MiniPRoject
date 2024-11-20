package com.esd.mt2024038;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EsdMt2024038Application {

    public static void main(String[] args) {
        SpringApplication.run(EsdMt2024038Application.class, args);
    }

    // CORS configuration bean
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow all origins or define specific frontend URLs
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // React frontend URL without trailing slash
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);  // Allow sending credentials (cookies, headers)
            }
        };
    }
}
