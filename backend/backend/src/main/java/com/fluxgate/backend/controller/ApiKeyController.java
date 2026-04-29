package com.fluxgate.backend.controller;

import com.fluxgate.backend.entity.ApiKey;
import com.fluxgate.backend.entity.User;
import com.fluxgate.backend.repository.ApiKeyRepository;
import com.fluxgate.backend.repository.UserRepository;
import com.fluxgate.backend.service.ApiKeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-keys")
@RequiredArgsConstructor
public class ApiKeyController {

    private final ApiKeyService apiKeyService;
    private final UserRepository userRepository;
    private final ApiKeyRepository apiKeyRepository;

    @PostMapping("/generate")
    public ApiKey generateKey() {
        return apiKeyService.generateApiKey();
    }

    @GetMapping("/my")
    public List<ApiKey> getMyKeys() {

        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findByEmail(email).orElseThrow();

        return apiKeyRepository.findByUser(user);
    }
}