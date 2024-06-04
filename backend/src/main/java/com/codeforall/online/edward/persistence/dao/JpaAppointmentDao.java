package com.codeforall.online.edward.persistence.dao;

import com.codeforall.online.edward.model.Appointment;
import org.springframework.stereotype.Repository;

@Repository
public class JpaAppointmentDao extends GenericDao<Appointment> implements AppointmentDao {

    /**
     * Initializes a new JPA DAO instance given an appointment type
    */

    public JpaAppointmentDao() {
        super(Appointment.class);
    }

}
