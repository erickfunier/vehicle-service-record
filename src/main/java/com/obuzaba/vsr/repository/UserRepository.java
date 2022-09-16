package com.obuzaba.vsr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obuzaba.vsr.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String email);

}
