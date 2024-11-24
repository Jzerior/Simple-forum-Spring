package com.example.projekt.controllers;

import com.example.projekt.ApiResponse;
import com.example.projekt.models.Post;
import com.example.projekt.models.PostDTO;
import com.example.projekt.repositories.PostRepository;
import com.example.projekt.repositories.UserRepository;
import com.example.projekt.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<?> allPosts(){
        List<PostDTO> posts=postService.getAllPosts();
        //ApiResponse<List<Post>> response = new ApiResponse<>(200, posts);
        return ResponseEntity.ok(posts);
    }
    @PostMapping
    public ResponseEntity<?> addPost(@RequestBody Post post) {
        Post savedPost = postService.addPost(post);
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post postDetails, @RequestParam String login) {
        try {
            Optional<Post> updatedPost = postService.updatePost(id, postDetails, login);
            return updatedPost.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(404).build());
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        boolean deleted = postService.deletePost(id);
        return deleted
                ? ResponseEntity.ok("Post deleted successfully")
                : ResponseEntity.status(404).body("Post not found");
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
        return likedPost.map(post -> ResponseEntity.ok("Likes count: " + post.getLikes().size()))
                .orElse(ResponseEntity.status(404).body("Post not found"));
    }
}
