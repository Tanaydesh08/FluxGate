package com.fluxgate.backend.controller;

import com.fluxgate.backend.entity.ApiKey;
import com.fluxgate.backend.entity.ApiUsage;
import com.fluxgate.backend.entity.User;
import com.fluxgate.backend.repository.ApiKeyRepository;
import com.fluxgate.backend.repository.ApiUsageRepository;
import com.fluxgate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usage")
@RequiredArgsConstructor
public class UsageController {

    private final UserRepository userRepository;
    private final ApiKeyRepository apiKeyRepository;
    private final ApiUsageRepository apiUsageRepository;

    private User getCurrentUser() {
        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public List<ApiUsage> getMyUsage() {

        User user = getCurrentUser();

        List<ApiKey> keys = apiKeyRepository.findByUser(user);

        return apiUsageRepository.findByApiKeyIn(keys);
    }

    @GetMapping("/count")
    public long getMyUsageCount() {

        User user = getCurrentUser();

        List<ApiKey> keys = apiKeyRepository.findByUser(user);

        return apiUsageRepository.countByApiKeyIn(keys);
    }
}