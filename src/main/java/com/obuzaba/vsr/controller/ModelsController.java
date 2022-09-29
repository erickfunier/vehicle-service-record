package com.obuzaba.vsr.controller;

import com.obuzaba.vsr.domain.Model;
import com.obuzaba.vsr.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/models")
public class ModelsController {
	@Autowired
	private ModelRepository modelRepository;

	@GetMapping
	@Cacheable(value = "listOfModels")
	public List<Model> list() {

		List<Model> models = modelRepository.findAll();
		return models;

	}
}