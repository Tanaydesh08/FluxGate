package com.fluxgate.backend.controller;

import com.fluxgate.backend.entity.ApiKey;
import com.fluxgate.backend.entity.User;
import com.fluxgate.backend.repository.ApiKeyRepository;
import com.fluxgate.backend.repository.ApiUsageRepository;
import com.fluxgate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final UserRepository userRepository;
    private final ApiKeyRepository apiKeyRepository;
    private final ApiUsageRepository apiUsageRepository;

    @GetMapping("/summary")
    public Map<String, Object> summary(){
        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findByEmail(email).orElseThrow();
        List<ApiKey> keys = apiKeyRepository.findByUser(user);

        List<ApiKey> keyValues = apiKeyRepository.findByUser(user);
        long usageCount = apiUsageRepository.countByApiKeyIn(keyValues);

        int quota = user.getPlan().getMonthlyQuota();
        Map<String, Object> data = new HashMap<>();

        data.put("email", user.getEmail());
        data.put("plan", user.getPlan().getName());
        data.put("price", user.getPlan().getPrice());
        data.put("requestsPerMinute", user.getPlan().getRequestPerMinute());
        data.put("monthlyQuota", quota);
        data.put("totalUsage", usageCount);
        data.put("remainingQuota", quota - usageCount);
        data.put("apiKeys", keys.size());
        return data;
    }
}
