package com.codeforall.online.edward.controller.rest;

import com.codeforall.online.edward.converters.AppointmentDto;
import com.codeforall.online.edward.converters.AppointmentToDto;
import com.codeforall.online.edward.converters.DtoToAppointment;
import com.codeforall.online.edward.exceptions.EdwardException;
import com.codeforall.online.edward.model.Appointment;
import com.codeforall.online.edward.model.Styling;
import com.codeforall.online.edward.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/appointment")
public class MainRestController {

    private AppointmentService appointmentService;
    private AppointmentToDto appointmentToDto;
    private DtoToAppointment dtoToAppointment;

    @RequestMapping(method = RequestMethod.GET, path = {"/", ""})
    public ResponseEntity<List<AppointmentDto>> appList(){
        //List<Appointment>  list = appointmentService.list();
        List<AppointmentDto>  list = appointmentToDto.convertList(appointmentService.list());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = {"/", ""}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addAppointment(@Valid @RequestBody AppointmentDto appointmentDto , BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(appointmentDto, HttpStatus.NOT_FOUND);
        }
        Appointment appointment = dtoToAppointment.convert(appointmentDto);
        if(appointment.getId() != null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        appointmentService.add(appointment, appointment.getClient());
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity showAppointment(@PathVariable Integer id) throws EdwardException {
        try{
            appointmentService.get(id);
        }catch (EdwardException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        AppointmentDto appointmentDto = appointmentToDto.convert(appointmentService.get(id));

        return new ResponseEntity<>(appointmentDto,HttpStatus.OK);
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
    public ResponseEntity updateAppointment(@Valid @RequestBody AppointmentDto appointmentDto, BindingResult bindingResult, @PathVariable Integer id) throws EdwardException {
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(!appointmentDto.getId().equals(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try{
            appointmentService.get(id);
        }catch (EdwardException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Appointment updateApp = dtoToAppointment.convert(appointmentDto);

        //if(updateApp.getId() != null){
            //return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        //
        //}

        updateApp.setClient(updateApp.getClient());

        appointmentService.updateAppointment(updateApp);
        return new ResponseEntity<>(updateApp, HttpStatus.OK);
    }

    @Autowired
    public void setAppointmentService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @Autowired
    public void setAppointmentToDto(AppointmentToDto appointmentToDto) {
        this.appointmentToDto = appointmentToDto;
    }
    @Autowired
    public void setDtoToAppointment(DtoToAppointment dtoToAppointment) {
        this.dtoToAppointment = dtoToAppointment;
    }

}
