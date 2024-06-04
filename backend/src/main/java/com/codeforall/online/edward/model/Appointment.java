package com.codeforall.online.edward.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Inheritance (strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn (name = "SERVICE_TYPE")
@Table(name = "appointments")
public abstract class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private Client client;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String date;

    @DateTimeFormat(pattern = "HH:mm")
    private String hour;

    private String comment;

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public abstract ServiceType getServiceType();

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
