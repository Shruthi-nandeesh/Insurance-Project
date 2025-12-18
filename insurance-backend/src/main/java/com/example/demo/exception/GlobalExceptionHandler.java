package com.example.demo.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex){
        Map<String,Object> m = new HashMap<>();
        m.put("timestamp", LocalDateTime.now());
        m.put("message", ex.getMessage());
        m.put("status", HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(m, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundException ex){
        Map<String,Object> m = new HashMap<>();
        m.put("timestamp", LocalDateTime.now());
        m.put("message", ex.getMessage());
        m.put("status", HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(m, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex){
        Map<String,Object> m = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(err -> m.put(err.getField(), err.getDefaultMessage()));
        return new ResponseEntity<>(m, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAll(Exception ex){
        Map<String,Object> m = new HashMap<>();
        m.put("timestamp", LocalDateTime.now());
        m.put("message", ex.getMessage());
        m.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(m, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
