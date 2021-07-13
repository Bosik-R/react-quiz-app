import React, { useState, useEffect } from 'react';
import FlashCardList from './components/FlashCardList/FlashCardList';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';

function App() {
	const [flashcards, setFlashcards] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php').then((res) => {
			setCategories(res.data.trivia_categories);
		});
		handleGenerate(null, 5, 10, 'easy');
	}, []);

	const handleGenerate = (e, amount, category, difficulty) => {
		if (e) e.preventDefault();
		console.log(category);
		axios
			.get(`https://opentdb.com/api.php`, {
				params: {
					amount: amount,
					category: category,
					difficulty: difficulty,
				},
			})
			.then((res) => {
				setFlashcards(
					res.data.results.map((questionItem, index) => {
						const answer = decodeString(questionItem.correct_answer);
						const options = [
							...questionItem.incorrect_answers.map((a) => decodeString(a)),
							answer,
						];
						return {
							id: `${index}-${Date.now()}`,
							question: decodeString(questionItem.question),
							answer: answer,
							options: options.sort(() => Math.random() - 0.5),
						};
					})
				);
			});
	};

	const decodeString = (str) => {
		const text = document.createElement('textarea');
		text.innerHTML = str;
		return text.value;
	};
	return (
		<>
			<Header categories={categories} handleGenerate={handleGenerate} />
			<div className='container'>
				<FlashCardList flashcards={flashcards} />
			</div>
		</>
	);
}

export default App;
