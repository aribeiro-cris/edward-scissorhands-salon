package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.ServiceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Date;

public class AppointmentDto {

    private Integer id;

    //@NotNull(message = "Name is mandatory")
    //@NotBlank(message = "Name is mandatory")
    //@Size(min = 3, max = 64)
    private String name_client;

    //@Pattern(regexp = "^\\+?[0-9]*$", message = "Phone number contains invalid characters")
    private String phone_client;

    private Date creationTime;

    private Date updateTime;

    //@NotNull(message = "Date is mandatory")
    //@NotBlank(message = "Date is mandatory")
    private Date date_appointment;

    //@NotNull
    private ServiceType serviceType;

    public ServiceType getServiceType(){
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType){
        this.serviceType = serviceType;
    }

    public String getName_client() {
        return name_client;
    }

    public void setName_client(String name_client) {
        this.name_client = name_client;
    }

    public String getPhone_client() {
        return phone_client;
    }

    public void setPhone_client(String phone_client) {
        this.phone_client = phone_client;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getDate_appointment() {
        return date_appointment;
    }

    public void setDate_appointment(Date date_appointment) {
        this.date_appointment = date_appointment;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
