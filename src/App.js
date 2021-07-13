import React, { useState, useEffect } from 'react';
import FlashCardList from './components/FlashCardList/FlashCardList';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';

function App() {
	const [flashcards, setFlashcards] = useState(sample);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php').then((res) => {
			setCategories(res.data.trivia_categories);
		});
	}, []);

	const handleGenerate = (e, amount, category) => {
		e.preventDefault();
		axios
			.get('https://opentdb.com/api.php', {
				params: {
					amount: amount,
					category: category,
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

const sample = [
	{
		id: 1,
		question: 'What is 2 * 2?',
		answer: '4',
		options: ['2', '3', '4', '5'],
	},
	{
		id: 2,
		question: 'What is 4 - 2?',
		answer: '2',
		options: ['2', '3', '4', '5'],
	},
	{
		id: 3,
		question: 'What is 3 + 2?',
		answer: '5',
		options: ['2', '3', '4', '5'],
	},
];

export default App;
