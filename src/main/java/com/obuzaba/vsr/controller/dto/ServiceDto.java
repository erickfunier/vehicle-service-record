package com.obuzaba.vsr.controller.dto;

import java.time.LocalDateTime;

import com.obuzaba.vsr.domain.Service;

public class ServiceDto {

	private Long id;
	private String name;
	private String description;
	private LocalDateTime dataCriacao;
	
	public ServiceDto(Service service) {
		this.id = service.getId();
		this.name = service.getName();
		this.description = service.getDescription();
		this.dataCriacao = service.getCreatedDate();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}

	public String getDescription() {
		return description;
	}
	
}
