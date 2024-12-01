package com.example.projekt;


import com.example.projekt.models.Comment;
import com.example.projekt.models.Post;
import com.example.projekt.models.User;
import com.example.projekt.repositories.CommentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@DataJpaTest
@TestPropertySource(locations = "classpath:application.properties")
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldSaveCommentSuccessfully() {
        // Tworzenie autora
        User author = new User();
        author.setLogin("test_user");
        author.setEmail("test@example.com");
        author.setPassword("password");
        entityManager.persist(author);

        // Tworzenie posta
        Post post = new Post();
        post.setName("Test Post");
        post.setContent("Test Content");
        post.setAuthor(author);
        entityManager.persist(post);

        // Tworzenie komentarza
        Comment comment = new Comment();
        comment.setContent("Test comment");
        comment.setAuthor(author);
        comment.setPost(post); // Ustawienie posta
        comment.setDateAdded(LocalDateTime.now());

        // Zapis komentarza
        Comment savedComment = commentRepository.save(comment);

        // Weryfikacja
        assertNotNull(savedComment.getId());
        assertEquals("Test comment", savedComment.getContent());
        assertEquals("test_user", savedComment.getAuthor());
        assertEquals(1, savedComment.getPost());
    }

}