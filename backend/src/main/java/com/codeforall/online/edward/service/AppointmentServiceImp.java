package com.codeforall.online.edward.service;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Client;
import com.codeforall.online.edward.persistence.TransactionManager;
import com.codeforall.online.edward.persistence.dao.AppointmentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImp implements AppointmentService {

    private TransactionManager tx;
    private AppointmentDao appointmentDao;

    @Autowired
    public void setTx(TransactionManager tx) {
        this.tx = tx;
    }

    @Autowired
    public void setAppointmentDao(AppointmentDao appointmentDao) {
        this.appointmentDao = appointmentDao;
    }


    @Override
    public Appointment get(int id) {
        Appointment appointment = appointmentDao.findById(id);
        return appointment;
    }

    @Override
    public List<Appointment> list() {
        return appointmentDao.findAll();
    }

    @Override
    public void add(Appointment appointment, Client client) {
        tx.beginWrite();

        appointment.setClient(client);
        Appointment mergedAppointment = appointmentDao.saveOrUpdate(appointment);

        tx.commit();
    }

    @Override
    public void deleteAppointment(Integer id) {
        tx.beginWrite();

        appointmentDao.delete(id);

        tx.commit();
    }

    @Override
    public void updateAppointment(Appointment appointment) {
        tx.beginWrite();

        appointmentDao.saveOrUpdate(appointment);

        tx.commit();
    }
}
