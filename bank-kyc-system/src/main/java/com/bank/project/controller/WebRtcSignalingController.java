package com.bank.project.controller;

import com.bank.project.model.WebRtcMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Simple signaling controller.
 *
 * Usage:
 * - Frontend connects to /ws (SockJS + Stomp)
 * - Subscribe to: /topic/webrtc/{sessionId}
 * - Send signaling messages to: /app/webrtc/{sessionId}
 *
 * This controller simply forwards messages to all subscribers of /topic/webrtc/{sessionId}.
 * It does NOT persist anything.
 */
@Controller
public class WebRtcSignalingController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebRtcSignalingController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Forward signaling message to topic for that sessionId.
     * sessionId can be any string you choose (e.g. kycApplicationId or generated uuid).
     */
    @MessageMapping("/webrtc/{sessionId}")
    public void handleWebRtcSignal(@DestinationVariable String sessionId, WebRtcMessage message) {
        // Forward to all clients subscribed to /topic/webrtc/{sessionId}
        messagingTemplate.convertAndSend("/topic/webrtc/" + sessionId, message);
    }
}
