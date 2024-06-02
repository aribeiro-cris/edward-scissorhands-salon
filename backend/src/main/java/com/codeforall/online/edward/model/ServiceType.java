package com.codeforall.online.edward.model;

public enum ServiceType {

    STYLING("STYLING"),
    COLORING("COLORING"),
    HAIRCUT("HAIRCUT"),
    STYLING_COLORING("STYLING & COLORING"),
    STYLING_HAIRCUT("STYLING & HAIRCUT"),
    COLORING_HAIRCUT("COLORING & HAIRCUT"),
    STYLING_COLORING_HAIRCUT("STYLING, COLORING & HAIRCUT");

    private final String description;

    ServiceType(String description) {
        this.description = description;
    }
}
