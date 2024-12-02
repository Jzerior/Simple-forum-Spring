package com.example.projekt.controllers;

import com.example.projekt.models.NewPost;
import com.example.projekt.models.Post;
import com.example.projekt.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<?> allPosts(){
        List<Post> posts=postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    @GetMapping({"/page/{page}"})
    public ResponseEntity<?> allPostsByPage(@PathVariable int page){
        List<Post> posts=postService.getPostsByPage(page,5);
        System.out.println(posts.toArray().length);
        return ResponseEntity.ok(posts);
    }
    @PostMapping
    public ResponseEntity<?> addPost(@RequestBody NewPost post) {
        Post savedPost = postService.addPost(post);
        if(savedPost != null){
        return ResponseEntity.ok(savedPost);
        }
        return ResponseEntity.badRequest().body(
                Map.of("status", "error", "message","Wprowadzone zostały błędne dane")
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody NewPost postDetails) {
        try {
            Optional<Post> updatedPost = postService.updatePost(id, postDetails);
            return updatedPost.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(404).build());
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        // Odczytaj zalogowanego użytkownika
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = authentication.getName();  // Login użytkownika

        // Pobierz post z bazy danych
        Post post = postService.getPostById(id).orElse(null);  // Przyjmujemy, że masz metodę do pobierania posta

        if (post == null) {
            return ResponseEntity.status(404).body(
                    Map.of("status", "error", "message","Post not found")
            );
        }
        // Sprawdzenie, czy użytkownik jest autorem posta lub administratorem
        if (post.getAuthor().equals(loggedUsername) || authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_admin"))) {

            boolean deleted = postService.deletePost(id);  // Usuń post

            return deleted
                ? ResponseEntity.status(200).body(
                Map.of("status", "error", "message","Post deleted successfully")
            )
                : ResponseEntity.status(404).body(
                Map.of("status", "error", "message","Failed to delete the post")
            );
        } else {
            return ResponseEntity.status(403).body(
                    Map.of("status", "error", "message","You are not authorized to delete this post")
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());

    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id, @RequestBody String login) {
        Optional<Post> likedPost = postService.likePost(id, login);
        return likedPost.map(post -> ResponseEntity.ok(Map.of(
                        "status", "success",
                        "message", "likesCount: "+post.getLikes().size(),
                        "data",post.getLikes().size()
                )))
                .orElse(ResponseEntity.status(404).body(Map.of(
                        "status", "error",
                        "message", "Post not found"
                )));
    }
}
