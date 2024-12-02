package com.example.projekt.controllers;
import com.example.projekt.models.Comment;
import com.example.projekt.models.NewComment;
import com.example.projekt.models.Post;
import com.example.projekt.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/post/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<?> allCommentsFromPost(@PathVariable Long id) {
        List<Comment> comments = commentService.getAllCommentsFromPost(id);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> addComment(@Valid @RequestBody NewComment comment, @PathVariable Long id) {
        Comment savedComment = commentService.addComment(comment,id);
        if (savedComment != null) {
            return ResponseEntity.ok(savedComment);
        }
        return ResponseEntity.badRequest().body(
                Map.of("status", "error", "message", "Wprowadzone zostały błędne dane")
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id, @Valid @RequestBody NewComment commentDetails) {
        try {
            Optional<Comment> updatedComment = commentService.updateComment(id, commentDetails);
            return updatedComment.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(404).build());
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        // Odczytaj zalogowanego użytkownika
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = authentication.getName();  // Login użytkownika

        // Pobierz post z bazy danych
        Comment comment = commentService.getCommentById(id).orElse(null);  // Przyjmujemy, że masz metodę do pobierania posta

        if (comment == null) {
            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message","Post not found")
            );
        }
        // Sprawdzenie, czy użytkownik jest autorem posta lub administratorem
        if (comment.getAuthor().equals(loggedUsername) || authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_admin"))) {

            boolean deleted = commentService.deleteComment(id);  // Usuń post

            return deleted
                    ? ResponseEntity.status(200).body(
                    Map.of("status", "error", "message","Comment deleted successfully")
            )
                    : ResponseEntity.status(404).body(
                    Map.of("status", "error", "message","Failed to delete the comment")
            );
        } else {
            return ResponseEntity.status(403).body(
                    Map.of("status", "error", "message","You are not authorized to delete this comment")
            );
        }
    }

    @GetMapping("{postid}/{commentid}")
    public ResponseEntity<?> getComment(@PathVariable Long commentid) {
        return commentService.getCommentById(commentid)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeComment(@PathVariable Long id, @RequestBody String login) {
        Optional<Comment> likedComment = commentService.likeComment(id, login);
        return likedComment.map(comment -> ResponseEntity.ok("Likes count: " + comment.getLikes().size()))
                .orElse(ResponseEntity.status(404).body("Comment not found"));
    }
}

