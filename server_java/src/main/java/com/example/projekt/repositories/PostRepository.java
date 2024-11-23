package com.example.projekt.repositories;

import com.example.projekt.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // Znajdź wszystkie posty użytkownika po jego ID (author_id)
    List<Post> findByAuthorId(Long authorId);

    // Wyszukaj posty na podstawie nazwy (np. wyszukiwanie podobnych nazw)
    List<Post> findByNameContainingIgnoreCase(String name);

    // Posortowane wyniki po dacie dodania
    List<Post> findAllByOrderByDateAddedDesc();
}
