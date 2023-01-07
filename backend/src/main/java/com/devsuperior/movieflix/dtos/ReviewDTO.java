package com.devsuperior.movieflix.dtos;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;

public class ReviewDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private Long movieId;
	
	private UserDTO user;
	
	public ReviewDTO() {
	}

	public ReviewDTO(Long id, String text, Long movieId) {
		super();
		this.id = id;
		this.text = text;
		this.movieId = movieId;
	}

	public ReviewDTO(Review entity, User user) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.movieId = entity.getMovie().getId();	
		this.user = new UserDTO(user);
	}
	
	public ReviewDTO(Review entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.movieId = entity.getMovie().getId();	
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

}