package com.bank.project.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClerkReviewRequest {

    @NotNull
    private boolean selfieVerified;

    @NotNull
    private boolean poiVerified;

    @NotNull
    private boolean poaVerified;

    @NotNull
    private boolean livenessPassed;

    private String notes;
}
