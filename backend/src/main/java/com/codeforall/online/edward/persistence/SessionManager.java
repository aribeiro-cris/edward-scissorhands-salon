package com.codeforall.online.edward.persistence;

import jakarta.persistence.EntityManager;

public interface SessionManager<T> {

    /**
     * Starts a session
     */
    void startSession();

    /**
     * Stops a session
     */
    void stopSession();

    /**
     * Gets the current session
     * @return an entity manager to perform the requests to the database
     */
    EntityManager getCurrentSession();
}
