package com.fluxgate.backend.repository;

import com.fluxgate.backend.entity.ApiKey;
import com.fluxgate.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApiKeyRepository extends JpaRepository<ApiKey, Long> {
    Optional<ApiKey> findByKey(String key);
    List<ApiKey> findByUser(User user);
}
