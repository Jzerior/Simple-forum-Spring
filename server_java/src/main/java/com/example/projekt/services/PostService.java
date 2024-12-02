package com.example.projekt.services;

import com.example.projekt.models.NewPost;
import com.example.projekt.models.Post;
import com.example.projekt.models.User;
import com.example.projekt.repositories.PostRepository;
import com.example.projekt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // Dodanie nowego postu
    
    public Post addPost(NewPost newpost) {
        Optional<User> author = userRepository.findByLogin(newpost.getAuthor());
        if(author.isPresent()){
            Post post = new Post();
            post.setName(newpost.getName());
            post.setContent(newpost.getContent());
            post.setAuthor(author.orElse(null));
            post.setDateAdded(java.time.LocalDateTime.now());
            return postRepository.save(post);
        }
        return null;
    }

    // Aktualizacja istniejącego postu
    public Optional<Post> updatePost(Long id, NewPost postDetails) {
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isPresent()) {
            Post post = postOpt.get();

            // Sprawdzamy, czy użytkownik jest autorem
            if (!post.getAuthor().equals(postDetails.getAuthor())) {
                throw new SecurityException("Unauthorized access");
            }
            Optional<User> author = userRepository.findByLogin(postDetails.getAuthor());
            post.setName(postDetails.getName());
            post.setContent(postDetails.getContent());
            post.setAuthor(author.orElse(null));
            post.setDateAdded(java.time.LocalDateTime.now());
            return Optional.of(postRepository.save(post));

        }

        return Optional.empty();
    }

    // Usuwanie postu
    public boolean deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Pobranie wszystkich postów
    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        posts.forEach(post -> post.setCommentsCount(post.getComments().size()));
        return posts;
    }

    // Pobranie pojedynczego postu po ID
    public Optional<Post> getPostById(Long id) {
        Optional<Post> postOpt = postRepository.findById(id);
        postOpt.ifPresent(post -> post.setCommentsCount(post.getComments().size()));
        return postOpt;
    }

    // Pobranie postów z paginacją (prosta implementacja)
    public List<Post> getPostsByPage(int page, int limit) {
        int offset = (page - 1) * limit;
        List<Post> posts = postRepository.findAll()
                .stream()
                .skip(offset)
                .limit(limit)
                .peek(post -> post.setCommentsCount(post.getComments().size()))
                .toList();
        posts.forEach(post -> post.setCommentsCount(post.getComments().size()));
        return posts;
    }

    // Dodanie lub usunięcie polubienia postu
    public Optional<Post> likePost(Long id, String login) {
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isPresent()) {
            Post post = postOpt.get();

            if (!post.getLikes().contains(login)) {
                post.getLikes().add(login);
            } else {
                post.getLikes().remove(login);
            }

            return Optional.of(postRepository.save(post));
        }

        return Optional.empty();
    }
}

