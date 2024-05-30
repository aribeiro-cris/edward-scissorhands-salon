package com.codeforall.online.edward.persistence.jpa;

import com.codeforall.online.edward.persistence.TransactionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JpaTransactionManager implements TransactionManager {

    private JpaSessionManager sm;

    @Autowired
    public void setSm(JpaSessionManager sm) {
        this.sm = sm;
    }

    /**
     * @see TransactionManager#beginRead()
     */
    @Override
    public void beginRead() {
        sm.startSession();
    }

    /**
     * @see TransactionManager#beginWrite()
     */
    @Override
    public void beginWrite() {
        sm.getCurrentSession().getTransaction().begin();
    }

    /**
     * @see TransactionManager#commit()
     */
    public void commit() {

        if(sm.getCurrentSession().getTransaction().isActive()) {
            sm.getCurrentSession().getTransaction().commit();
        }

        sm.stopSession();
    }

    /**
     * @see TransactionManager#rollback()
     */
    public void rollback() {

        if(sm.getCurrentSession().getTransaction().isActive()) {
            sm.getCurrentSession().getTransaction().rollback();
        }

        sm.stopSession();
    }
}
