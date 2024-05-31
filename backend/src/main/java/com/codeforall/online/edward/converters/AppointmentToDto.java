package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppointmentToDto {

    public AppointmentDto convert(Appointment appointment){

        AppointmentDto appointmentDto = new AppointmentDto();

        appointmentDto.setDate_appointment(appointment.getDateAppointment());
        appointmentDto.setId(appointment.getId());
        appointmentDto.setName_client(appointment.getClient().getName());
        appointmentDto.setPhone_client(appointment.getClient().getPhone());
        appointmentDto.setCreationTime(appointment.getCreationTime());
        appointmentDto.setUpdateTime(appointment.getUpdateTime());
        appointmentDto.setServiceType(appointment.getServiceType());

        return appointmentDto;
    }

    public List<AppointmentDto> convertList(List<Appointment> listConvert){
        return listConvert.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
}
