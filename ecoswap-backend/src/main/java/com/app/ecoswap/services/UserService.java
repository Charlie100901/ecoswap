package com.app.ecoswap.services;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.EmailAlreadyExistsException;
import com.app.ecoswap.exceptions.InvalidSessionTokenException;
import com.app.ecoswap.exceptions.UnauthorizedAccessException;
import com.app.ecoswap.exceptions.UserNotFoundException;
import com.app.ecoswap.models.Role;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IRoleRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService  {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private SessionTokenService sessionTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<User> getUsers(String token){
        if(sessionTokenService.isValidSessionToken(token)){
            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));
            List<Role> roles = user.getRoles();
            for(Role rol: roles){
                if(rol.getName().equals("ADMIN")){
                    return (ArrayList<User>) userRepository.findAll();
                }else{
                    break;
                }
            }
            throw new UnauthorizedAccessException("No tienes acceso a este endpoint");
        }else{
            throw new InvalidSessionTokenException("El token es invalido");
        }
    }


    public User getUserById(Long id, String token)  {
        if(sessionTokenService.isValidSessionToken(token)){
            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));
            List<Role> roles = user.getRoles();
            for(Role rol: roles){
                if(rol.getName().equals("ADMIN")){
                    return userRepository.findById(id)
                            .orElseThrow(()->new UserNotFoundException("Usuario no existe en la base de datos"));
                }else{
                    break;
                }
            }
            return user;
        }else{
            throw new InvalidSessionTokenException("El token es invalido");
        }
        
    }

    @Transactional
    public User createUser(User user){
        if (!checkEmailExists(user)) {
            Optional<Role> optionalRoleUser = roleRepository.findByName("USER");
            List<Role> roles = new ArrayList<>();

            optionalRoleUser.ifPresent(roles::add);

            user.setRoles(roles);
            //Encriptar la contraseña
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }else{
            throw new EmailAlreadyExistsException("El email ya se encuentra en uso, por favor elija otro");
        }
    }


    @Transactional
    public User updateUserById(Long id, User userRequest, String token){
        if(sessionTokenService.isValidSessionToken(token)){
            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));
            boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));
            if(user.getId().equals(id) || isAdmin){
                user.setName(userRequest.getName());
                user.setAddress(userRequest.getAddress());
                user.setPassword(userRequest.getPassword());
                user.setCellphoneNumber(userRequest.getCellphoneNumber());
                return userRepository.save(user);
            }else {
                throw new UnauthorizedAccessException("No tienes permiso para eliminar este perfil");
            }
        }else{
            throw new InvalidSessionTokenException("El token es invalido");
        }

    }


    public Map<String, String> deleteUser(Long id, String token) {
        if (sessionTokenService.isValidSessionToken(token)) {
            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
            boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));

            if (user.getId().equals(id) || isAdmin) {
                userRepository.deleteById(id);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Usuario eliminado exitosamente");
                return response;
            } else {
                throw new UnauthorizedAccessException("No tienes permiso para eliminar este perfil");
            }
        } else {
            throw new InvalidSessionTokenException("El token es inválido");
        }
    }


    public boolean checkEmailExists(User request){
        Optional<User> userOptional = userRepository.findUserByEmail(request.getEmail());
        return userOptional.isPresent();
    }


    public User getUserByToken(String token){
        if (!sessionTokenService.isValidSessionToken(token)){
            throw new InvalidSessionTokenException("token no valido");
        }
        String email = sessionTokenService.getUserEmailFromToken(token);
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotFoundException("No usuario encontrado"));
        return user;
    }







}
