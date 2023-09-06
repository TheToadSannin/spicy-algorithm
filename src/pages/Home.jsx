import React, { useContext, useEffect, useReducer, useState } from 'react'
import AuthContext from '../provider/AuthContext'
import { useNavigate } from 'react-router-dom';


const reducer = (state, action) => {

    if(action.type === 'one')
    {
        if(state.rating!=1)
        {
            return {
                rating: 1
            }
        }
        else return {rating:0};
    }
    else if(action.type === 'two')
    {
        if(state.rating!=2)
        {
            return {
                rating: 2
            }
        }
        else return {rating:0};
    }
    else if(action.type === 'three')
    {
        if(state.rating != 3)
        {
            return {
                rating: 3
            }
        }
        else return {rating:0};
    }
    else if(action.type === 'four')
    {
        if(state.rating != 4)
        {
            return {
                rating: 4
            }
        }
        else return {rating:0};
    }
    else if(action.type === 'five')
    {
        if(state.rating != 5)
        {
            return {
                rating: 5
            }
        }
        else return {rating:0};
    }
    else{
        return {
            rating : 0
        }
    }
}

const Home = () => {

    const [allRatings, setAllRatings] = useState(null);
    const [date, setDate] = useState('no date yet');
    const [allReviews, setAllReviews] = useState(null);
    const [reviews, setReviews] = useState({
        text: ""
    });

    const handleChange =(e) => {
         const {name, value } = e.target;
         setReviews({...reviews, [name] : value})
     }
    
    const navigate = useNavigate();
    const {user, isLoading, authenticated} = useContext(AuthContext);

    const [state, dispatch] = useReducer(reducer, {rating:0})

    

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
                console.log('arey vaah')
                navigate('/login')
            }
            else
            {
                getTodayRating();
            }
        }
        
    } , [isLoading, authenticated])

    
   const submitRating = async(e) => {
        e.preventDefault();
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
                    userRating: state.rating,
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

   const handleReviewSubmit = async(e) => {
        e.preventDefault();
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




  return (
    <main className='home'>
        <h1>{!isLoading?(user?user.fullname:'no user'):''}</h1>
        <div className='chooseRate'>
            <h1>Choose Date and Meal to rate</h1>
            <div className="inputs">
                {date}
                <Dropdown/>
            </div>
            <div className="stars">
                <button onClick={()=>{
                    dispatch({type: 'one'})
                }}>1</button>

                <button onClick={()=>{
                    dispatch({type: 'two'})
                }}>2</button>

                <button onClick={()=>{
                    dispatch({type: 'three'})
                }}>3</button>

                <button onClick={()=>{
                    dispatch({type: 'four'})
                }}>4</button>

                <button onClick={()=>{
                    dispatch({type: 'five'})
                }}>5</button>
            </div>
            <h1>{state.rating}</h1>
        </div>
        <button onClick={submitRating}>submit rating</button>
        <div className="review">
            <form onSubmit={handleReviewSubmit} className='reviewform'>
            <textarea required onChange={handleChange} value={reviews.text} name="text" id="" cols="30" rows="10" maxLength={200}/>
            <button type='submit' required>Submit Review</button>
            </form>
        </div>
        <div className="allR">
            {allRatings?allRatings.map((ratings, index)=>{
                return(
                    <h1>{ratings.meal} {'=> average Rating: '} {ratings.avgRating} {' rated by'} {ratings.totalRating + " users"}</h1>
                )
            }):''}
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

const ShowRating = () =>{


    return <>
    <div>hello i'm rating</div>
    </>

}

export default Home;
