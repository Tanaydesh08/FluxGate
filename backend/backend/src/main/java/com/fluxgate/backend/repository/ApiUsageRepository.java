package com.fluxgate.backend.repository;

import com.fluxgate.backend.entity.ApiKey;
import com.fluxgate.backend.entity.ApiUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiUsageRepository extends JpaRepository<ApiUsage, Long> {

    List<ApiUsage> findByApiKeyIn(List<ApiKey> apiKeys);
    long countByApiKeyIn(List<ApiKey> apiKeys);
}