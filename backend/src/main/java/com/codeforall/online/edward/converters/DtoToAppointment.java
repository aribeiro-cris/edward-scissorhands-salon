package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
public class DtoToAppointment {
    private AppointmentFactory appointmentFactory;

    @Autowired
    public void setAppointmentFactory(AppointmentFactory appointmentFactory) {
        this.appointmentFactory = appointmentFactory;
    }

    public Appointment convert (AppointmentDto appointmentDto){

        Appointment appointment = null;
        Client client = new Client();

        client.setName(appointmentDto.getName_client());
        client.setPhone(appointmentDto.getPhone_client());

        appointment = appointmentFactory.createAccount(appointmentDto.getServiceType());
        appointment.setDateAppointment(appointmentDto.getDate_appointment());
        appointment.setClient(client);
        appointment.setCreationTime(appointmentDto.getCreationTime());
        appointment.setUpdateTime(appointmentDto.getUpdateTime());

        //if(appointmentDto.getId() != null){
            appointment.setId(appointmentDto.getId());
        //}

        return appointment;
    }


}
