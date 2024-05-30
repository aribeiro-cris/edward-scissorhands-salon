package com.codeforall.online.edward.persistence.jpa;

import com.codeforall.online.edward.persistence.SessionManager;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import org.springframework.stereotype.Component;

@Component
public class JpaSessionManager implements SessionManager<EntityManager> {

    private EntityManagerFactory emf;

    private EntityManager em;

    @PersistenceUnit
    public void setEmf(EntityManagerFactory emf) {
        this.emf = emf;
    }

    /**
     * @see SessionManager#startSession()
     */
    @Override
    public void startSession() {

        if(em == null){
            em = emf.createEntityManager();
        }
    }

    /**
     * @see SessionManager#stopSession()
     */
    @Override
    public void stopSession() {
        if(em != null){
            em.close();
        }

        em = null;
    }


    /**
     * @see SessionManager#getCurrentSession()
     */
    @Override
    public EntityManager getCurrentSession() {
        startSession();
        return em;
    }
}
