package com.codeforall.online.edward.service;

import com.codeforall.online.edward.exceptions.EdwardException;
import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Client;
import com.codeforall.online.edward.persistence.TransactionManager;
import com.codeforall.online.edward.persistence.dao.AppointmentDao;
import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Appointment get(int id) throws EdwardException{
        //Appointment appointment = appointmentDao.findById(id);
        Appointment appointment = Optional.ofNullable(appointmentDao.findById(id)).orElseThrow(EdwardException::new);
        return appointment;
    }

    @Override
    public List<Appointment> list() {
        return appointmentDao.findAll();
    }

    @Override
    public void add(Appointment appointment, Client client) {
        try {
            tx.beginWrite();

            appointment.setClient(client);
            Appointment mergedAppointment = appointmentDao.saveOrUpdate(appointment);

            tx.commit();
        } catch(PersistenceException e) {
            tx.rollback();
        }

    }

    @Override
    public void deleteAppointment(Integer id) throws  EdwardException {
        try {
            tx.beginWrite();

            appointmentDao.delete(id);

            tx.commit();
        } catch (PersistenceException e) {
            tx.rollback();
            throw new EdwardException();
        }
    }

    @Override
    public void updateAppointment(Appointment appointment) throws EdwardException {
        try {
            tx.beginWrite();

            appointmentDao.saveOrUpdate(appointment);

            tx.commit();
        } catch (PersistenceException e) {
            tx.rollback();
            throw new EdwardException();
        }
    }
}
