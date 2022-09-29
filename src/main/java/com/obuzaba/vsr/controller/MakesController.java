package com.obuzaba.vsr.controller;

import com.obuzaba.vsr.domain.Make;
import com.obuzaba.vsr.repository.MakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/makes")
public class MakesController {
	@Autowired
	private MakeRepository makeRepository;

	@GetMapping
	@Cacheable(value = "listOfMakes")
	public List<Make> list() {

		return makeRepository.findAll();

	}
}