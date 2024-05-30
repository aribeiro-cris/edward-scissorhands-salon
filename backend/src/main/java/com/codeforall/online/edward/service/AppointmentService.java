package com.codeforall.online.edward.service;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Client;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface AppointmentService {

    Appointment get(int id);

    List<Appointment> list();

    void add(Appointment appointment, Client client);

    void deleteAppointment(Integer id);

    void updateAppointment(Appointment appointment);
}
