package com.obuzaba.vsr.controller.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.obuzaba.vsr.domain.StatusVehicle;
import com.obuzaba.vsr.domain.Vehicle;

public class VehicleDetailsDto {

	private Long id;
	private String name;
	private String make;
	private String model;
	private LocalDateTime createdDate;
	private StatusVehicle status;
	private List<ServiceDto> services;
	
	public VehicleDetailsDto(Vehicle vehicle) {
		this.id = vehicle.getId();
		this.name = vehicle.getName();
		this.make = vehicle.getMake().getName();
		this.model = vehicle.getModel().getName();
		this.createdDate = vehicle.getCreatedDate();
		this.status = vehicle.getStatus();
		
		this.services = new ArrayList<>();
		this.services.addAll(vehicle.getServices().stream().map(ServiceDto::new).collect(Collectors.toList()));
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getMake() {
		return make;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public String getModel() {
		return model;
	}

	public StatusVehicle getStatus() {
		return status;
	}

	public List<ServiceDto> getServices() {
		return services;
	}
	
}
