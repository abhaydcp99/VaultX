package com.bank.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Client connects here (use SockJS on frontend to be safe).
     * Example frontend URL: /ws
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
            .addEndpoint("/ws")
            .setAllowedOriginPatterns("*")   // change to restrict origins in production
            .withSockJS();
    }

    /**
     * Simple broker to deliver messages to subscribers.
     * We'll use destinations like: /topic/webrtc/{sessionId}
     * And frontend sends to: /app/webrtc/{sessionId}
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // broker for subscriptions
        registry.setApplicationDestinationPrefixes("/app"); // prefix to send to controllers
    }
}
