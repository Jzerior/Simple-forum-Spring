package com.example.projekt.services;


import com.example.projekt.models.Comment;
import com.example.projekt.models.NewComment;
import com.example.projekt.models.Post;
import com.example.projekt.models.User;
import com.example.projekt.repositories.CommentRepository;
import com.example.projekt.repositories.PostRepository;
import com.example.projekt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    // Dodanie nowego komentarza
    public Comment addComment(NewComment newComment, Long id) {
        Optional<Post> postOpt = postRepository.findById(id);
        Optional<User> authorOpt = userRepository.findByLogin(newComment.getAuthor());
        System.out.println(newComment.getAuthor());
        if (postOpt.isEmpty() ) {
            throw new IllegalArgumentException("Post not found");
        }
        if ( authorOpt.isEmpty()) {

            throw new IllegalArgumentException("Author not found");
        }
        Post post = postOpt.get();
        User author = authorOpt.get();
        Comment comment = new Comment();
        comment.setContent(newComment.getContent());
        comment.setPost(post); // Przypisanie komentarza do posta
        comment.setAuthor(author);
        comment.setDateAdded(LocalDateTime.now());

//        post.getComments().add(comment); // Dodanie komentarza do listy w poście (opcjonalne)
//        postRepository.save(post);
        return commentRepository.save(comment);
    }

    // Aktualizacja istniejącego komentarza
    public Optional<Comment> updateComment(Long id, NewComment commentDetails) {
        Optional<Comment> commentOpt = commentRepository.findById(id);

        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();

            // Sprawdzamy, czy użytkownik jest autorem
            if (!comment.getAuthor().equals(commentDetails.getAuthor())) {
                throw new SecurityException("Unauthorized access");
            }

            Optional<User> author = userRepository.findByLogin(commentDetails.getAuthor());
            comment.setContent(commentDetails.getContent());
            comment.setAuthor(author.orElse(null));
            comment.setDateAdded(java.time.LocalDateTime.now());
            return Optional.of(commentRepository.save(comment));
        }

        return Optional.empty();
    }

    // Usuwanie komentarza
    public boolean deleteComment(Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Pobranie wszystkich komentarzy
    public List<Comment> getAllCommentsFromPost(Long id) {
        return commentRepository.findByPostId(id);
    }

    // Pobranie pojedynczego komentarza po ID
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    // Dodanie lub usunięcie polubienia komentarza
    public Optional<Comment> likeComment(Long id, String login) {
        Optional<Comment> commentOpt = commentRepository.findById(id);

        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();

            if (!comment.getLikes().contains(login)) {
                comment.getLikes().add(login);
            } else {
                comment.getLikes().remove(login);
            }

            return Optional.of(commentRepository.save(comment));
        }

        return Optional.empty();
    }

}
