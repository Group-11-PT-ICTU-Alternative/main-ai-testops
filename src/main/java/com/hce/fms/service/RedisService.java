package com.hce.fms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("null")
public class RedisService {
    
    private final RedisTemplate<String, Object> redisTemplate;
    
    /**
     * Set value with TTL
     */
    public void setWithTTL(String key, Object value, long ttlSeconds) {
        try {
            redisTemplate.opsForValue().set(key, value, ttlSeconds, TimeUnit.SECONDS);
            log.debug("Set Redis key: {} with TTL: {} seconds", key, ttlSeconds);
        } catch (Exception e) {
            log.error("Error setting Redis key: {}", key, e);
            throw new RuntimeException("Failed to set Redis value", e);
        }
    }
    
    /**
     * Get value by key
     */
    public Object get(String key) {
        try {
            Object value = redisTemplate.opsForValue().get(key);
            log.debug("Got Redis key: {}, value: {}", key, value);
            return value;
        } catch (Exception e) {
            log.error("Error getting Redis key: {}", key, e);
            return null;
        }
    }
    
    /**
     * Delete key
     */
    public void delete(String key) {
        try {
            Boolean deleted = redisTemplate.delete(key);
            log.debug("Deleted Redis key: {}, success: {}", key, deleted);
        } catch (Exception e) {
            log.error("Error deleting Redis key: {}", key, e);
        }
    }
    
    /**
     * Check if key exists
     */
    public boolean exists(String key) {
        try {
            Boolean exists = redisTemplate.hasKey(key);
            return exists != null && exists;
        } catch (Exception e) {
            log.error("Error checking Redis key existence: {}", key, e);
            return false;
        }
    }
}
