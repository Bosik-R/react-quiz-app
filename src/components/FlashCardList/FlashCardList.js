import React from 'react';
import FlashCard from '../FlashCard/FlashCard';
import './FlashCardList.css';

const FlashCardList = ({ flashcards }) => {
	return (
		<div className='cards-grid'>
			{flashcards.map((flashcard) => (
				<FlashCard key={flashcard.id} {...flashcard} />
			))}
		</div>
	);
};

export default FlashCardList;
