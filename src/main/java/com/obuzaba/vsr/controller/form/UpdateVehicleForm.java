package com.obuzaba.vsr.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.obuzaba.vsr.domain.Make;
import com.obuzaba.vsr.domain.Model;
import com.obuzaba.vsr.domain.Vehicle;
import com.obuzaba.vsr.repository.MakeRepository;
import com.obuzaba.vsr.repository.ModelRepository;
import com.obuzaba.vsr.repository.VehicleRepository;

public class UpdateVehicleForm {
	
	@NotNull @NotEmpty
	private String name;

	@NotNull @NotEmpty
	private String make;
	
	@NotNull @NotEmpty
	private String model;
	
	@NotNull @NotEmpty
	private int year;

	public void setName(String name) {
		this.name = name;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Vehicle update(Long id, VehicleRepository vehicleRepository, MakeRepository makeRepository, ModelRepository modelRepository) {
		Vehicle vehicle = vehicleRepository.getOne(id);
		
		vehicle.setName(this.name);
		
		Make make = makeRepository.findByName(this.make);
		vehicle.setMake(make);
		
		Model model = modelRepository.findByNameAndMake(this.model, make.getName());
		vehicle.setModel(model);
		
		return vehicle;
	}
	
}
