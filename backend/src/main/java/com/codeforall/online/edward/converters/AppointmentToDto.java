package com.codeforall.online.edward.converters;

import com.codeforall.online.edward.model.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppointmentToDto {

    public AppointmentDto convert(Appointment appointment){

        AppointmentDto appointmentDto = new AppointmentDto();

        appointmentDto.setId(appointment.getId());
        appointmentDto.setName_client(appointment.getClient().getName());
        appointmentDto.setPhone_client(appointment.getClient().getPhone());
        appointmentDto.setServiceType(appointment.getServiceType().toString());
        appointmentDto.setDate(appointment.getDate());
        appointmentDto.setHour(appointment.getHour());
        appointmentDto.setComment(appointment.getComment());

        return appointmentDto;
    }

    public List<AppointmentDto> convertList(List<Appointment> listConvert){
        return listConvert.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
}
