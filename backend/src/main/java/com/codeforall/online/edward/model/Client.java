package com.codeforall.online.edward.model;

import jakarta.persistence.*;

@Embeddable
public class Client {

    @Column(name = "name_client")
    private String name;

    @Column(name= "phone_client")
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
