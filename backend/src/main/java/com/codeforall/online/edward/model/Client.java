package com.codeforall.online.edward.model;

import jakarta.persistence.*;

@Embeddable
public class Client {

    @Column(name = "NAME_CLIENT")
    private String name;

    @Column(name= "PHONE_CLIENT")
    private String phone;

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
