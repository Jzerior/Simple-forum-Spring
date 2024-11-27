package com.example.projekt.repositories;

import com.example.projekt.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    // Znajdź wszystkie komentarze dla konkretnego postu
    List<Comment> findByPostId(Long postId);

    // Posortowane komentarze po dacie dodania (np. najnowsze)
    List<Comment> findAllByOrderByDateAddedDesc();
}
