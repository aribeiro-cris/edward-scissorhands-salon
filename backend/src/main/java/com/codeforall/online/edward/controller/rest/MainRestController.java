package com.codeforall.online.edward.controller.rest;

import com.codeforall.online.edward.exceptions.EdwardException;
import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/edward")
public class MainRestController {

    private AppointmentService appointmentService;

    @RequestMapping(method = RequestMethod.GET, path = {"/", ""})
    public ResponseEntity<List<Appointment>> appList(){
        List<Appointment>  list =  appointmentService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = {"/", ""}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addAppointment(@Valid @RequestBody Appointment appointment , BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(appointment, HttpStatus.NOT_FOUND);
        }
        appointmentService.add(appointment, appointment.getClient());
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity showAppointment(@PathVariable Integer id) {
        Appointment appointment = appointmentService.get(id);

        if(appointment == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(appointment,HttpStatus.OK);
    }

    @RequestMapping(method =  RequestMethod.DELETE,path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteApp(@PathVariable Integer id) throws EdwardException {
        if(appointmentService.get(id) == null){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Appointment appointment = appointmentService.get(id);
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateAppointment(@Valid @RequestBody Appointment appointment, BindingResult bindingResult, @PathVariable Integer id) throws EdwardException {
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Appointment updateApp = appointmentService.get(id);
        if(updateApp.getId() != appointment.getId()){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        updateApp.setClient(appointment.getClient());
        updateApp.setDateAppointment(appointment.getDateAppointment());

        appointmentService.updateAppointment(updateApp);
        return new ResponseEntity<>(updateApp, HttpStatus.OK);
    }

    @Autowired
    public void setAppointmentService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

}
