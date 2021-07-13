import React, { useState, useEffect, useRef } from 'react';
import './FlashCard.css';

const FlashCard = ({ question, answer, options }) => {
	const [flip, setFlip] = useState(false);
	const [height, setHeight] = useState('initial');

	const frontEl = useRef();
	const backEl = useRef();

	const setMaxHeight = () => {
		const frontHeight = frontEl.current.getBoundingClientRect().height;
		const backHeight = backEl.current.getBoundingClientRect().height;

		setHeight(Math.max(frontHeight, backHeight, 100));
	};

	useEffect(() => {
		setMaxHeight();
	}, [question, answer, options]);

	useEffect(() => {
		window.addEventListener('resize', setMaxHeight);
		return () => window.removeEventListener('resize', setMaxHeight);
	}, []);

	return (
		<div
			className={`card ${flip ? 'flip' : ''}`}
			style={{ height: height }}
			onClick={() => setFlip(!flip)}
		>
			<div className='front' ref={frontEl}>
				{question}
				<div className='flashcard-options'>
					{options.map((option, index) => (
						<div className='flashcard-option' key={index}>
							{option}
						</div>
					))}
				</div>
			</div>
			<div className='back' ref={backEl}>
				{answer}
			</div>
		</div>
	);
};

export default FlashCard;
