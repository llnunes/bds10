package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dtos.ReviewDTO;
import com.devsuperior.movieflix.dtos.ReviewNewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private AuthService authService;	
	
	@Transactional	
	@PreAuthorize("hasAnyRole('MEMBER')")
	public ReviewDTO insert(ReviewNewDTO dto) {
		Review r = new Review();
		User usuario = authService.authenticated();
		r.setText(dto.getText());
		r.setMovie(new Movie(dto.getMovieId()));
		r.setUser(usuario);
		repository.save(r);
		return new ReviewDTO(r, usuario);
	}

}
