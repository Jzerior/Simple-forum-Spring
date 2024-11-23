package com.example.projekt.repositories;

import com.example.projekt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Metoda do wyszukiwania użytkownika po loginie
    Optional<User> findByLogin(String login);

    // Metoda do wyszukiwania użytkownika po emailu
    Optional<User> findByEmail(String email);

    // Sprawdzenie, czy użytkownik istnieje na podstawie loginu
    boolean existsByLogin(String login);

    // Sprawdzenie, czy użytkownik istnieje na podstawie emaila
    boolean existsByEmail(String email);
}
