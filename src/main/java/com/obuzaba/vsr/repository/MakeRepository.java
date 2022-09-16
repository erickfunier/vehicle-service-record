package com.obuzaba.vsr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obuzaba.vsr.domain.Make;

public interface MakeRepository extends JpaRepository<Make, Long> {

	Make findByName(String name);

}
