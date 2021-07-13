import React, { useRef } from 'react';
import './Header.css';

const difLevel = ['easy', 'medium', 'hard'];

const Header = ({ categories, handleGenerate }) => {
	const categoryEl = useRef();
	const amountEl = useRef();
	const difficultyEl = useRef();

	return (
		<header className='form-wrapper'>
			<form
				className='form'
				onSubmit={(e) =>
					handleGenerate(
						e,
						amountEl.current.value,
						categoryEl.current.value,
						difficultyEl.current.value
					)
				}
			>
				<div className='form-group'>
					<label htmlFor='category'>Category</label>
					<select id='category' ref={categoryEl}>
						{categories.map((category) => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='difficulty'>Difficulty</label>
					<select id='difficulty' ref={difficultyEl}>
						{difLevel.map((level) => (
							<option value={level} key={level}>
								{level}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='amount'>Number of Questions</label>
					<input
						type='number'
						id='amount'
						min='1'
						step='1'
						defaultValue={10}
						ref={amountEl}
					/>
				</div>
				<div className='form-group'>
					<button className='btn-submit'>Generate</button>
				</div>
			</form>
		</header>
	);
};

export default Header;
