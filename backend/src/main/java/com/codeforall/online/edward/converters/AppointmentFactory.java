package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.*;
import org.springframework.stereotype.Component;

import static com.codeforall.online.edward.model.ServiceType.*;

@Component
public class AppointmentFactory {

    /**
     * Creates a new @Appointment
     *
     * @return the new appointment
     */
    public Appointment createAccount(ServiceType appType) {

        Appointment newApp = switch (appType) {
            case HAIRCUT -> new Haircut();
            case STYLING -> new Styling();
            case COLORING -> new Coloring();
            default -> null;
        };
        return newApp;
    }
}
