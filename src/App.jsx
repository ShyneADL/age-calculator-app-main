import React, { useState } from 'react';
import { arrow } from './assets';

const App = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Perform validation on the form inputs
    if (!day || !month || !year) {
      // Set the error message for empty input
      setErrorMessage('This field is required');
      return;
    }

    
    // Create a new Date object from the input values
    const inputDate = new Date(`${year}-${month}-${day}`);
    const inputYear = new Date(`${year}`)
    
    console.log(inputDate)
    
    if (month === '2') {
      const isLeapYear = (year % 4 === 0 && year % 100 === 0) || year % 400 === 0;
      const maxDays = isLeapYear ? 29 : 28;
  
      // Check if the day is valid for February
      if (day > maxDays) {
        setErrorMessage('Must be a valid date');
        return;
      }
    }

    const monthsWith30Days = ['4', '6', '9', '11'];
    if (monthsWith30Days.includes(month) && day > 30) {
      setErrorMessage('Must be a valid date');
      return;
    }
    // Get the current date
    const today = new Date();
  
    // Compare the input date with the current date
    if (inputYear > today) {
      // Set the error message for date in the future
      setErrorMessage('Date must be in the past');
      return;
    }
    // Perform necessary actions if the input date is valid
    const timeDiff = Math.abs(today.getTime() - inputDate.getTime());
    const calculatedAge = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
    const calculatedMonths = Math.floor((timeDiff / (1000 * 3600 * 24 * 30.4375)) % 12);
    const calculatedDays = Math.floor((timeDiff / (1000 * 3600 * 24)) % 30.4375);
    
    if (isNaN(calculatedAge) || isNaN(calculatedMonths) || isNaN(calculatedDays)) {
      setAge({ years: '--', months: '--', days: '--' });
    } else {
      setAge({ years: calculatedAge, months: calculatedMonths, days: calculatedDays });
    }
    
    setErrorMessage(false);
  };

  return (
    <div>
      <main className='flex flex-col justify-start items-start bg-white main-wrapper sm:px-10 px-6 py-10'>
        <form className='flex flex-col justify-between items-start w-full' id="form" onSubmit={handleSubmit}>
          {/* <!-- The Inputs of the form --> */}
          <div className="flex justify-between items-center sm:w-[420px] w-[320px]">
            <div className="flex flex-col justify-between items-start w-[200px]">
              <label
              
               className={errorMessage ? "text-[12px] font-[700] text-lightRed tracking-widest" : "text-[12px] font-[700] text-smokeyGrey tracking-widest" }>DAY</label>
              <input
                type="number"
                id="day"
                name="day"
                placeholder="DD"
                min={1}
                max={31}
                maxLength={2}
                style={errorMessage ? {borderColor:'hsl(0, 100%, 67%)'} : {borderColor:'hsl(0, 0%, 86%)'}}
                className="mt-2 px-4 py-2 sm:rounded-md rounded-lg sm:w-[115px] w-[90px] text-[24px] font-[700]"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              {errorMessage && <p className="text-lightRed text-[10px] font-[400] italic mt-1">{errorMessage}</p>}
            </div>
            <div className="flex flex-col justify-between items-start w-[200px]">
              <label className={errorMessage ? "text-[12px] font-[700] text-lightRed tracking-widest" : "text-[12px] font-[700] text-smokeyGrey tracking-widest" }>MONTH</label>
              <input
                type="number"
                id="month"
                min={1}
                max={12}
                name="month"
                placeholder="MM"
                maxLength={2}
                style={errorMessage ? {borderColor:'hsl(0, 100%, 67%)'} : {borderColor:'hsl(0, 0%, 86%)'}}
                className="mt-2 px-4 py-2 sm:rounded-md rounded-lg sm:w-[115px] w-[90px] text-[24px] font-[700]"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              {errorMessage && <p className="text-lightRed text-[10px] font-[400] italic mt-1">{errorMessage}</p>}
            </div>
            <div className="flex flex-col justify-between items-start w-[200px]">
              <label className={errorMessage ? "text-[12px] font-[700] text-lightRed tracking-widest" : "text-[12px] font-[700] text-smokeyGrey tracking-widest" }>YEAR</label>
              <input
                type="number"
                id="year"
                name="year"
                min={0}
                placeholder="YYYY"
                maxLength={4}
                style={errorMessage ? {borderColor:'hsl(0, 100%, 67%)'} : {borderColor:'hsl(0, 0%, 86%)'}}
                className="mt-2 px-4 py-2 sm:rounded-md rounded-lg sm:w-[115px] w-[100px] text-[24px] font-[700]"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errorMessage && <p className="text-lightRed text-[10px] font-[400] italic mt-1">{errorMessage}</p>}
            </div>
          </div>
          {/* <!-- The submit Button --> */}
          <div className="flex items-center justify-start sm:mt-2 my-8 w-full">

            <div className="flex h-[0.5px] sm:w-[90%] w-[40%] bg-lightGrey"></div>
            <button type="button" onClick={handleSubmit} className=" bg-purple hover:bg-offBlack rounded-full p-4">
              <img src={arrow} className="cover w-[30px]" alt="Arrow" />
            </button>
            <div className="sm:hidden flex h-[0.5px] w-[40%] bg-lightGrey"></div>

          </div>
        </form>
        {/* <!-- Result --> */}
        <div className="flex flex-col justify-start items-start sm:w-[500px] w-[320px] mt-2">
          <p className="sm:text-[64px] text-[52px] text-offBlack font-[800] italic leading-[65px]">
            <span style={age.years === '--' ? {letterSpacing: '0.2em'} : {letterSpacing: '0'}} className="text-purple mr-2">{age.years}</span>years
          </p>
          <p className="sm:text-[64px] text-[52px] text-offBlack font-[800] italic leading-[65px]">
            <span style={age.months === '--' ? {letterSpacing: '0.2em'} : {letterSpacing: '0'}} className="text-purple mr-2">{age.months}</span>months
          </p>
          <p className="sm:text-[64px] text-[52px] text-offBlack font-[800] italic leading-[65px]">
            <span style={age.days === '--' ? {letterSpacing: '0.2em'} : {letterSpacing: '0'}} className="text-purple mr-2">{age.days}</span>days
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;