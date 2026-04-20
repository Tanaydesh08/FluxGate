package com.fluxgate.backend.service;

import com.fluxgate.backend.dto.SignUpRequest;
import com.fluxgate.backend.entity.Role;
import com.fluxgate.backend.entity.User;
import com.fluxgate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public User register(SignUpRequest request){
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        return userRepository.save(user);
    }
}