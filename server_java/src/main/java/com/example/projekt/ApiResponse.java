package com.example.projekt;

public class ApiResponse<T> {
    private int status;
    private T data;

    public ApiResponse(int status, T data) {
        this.status = status;
        this.data = data;
    }

    // Gettery i settery
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
