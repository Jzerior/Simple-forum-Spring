package com.example.projekt.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String content;

    @ElementCollection
    private List<String> likes = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false) // Klucz obcy wskazujący na post
    private Post post;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(name = "date_added", nullable = false)
    private LocalDateTime dateAdded = LocalDateTime.now();

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public Long getPost() {
        return post.getId();
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getAuthor() {
        return author.getLogin();
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }
}
