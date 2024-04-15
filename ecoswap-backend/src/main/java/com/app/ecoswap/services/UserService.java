package com.app.ecoswap.services;

import com.app.ecoswap.models.User;

import java.util.List;

public interface UserService {

    List<User> getUsers(String token);

    User getUserById(Long id, String token);

    boolean checkEmailExists(User request);

    User createUser(User user);

    User updateUserById(Long id, User user);

    String deleteUser(Long id);

}
