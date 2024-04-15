package com.app.ecoswap.services.impl;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.EmailAlreadyExistsException;
import com.app.ecoswap.exceptions.InvalidSessionTokenException;
import com.app.ecoswap.exceptions.UserNotFoundException;
import com.app.ecoswap.models.Role;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IRoleRepository;
import com.app.ecoswap.repositories.IUserRepository;
import com.app.ecoswap.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private SessionTokenService sessionTokenService;

//    @Autowired
//    private PasswordEncoder passwordEncoder;


    @Override
    public List<User> getUsers(String token){
        if(sessionTokenService.isValidSessionToken(token)){
            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));
            if(user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))){
                return (ArrayList<User>) userRepository.findAll();
            }else{
                return Collections.singletonList(user);
            }
        }else{
            throw new InvalidSessionTokenException("El token es invalido");
        }
    }


    @Override
    public User getUserById(Long id, String token)  {
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException("Usuario no existe en la base de datos"));
    }

    @Override
    @Transactional
    public User createUser(User user){
        if (!checkEmailExists(user)) {
            Optional<Role> optionalRoleUser = roleRepository.findByName("ROLE_USER");
            List<Role> roles = new ArrayList<>();

            optionalRoleUser.ifPresent(roles::add);

            if(user.isAdmin()){
                Optional<Role> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");
                optionalRoleAdmin.ifPresent(roles::add);
            }
            user.setRoles(roles);
            //Encriptar la contraseña
            user.setPassword(user.getPassword());
            return userRepository.save(user);
        }else{
            throw new EmailAlreadyExistsException("El email ya se encuentra en uso, por favor elija otro");
        }
    }


    @Override
    @Transactional
    public User updateUserById(Long id, User user){
            Optional<User> existingUserOptional = userRepository.findById(id);
            if(existingUserOptional.isPresent()){
                User existingUser = existingUserOptional.get();
                existingUser.setName(user.getName());
                existingUser.setAddress(user.getAddress());
                existingUser.setPassword(user.getPassword());
                existingUser.setCellphoneNumber(user.getCellphoneNumber());
                return userRepository.save(existingUser);
            }else {
                throw new UserNotFoundException("No se encontró un usuario");
            }
    }


    @Override
    public String deleteUser(Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            return "Usuario eliminado exitosamente";
        } else {
            throw new UserNotFoundException("No se encontró un usuario con el ID especificado: " + id);
        }
    }

    @Override
    public boolean checkEmailExists(User request){
        Optional<User> userOptional = userRepository.findUserByEmail(request.getEmail());
        return userOptional.isPresent();
    }







}
