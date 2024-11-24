package com.example.projekt.services;

import com.example.projekt.models.User;
import com.example.projekt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

     @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Rejestracja nowego użytkownika
    public User registerUser(User user) {
        if (userRepository.existsByLogin(user.getLogin())) {
            throw new IllegalArgumentException("User with this login already exists.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists.");
        }

        // Hashowanie hasła
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setPassword(user.getPassword());
        // Zapis użytkownika w bazie
        return userRepository.save(user);
    }

    // Pobranie wszystkich użytkowników
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Pobranie użytkownika po ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Aktualizacja danych użytkownika
    public User updateUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        existingUser.setLogin(userDetails.getLogin());
        existingUser.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    // Usuwanie użytkownika
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(id);
    }
}
