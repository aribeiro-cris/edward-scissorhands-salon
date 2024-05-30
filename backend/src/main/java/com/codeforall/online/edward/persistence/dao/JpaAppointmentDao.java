package com.codeforall.online.edward.persistence.dao;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.persistence.jpa.JpaSessionManager;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JpaAppointmentDao extends GenericDao<Appointment> implements AppointmentDao {

    //protected JpaSessionManager sm;
    //protected Class<Appointment> appointmentClass;

    /**
     * Initializes a new JPA DAO instance given an appointment type
    */

    public JpaAppointmentDao() {
        super(Appointment.class);
    }
    /*public JpaAppointmentDao(Class<Appointment> appointmentClass) {
        this.appointmentClass = appointmentClass;
    }

    /**
     * Sets the session manager
     *
     * @param sm the session manager to set
     */
    /*@Autowired
    public void setSm(JpaSessionManager sm) {
        this.sm = sm;
    }

    @Override
    public List<Appointment> findAll() {

        EntityManager em = sm.getCurrentSession();

        //Using criteria query
        CriteriaQuery<Appointment> criteriaQuery = em.getCriteriaBuilder().createQuery(appointmentClass);
        Root<Appointment> root = criteriaQuery.from(appointmentClass);
        return em.createQuery(criteriaQuery).getResultList();

        //return em.createQuery("from " + modelType.getSimpleName() + " order by id", modelType).getResultList();
    }

    @Override
    public Appointment findById(Integer id) {

        EntityManager em = sm.getCurrentSession();

        return em.find(appointmentClass, id);
    }

    @Override
    public Appointment saveOrUpdate(Appointment modelObject) {

        EntityManager em = sm.getCurrentSession();

        return em.merge(modelObject);
    }

    @Override
    public void delete(Integer id) {
        EntityManager em = sm.getCurrentSession();

        em.remove(em.find(appointmentClass, id));
    }*/
}
