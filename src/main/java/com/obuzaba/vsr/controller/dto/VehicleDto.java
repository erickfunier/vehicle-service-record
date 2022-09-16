package com.obuzaba.vsr.controller.dto;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.obuzaba.vsr.domain.Vehicle;

public class VehicleDto {

	private Long id;
	private String name;
	private String make;
	private String model;
	private LocalDateTime createdDate;
	
	public VehicleDto(Vehicle vehicle) {
		this.id = vehicle.getId();
		this.name = vehicle.getName();
		this.make = vehicle.getMake().getName();
		this.model = vehicle.getModel().getName();
		this.createdDate = vehicle.getCreatedDate();
	}

	public Long getId() {
		return id;
	}

	public String getTitulo() {
		return name;
	}

	public String getMake() {
		return make;
	}
	
	public String getModel() {
		return model;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public static Page<VehicleDto> converter(Page<Vehicle> vehicles) {
		return vehicles.map(VehicleDto::new);
	}

}
