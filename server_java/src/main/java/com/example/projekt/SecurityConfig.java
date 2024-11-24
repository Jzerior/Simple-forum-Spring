package com.example.projekt;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Nowy sposób na wyłączenie CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/posts").permitAll() // Publiczny dostęp do `/api/posts`
                        .requestMatchers("/api/auth/**").permitAll() // Publiczne endpointy autoryzacji
                        .anyRequest().authenticated() // Wszystkie inne endpointy wymagają uwierzytelnienia
                );
        return http.build();
    }
}
