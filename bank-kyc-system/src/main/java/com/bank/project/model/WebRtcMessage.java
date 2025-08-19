package com.bank.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic signaling message DTO.
 * 'type' can be "offer" | "answer" | "ice" | "join" etc.
 * 'from' and 'to' are optional identifiers (e.g. clerkId/customerId or socket client id).
 * 'payload' contains SDP or ICE candidate JSON as string/object.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebRtcMessage {
    private String type;
    private String from;
    private String to;
    private Object payload;
}
