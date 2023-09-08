import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../provider/AuthContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [allRatings, setAllRatings] = useState(null);
    const [date, setDate] = useState('no date yet');
    const [reviews, setReviews] = useState({
        text: ""
    });

    const handleChange =(e) => {
         const {name, value } = e.target;
         setReviews({...reviews, [name] : value})
     }
    
    const navigate = useNavigate();
    const {user, isLoading, authenticated, setAuthenticated} = useContext(AuthContext);

    const [rate, setRate] = useState(0);

    

    const getTodayRating = async() => {

        const ist = new Date();
        let currentDay= String(ist.getDate()).padStart(2, '0');
        let currentMonth = String(ist.getMonth()+1).padStart(2,"0");
        let currentYear = ist.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        setDate(currentDate);
        
        try {
            const response = await fetch(`http://localhost:5000/api/getRatings?date=${currentDate}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const json = await response.json(); 
        setAllRatings(json);
        console.log(json);
        } catch (error) {
            console.log(error);
        }
        // console.log(json);

    }

    

    useEffect(()=>{
        if(!isLoading)
        {
            if(!authenticated)
            {
                navigate('/login')
            }
            else
            {
                // getTodayRating();
                const ist = new Date();
        let currentDay= String(ist.getDate()).padStart(2, '0');
        let currentMonth = String(ist.getMonth()+1).padStart(2,"0");
        let currentYear = ist.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        setDate(currentDate);
        
        try {
            const response = fetch(`http://localhost:5000/api/getRatings?date=${currentDate}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const json = response.json(); 
        setAllRatings(json);
        console.log(json);
        } catch (error) {
            console.log(error);
        }
            }
        }
        
    } , [isLoading, authenticated])

    
    const handleReviewSubmit = async() => {
         const meal = document.querySelector(".dropdown>span").getAttribute("value");
         if(meal==='')
         {
             console.log('meal is null');
             return;
         }
         try {
             const response = await fetch('http://localhost:5000/api/submitReview', {
                 method: 'POST', 
                 headers: {
                     "Content-Type": 'application/json'
                 }, 
                 body: JSON.stringify({
                     reviewText: reviews.text, 
                     meal: meal,
                     date: date, 
                     user: user.fullname, 
                     userEmail: user.email, 
                 })
             })
             const json = await response.json();
             if(!json.success)
             {
                 console.log(json);
                 alert(json.msg);
             }
             if(json.success)
             {
                 console.log(json);
                 alert(json.msg);
             }
 
         } catch (error) {
             console.log(error);
         }
    }


   const submitRating = async(e) => {
        e.preventDefault();

        if(reviews.text.length > 0)
        {
            handleReviewSubmit();
        }

        const meal = document.querySelector(".dropdown>span").getAttribute("value");
        if(meal==='')
        {
            console.log('meal is null');
        }
        else
        {
            const response = await fetch('http://localhost:5000/api/submitRating', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    meal: meal, 
                    userRating: rate,
                    date: date,
                })
            })

            const json = await response.json();
            if(!json.success)
            {
                console.log(json);
                alert('unable to submit rating');
            }
            if(json.success)
            {
                console.log(json);
                alert("rating submitted");
            }
        }
   }
   const handleLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <main className='home'>
        <div className='home-inner'>
            <h1>Welcome {!isLoading?(user?user.fullname:'no user'):''}</h1>
        <div className='chooseRate'>
            <h4>Rate Today's Meal</h4>
            <div className="dropdownMenu">
                <Dropdown/>
            </div>
            <div className='star-rating'>
                <input type="radio" name="rate" id="rate-5" onClick={()=>{
                    setRate(5);
                }}/>
                <label htmlFor="rate-5" className='fas fa-star' ></label>
                <input type="radio" name="rate" id="rate-4" />
                <label htmlFor="rate-4" className='fas fa-star' onClick={()=>{
                    setRate(4)
                }}></label>
                <input type="radio" name="rate" id="rate-3" />
                <label htmlFor="rate-3" className='fas fa-star' onClick={()=>{
                    setRate(3)
                }}></label>
                <input type="radio" name="rate" id="rate-2" />
                <label htmlFor="rate-2" className='fas fa-star' onClick={()=>{
                    setRate(2)
                }}></label>
                <input type="radio" name="rate" id="rate-1" />
                <label htmlFor="rate-1" className='fas fa-star' onClick={()=>{
                    setRate(1)
                }}></label>
            </div>
            {rate?<form action='#' className='formform'>
                <div className='text-area'>
                    <textarea maxLength={200} value={reviews.text} onChange={handleChange} placeholder='Describe your experience' name="text" id="" cols="30" rows="5"></textarea>
                </div>
            </form>:''}
            <button className='ratingSubmit' onClick={submitRating}>submit rating</button>
        </div>
        <div className="allR">
            {allRatings?allRatings.map((ratings, index)=>{
                return(
                    <h1>{ratings.meal} {'=> average Rating: '} {ratings.avgRating.toFixed(1)} {' rated by'} {ratings.totalRating + " users"}</h1>
                )
            }):''}
        </div>
        <button className="log-out" onClick={handleLogout}>LOGOUT</button>
        </div>
    </main>
  )
}

const Dropdown = () => {

    useEffect(() => {
        const dropdown_items = document.querySelector(".dropdown .dropdown-content").childNodes;
        dropdown_items.forEach((e)=>{
            e.addEventListener("click", ()=>{
                document.querySelector(".dropdown>span").innerHTML = e.textContent;
                const value = e.getAttribute("value");
                document.querySelector(".dropdown>span").setAttribute("value", value);
            })
        })
    }, [])

    return (
        <div className="dropdown">
            <span value="">Select Meal</span>
            <div className="dropdown-content">
                <span value="breakfast">Breakfast</span>
                <span value="lunch">Lunch</span>
                <span value="snacks">Snacks</span>
                <span value="dinner">Dinner</span>
            </div>
        </div>
    )
}



export default Home;
