package com.obuzaba.vsr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obuzaba.vsr.domain.Model;

public interface ModelRepository extends JpaRepository<Model, Long> {

    Model findByNameAndMakeId(String model, Long id);
}
