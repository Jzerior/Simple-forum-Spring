package com.example.projekt;

import com.example.projekt.auth.JwtConfig;
import com.example.projekt.controllers.CommentController;
import com.example.projekt.models.Comment;
import com.example.projekt.models.NewComment;
import com.example.projekt.models.Post;
import com.example.projekt.models.User;
import com.example.projekt.repositories.PostRepository;
import com.example.projekt.repositories.UserRepository;
import com.example.projekt.security.SecurityConfig;
import com.example.projekt.services.CommentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean // Tworzy mock zarejestrowany w kontekście Springa
    private CommentService commentService;
    @MockBean
    private PostRepository postRepository;  // Mockowanie repozytorium Post
    @MockBean
    private UserRepository userRepository;  // Mockowanie repozytorium Post

    @Test
    void shouldAddCommentSuccessfully() throws Exception {
        // Arrange
        Long postId = Long.valueOf("1");
        Long userId = 1L;
        // Tworzymy użytkownika, który doda komentarz
        User user = new User();
        user.setId(userId);
        user.setLogin("john_doe");
        user.setEmail("john_doe@example.com");
        userRepository.save(user);

        // Tworzymy obiekt Post, który zostanie przypisany do komentarza
        Post post = new Post();
        post.setId(postId);
        post.setName("Test Post");
        post.setContent("Test content");
        post.setAuthor(user);
        postRepository.save(post);
        // Mockujemy repozytoria, żeby zwróciły stworzone obiekty
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userRepository.findByLogin("john_doe")).thenReturn(Optional.of(user));

        Comment comment = new Comment();
        comment.setId(1L);
        comment.setContent("This is a comment");
        comment.setPost(post); // Przypisanie komentarza do posta
        comment.setAuthor(user);
        when(commentService.addComment(any(NewComment.class), eq(postId))).thenReturn(comment);

        mockMvc.perform(post("/post/comment/1") // 1 to postId
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"author\": \"john_doe\", \"content\": \"This is a comment\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("This is a comment"));

        verify(commentService, times(1)).addComment(any(NewComment.class), eq(postId));
    }

//    @Test
//    void shouldReturnBadRequestWhenAuthorNotFound() throws Exception {
//        // Arrange
//        Long postId = 1L;
//
//        when(commentService.addComment(any(NewComment.class), eq(postId)))
//                .thenThrow(new IllegalArgumentException("Author not found"));
//
//        // Act & Assert
//        mockMvc.perform(post("/post/comment/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"author\": \"john_doe\", \"content\": \"This is a comment\"}"))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().string("Author not found"));
//
//        verify(commentService, times(1)).addComment(any(NewComment.class), eq(postId));
//    }
}