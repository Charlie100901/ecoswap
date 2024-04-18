package com.app.ecoswap.services;

import com.app.ecoswap.models.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<User> getUsers(String token);

    User getUserById(Long id, String token);

    boolean checkEmailExists(User request);

    User createUser(User user);

    User updateUserById(Long id, User user, String token);

    Map<String, String> deleteUser(Long id, String token);

}
