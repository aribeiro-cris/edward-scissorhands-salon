package com.codeforall.online.edward.model.appointment;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.ServiceType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("COLORING & HAIRCUT")
public class ColoringHaircut extends Appointment {

    @Override
    public ServiceType getServiceType() {
        return ServiceType.COLORING_HAIRCUT;
    }
}
