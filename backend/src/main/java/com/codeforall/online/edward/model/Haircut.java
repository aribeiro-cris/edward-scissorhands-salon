package com.codeforall.online.edward.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("HAIRCUT")
public class Haircut extends Appointment{

    @Override
    public ServiceType getServiceType() {
        return ServiceType.HAIRCUT;
    }
}
