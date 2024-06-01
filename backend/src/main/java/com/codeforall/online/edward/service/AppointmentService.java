package com.codeforall.online.edward.service;

import com.codeforall.online.edward.exceptions.EdwardException;
import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Client;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface AppointmentService {

    Appointment get(int id) throws EdwardException;

    List<Appointment> list();

    void add(Appointment appointment, Client client);

    void deleteAppointment(Integer id) throws EdwardException;

    void updateAppointment(Appointment appointment) throws EdwardException;
}
