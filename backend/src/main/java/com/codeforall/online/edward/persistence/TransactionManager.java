package com.codeforall.online.edward.persistence;

public interface TransactionManager {

    /**
     * Begins a session to perform a read operation
     */
    void beginRead();

    /**
     * Begins a session to perform a write operation
     */
    void beginWrite();

    /**
     * Commits a transaction
     */
    void commit();

    /**
     * Rollback a transaction
     */
    void rollback();
}
