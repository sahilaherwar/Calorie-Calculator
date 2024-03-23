import './App.css';
import React, { useState } from 'react';

function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calculateBMROnly, setCalculateBMROnly] = useState(false);
  const [calculatedCalories, setCalculatedCalories] = useState('');

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const handleCalculationTypeChange = (e) => {
    setCalculateBMROnly(e.target.checked);
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    let bmr;
    if (gender === 'Male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    if (calculateBMROnly) {
      setCalculatedCalories(bmr.toFixed(2));
    } else {
      let tdee;
      switch (activityLevel) {
        case 'bmr':
          tdee = bmr;
          break;
        case 'Sedentary':
          tdee = bmr * 1.2;
          break;
        case 'Light':
          tdee = bmr * 1.375;
          break;
        case 'Moderate':
          tdee = bmr * 1.55;
          break;
        case 'Active':
          tdee = bmr * 1.725;
          break;
        case 'Very active':
          tdee = bmr * 1.9;
          break;
        case 'Extra active':
          tdee = bmr * 2.1;
          break;
        default:
          tdee = bmr;
      }
      setCalculatedCalories(tdee.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Calorie Calculator</h1>
      <form onSubmit={calculateCalories}>
        <label>Age: </label>
        <input type="number" value={age} onChange={handleAgeChange} />
        <div className="Gender">
          <label>
            Gender:
            <input type="radio" value="Male" checked={gender === 'Male'} onChange={handleGenderChange} />
            Male
            <input type="radio" value="Female" checked={gender === 'Female'} onChange={handleGenderChange} />
            Female
          </label>
        </div>
        <label>Height: </label>
        <input type="number" value={height} onChange={handleHeightChange} placeholder='in cms' />
        <label>Weight: </label>
        <input type="number" value={weight} onChange={handleWeightChange} placeholder='in kgs' />
        <label>
          Calculate:
          <input type="checkbox" checked={calculateBMROnly} onChange={handleCalculationTypeChange} />
          BMR only
        </label>
        {!calculateBMROnly && (
          <div>
            <label>Activity Level:</label>
            <select value={activityLevel} onChange={handleActivityLevelChange}>
              <option value="Sedentary">Sedentary: little or no exercise</option>
              <option value="Light">Light: exercise 1-3 times/week</option>
              <option value="Moderate">Moderate: exercise 4-5 times/week</option>
              <option value="Active">Active: daily exercise or intense exercise 3-4 times/week</option>
              <option value="Very active">Very active: intense exercise 3-4 times/week</option>
              <option value="Extra active">Extra active: very intense exercise daily or physical job</option>
            </select>
          </div>
        )}
        <button type="submit">Calculate</button>
      </form>

      {calculatedCalories && (

        <div class="calories">
          <h2>Calories/day: </h2>
          <ul>
            <li><p>Maintain weight: </p> {calculatedCalories}</li>
            <li><p>Mild weight loss (0.5 lb/week):</p> {(parseFloat(calculatedCalories) - 250).toFixed(2)}</li>
            <li><p>Weight loss (1 lb/week):</p> {(parseFloat(calculatedCalories) - 500).toFixed(2)}</li>
            <li><p>Extreme weight loss (2 lb/week):</p> {(parseFloat(calculatedCalories) - 1000).toFixed(2)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;