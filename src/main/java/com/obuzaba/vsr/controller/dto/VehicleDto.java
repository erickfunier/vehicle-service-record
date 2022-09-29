package com.obuzaba.vsr.controller.dto;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.obuzaba.vsr.domain.Vehicle;

public class VehicleDto {

	private final Long id;
	private final String name;
	private final String make;
	private final String model;
	private final int year;
	private final LocalDateTime createdDate;
	
	public VehicleDto(Vehicle vehicle) {
		this.id = vehicle.getId();
		this.name = vehicle.getName();
		this.make = vehicle.getMake().getName();
		this.model = vehicle.getModel().getName();
		this.year = vehicle.getYear();
		this.createdDate = vehicle.getCreatedDate();
	}

	public Long getId() {
		return id;
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

	public String getName() {
		return name;
	}

	public int getYear() {
		return year;
	}

	public static Page<VehicleDto> converter(Page<Vehicle> vehicles) {
		return vehicles.map(VehicleDto::new);
	}

}
