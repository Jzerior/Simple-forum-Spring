package com.example.projekt.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PostDTO {
    private Long id;
    private String name;
    private String content;
    private List<String> likes = new ArrayList<>();
    private String author;
    private int commentsCount;
    private LocalDateTime dateAdded;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public PostDTO(Post post){
        this.id=post.getId();
        this.name=post.getName();
        this.content=post.getContent();
        this.author=post.getAuthor().getLogin();
        this.likes=post.getLikes();
        this.commentsCount=post.getCommentsCount();
        this.dateAdded=post.getDateAdded();
    }
}