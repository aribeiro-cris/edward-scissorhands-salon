# Edward Scissorhands Salon: Java-PostgreSQL Backend, JavaScript-Frontend Integration

![edward-in-salon](https://github.com/aribeiro-cris/edward-scissorhands-andreia-joao-filipe-pedro-manuel/assets/80212431/e99e1ce8-82aa-4b9d-83e5-10b60363e407)

## Summary
Java Backend: A Spring Boot application with models like Appointment, REST controllers for CRUD operations, and PostgreSQL database integration using Spring Data JPA.

JavaScript Frontend: HTML/CSS/JS interface with Fetch API for backend communication, enabling clients to book appointments via a form, integrate an AI image generator for hairstyle visualization, and display the salon location using the Google Maps API.

## Backend (Java)
- The program uses Java with Spring Boot framework.
- It defines models such as Appointment to represent booking details like client name, phone number, type of service, day, and time slot.
- Rest controllers are created to handle HTTP requests for booking appointments, retrieving booked appointments, updating appointments, and deleting appointments.
- Data is stored in a PostgreSQL database using Spring Data JPA for persistence.

## Frontend (JavaScript)
- The frontend is built using HTML, CSS, and JavaScript.
- It utilizes the Fetch API to communicate with the backend's RESTful endpoints.
- Clients can input their booking details such as name, phone number, type of service, day, and time slot through a form on the webpage.
- Upon submitting the form, a POST request is sent to the backend to save the appointment details in the database.
- The frontend also integrates with an AI image generator API to allow clients to visualize their desired hairstyle.
- Additionally, it utilizes the Google Maps API to display the location of Edward Scissorhands' hair salon.

## Links to APIs
- AI image generator text-to-image, provided by https://platform.stability.ai/.
- Google Maps, provided by https://console.cloud.google.com/.

## List of contributors
- Andreia Ribeiro - https://github.com/aribeiro-cris
- Filipe Silva - https://github.com/filipejosilva
- João Carvalho - https://github.com/joaoMiguelCarvalho
- Pedro Nunes - https://github.com/Tariknunes14
