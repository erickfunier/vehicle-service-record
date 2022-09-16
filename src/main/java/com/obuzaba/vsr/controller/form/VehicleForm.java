package com.obuzaba.vsr.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.obuzaba.vsr.domain.Make;
import com.obuzaba.vsr.domain.Model;
import com.obuzaba.vsr.domain.Vehicle;
import com.obuzaba.vsr.repository.MakeRepository;
import com.obuzaba.vsr.repository.ModelRepository;

public class VehicleForm {
	
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

	public Vehicle converter(MakeRepository makeRepository, ModelRepository modelRepository) {
		Make make = makeRepository.findByName(this.make);
		Model model = modelRepository.findByNameAndMake(this.model, make.getName());
		return new Vehicle(name, make, model);
	}

}
