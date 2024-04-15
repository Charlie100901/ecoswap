package com.app.ecoswap.config;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class SessionTokenService {

    private final Map<String, String> sessionTokens = new HashMap<>();

    public String generateSessionToken(String email) {
        // Genera un token de sesión único (puedes usar UUID, SecureRandom, etc.)
        String sessionToken = generateUniqueSessionToken();

        // Asocia el token de sesión con el nombre de usuario
        sessionTokens.put("Bearer "+sessionToken, email);

        return sessionToken;
    }

    public boolean isValidSessionToken(String sessionToken) {
        return sessionTokens.containsKey(sessionToken);
    }

    public String getUserEmailFromToken(String token) {
        return sessionTokens.get(token);
    }

    private String generateUniqueSessionToken() {
        return String.valueOf(UUID.randomUUID());
    }
}
