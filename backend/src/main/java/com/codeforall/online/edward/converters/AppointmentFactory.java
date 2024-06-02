package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.*;
import com.codeforall.online.edward.model.appointment.*;
import org.springframework.stereotype.Component;

@Component
public class AppointmentFactory {

    /**
     * Creates a new @Appointment
     *
     * @return the new appointment
     */
    public Appointment createAccount(String appType) {

        Appointment newApp = switch (appType) {
            case "HAIRCUT" -> new Haircut();
            case "STYLING" -> new Styling();
            case "COLORING" -> new Coloring();
            case "STYLING & COLORING" -> new StylingColoring();
            case "STYLING & HAIRCUT" -> new StylingHaircut();
            case "COLORING & HAIRCUT" -> new ColoringHaircut();
            case "STYLING, COLORING & HAIRCUT" -> new StylingColoringHaircut();
            default -> null;
        };
        return newApp;
    }
}
