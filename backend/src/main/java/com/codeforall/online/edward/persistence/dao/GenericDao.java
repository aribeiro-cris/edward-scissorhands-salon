package com.codeforall.online.edward.persistence.dao;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.persistence.jpa.JpaSessionManager;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public abstract class GenericDao<T> implements Dao<T>{

    protected JpaSessionManager sm;
    protected Class<T> TClass;

    public GenericDao(Class<T> TClass) {
        this.TClass = TClass;
    }

    @Autowired
    public void setSm(JpaSessionManager sm) {
        this.sm = sm;
    }

    @Override
    public List<T> findAll() {
        EntityManager em = sm.getCurrentSession();

        //Using criteria query
        CriteriaQuery<T> criteriaQuery = em.getCriteriaBuilder().createQuery(TClass);
        Root<T> root = criteriaQuery.from(TClass);
        return em.createQuery(criteriaQuery).getResultList();
    }

    @Override
    public T findById(Integer id) {
        EntityManager em = sm.getCurrentSession();

        return em.find(TClass, id);
    }

    @Override
    public T saveOrUpdate(T modelObject) {
        EntityManager em = sm.getCurrentSession();

        return em.merge(modelObject);
    }

    @Override
    public void delete(Integer id) {
        EntityManager em = sm.getCurrentSession();

        em.remove(em.find(TClass, id));
    }
}
