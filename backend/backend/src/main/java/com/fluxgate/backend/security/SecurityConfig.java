package com.fluxgate.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { //temp
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())  // enable config
                .formLogin(Customizer.withDefaults()); // enable config

        // 🔥 NOW DISABLE THEM FORCEFULLY
        http.httpBasic(httpBasic -> httpBasic.disable());
        http.formLogin(form -> form.disable());
        return http.build();
    }
}
