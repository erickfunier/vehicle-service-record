package com.obuzaba.vsr.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class Vehicle {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private LocalDateTime createdDate = LocalDateTime.now();
	@Enumerated(EnumType.STRING)
	private StatusVehicle status = StatusVehicle.ACTIVE;
	@ManyToOne
	private Model model;
	@ManyToOne
	private Make make;
	@OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
	private List<Service> services = new ArrayList<>();

	private int year;

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Vehicle() {
	}
	
	public Vehicle(String name, Make make, Model model, int year) {
		this.name = name;
		this.make = make;
		this.model = model;
		this.year = year;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vehicle other = (Vehicle) obj;
		if (id == null) {
			return other.id == null;
		} else return id.equals(other.id);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime getCreatedDate) {
		this.createdDate = getCreatedDate;
	}

	public StatusVehicle getStatus() {
		return status;
	}

	public void setStatus(StatusVehicle status) {
		this.status = status;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	public Make getMake() {
		return make;
	}

	public void setMake(Make make) {
		this.make = make;
	}

	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}

}
