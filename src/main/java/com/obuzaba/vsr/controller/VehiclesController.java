package com.obuzaba.vsr.controller;

import java.net.URI;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.obuzaba.vsr.controller.dto.VehicleDetailsDto;
import com.obuzaba.vsr.controller.dto.VehicleDto;
import com.obuzaba.vsr.controller.form.UpdateVehicleForm;
import com.obuzaba.vsr.controller.form.VehicleForm;
import com.obuzaba.vsr.domain.Vehicle;
import com.obuzaba.vsr.repository.MakeRepository;
import com.obuzaba.vsr.repository.ModelRepository;
import com.obuzaba.vsr.repository.VehicleRepository;

@RestController
@RequestMapping("/vehicles")
public class VehiclesController {
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private MakeRepository makeRepository;
	
	@Autowired
	private ModelRepository modelRepository;
	
	@GetMapping
	@Cacheable(value = "listOfVehicles")
	public Page<VehicleDto> list(
			@RequestParam(required = false) String make, 
			@PageableDefault(sort = "createdDate", direction = Direction.DESC, page = 0, size = 10) Pageable pageable) {
		
		if (make == null) {
			Page<Vehicle> vehicles = vehicleRepository.findAll(pageable);
			return VehicleDto.converter(vehicles);
		} else {
			Page<Vehicle> vehicles = vehicleRepository.findByMake(make, pageable);
			return VehicleDto.converter(vehicles);
		}
	}
	
	@PostMapping
	@Transactional
	@CacheEvict(value = "listOfVehicles", allEntries = true)
	public ResponseEntity<VehicleDto> register(@RequestBody @Valid VehicleForm vehicleForm, UriComponentsBuilder uriBuilder) {
		Vehicle vehicle = vehicleForm.converter(makeRepository, modelRepository);
		vehicleRepository.save(vehicle);


		
		URI uri = uriBuilder.path("/vehicles/{id}").buildAndExpand(vehicle.getId()).toUri();
		return ResponseEntity.created(uri).body(new VehicleDto(vehicle));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<VehicleDetailsDto> detail(@PathVariable Long id) {
		Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
		if (vehicleOptional.isPresent()) {
			return ResponseEntity.ok(new VehicleDetailsDto(vehicleOptional.get()));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listOfVehicles", allEntries = true)
	public ResponseEntity<VehicleDto> update(@PathVariable Long id, @RequestBody @Valid UpdateVehicleForm form) {
		Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
		if (vehicleOptional.isPresent()) {
			Vehicle topico = form.update(id, vehicleRepository, makeRepository, modelRepository);
			return ResponseEntity.ok(new VehicleDto(topico));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	@CacheEvict(value = "listOfVehicles", allEntries = true)
	public ResponseEntity<?> remover(@PathVariable Long id) {
		Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
		if (vehicleOptional.isPresent()) {
			vehicleRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

}