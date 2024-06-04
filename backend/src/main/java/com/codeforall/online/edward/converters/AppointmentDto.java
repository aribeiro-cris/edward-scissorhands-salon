package com.codeforall.online.edward.converters;

public class AppointmentDto {

    private Integer id;
    private String name_client;
    private String phone_client;
    private String date;
    private String hour;
    private String comment;
    private String serviceType;

    public String getServiceType(){
        return serviceType;
    }

    public void setServiceType(String serviceType){
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


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
