package com.example.projekt.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Możesz określić, które ścieżki mają wspierać CORS
        registry.addMapping("/**")  // Zezwolenie na wszystkie ścieżki
                .allowedOrigins("http://localhost:5173/")  // Dodaj źródło frontendowe
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Dozwolone metody HTTP
                .allowedHeaders("*")  // Zezwolenie na wszystkie nagłówki
                .allowCredentials(true);  // Jeśli potrzebujesz obsługi ciasteczek
    }
}