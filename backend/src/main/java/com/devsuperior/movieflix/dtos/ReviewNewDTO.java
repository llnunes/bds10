package com.devsuperior.movieflix.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;

public class ReviewNewDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "Campo requerido")
	private String text;
	private Long movieId;
	
	public ReviewNewDTO() {
	}

	public ReviewNewDTO(String text, Long movieId) {
		super();
		this.text = text;
		this.movieId = movieId;
	}

	public ReviewNewDTO(Review entity) {
		text = entity.getText();
		movieId = entity.getMovie().getId();		
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

}
