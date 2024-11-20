package com.esd.mt2024038.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "ddym0mhnd",  // Replace with your Cloud Name
                "api_key", "713278299299555",        // Replace with your API Key
                "api_secret", "XaYBHgp6PVWC_ojHDURkw7ixPJo"  // Replace with your API Secret
        ));
    }
}