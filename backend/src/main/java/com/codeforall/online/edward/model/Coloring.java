package com.codeforall.online.edward.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("COLORING")
public class Coloring extends Appointment{

    @Override
    public ServiceType getServiceType() {
        return ServiceType.COLORING;
    }
}
