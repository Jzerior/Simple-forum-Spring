package com.example.projekt;

import com.example.projekt.models.Comment;
import com.example.projekt.models.NewComment;
import com.example.projekt.models.Post;
import com.example.projekt.models.User;
import com.example.projekt.repositories.CommentRepository;
import com.example.projekt.repositories.PostRepository;
import com.example.projekt.repositories.UserRepository;
import com.example.projekt.services.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldAddCommentToPost() {
        // Arrange
        Long postId = 1L;
        String authorLogin = "john_doe";
        String content = "This is a comment";

        Post post = new Post();
        post.setId(postId);

        User author = new User();
        author.setLogin(authorLogin);

        NewComment newComment = new NewComment();
        newComment.setAuthor(authorLogin);
        newComment.setContent(content);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userRepository.findByLogin(authorLogin)).thenReturn(Optional.of(author));
        when(commentRepository.save(any(Comment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Comment result = commentService.addComment(newComment, postId);

        // Assert
        assertNotNull(result);
        assertEquals(content, result.getContent());
        assertEquals(authorLogin, result.getAuthor());
        verify(commentRepository, times(1)).save(result);
    }

    @Test
    void shouldThrowExceptionWhenPostNotFound() {
        // Arrange
        Long postId = 1L;
        NewComment newComment = new NewComment();
        newComment.setAuthor("john_doe");
        newComment.setContent("This is a comment");

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            commentService.addComment(newComment, postId);
        });

        assertEquals("Post not found", exception.getMessage());
        verify(commentRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenAuthorNotFound() {
        // Arrange
        Long postId = 1L;
        String authorLogin = "john_doe";
        NewComment newComment = new NewComment();
        newComment.setAuthor(authorLogin);
        newComment.setContent("This is a comment");

        Post post = new Post();
        post.setId(postId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userRepository.findByLogin(authorLogin)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            commentService.addComment(newComment, postId);
        });

        assertEquals("Author not found", exception.getMessage());
        verify(commentRepository, never()).save(any());
    }
}
