import React, {useEffect} from 'react';
import { Container } from "@mui/material";
import { Statistics } from './statistics';
import { TopRestaurants } from './topRestaurants';
import { BestRestaurants } from './bestRestaurants';
import { BestDishes } from './bestDishes';
import { Advertisements } from './advertisements';
import { Events } from './events';
import { Recommendations } from './recommendations';
import "../../../css/home.css";

export function HomePage(){


    useEffect(() => {
        console.log("componentDidMount => Backenddan malumot ob kelamiz Data fetch");

        return () => {
            console.log("componentWillUnmount => Backenddan malumot ob kelamiz Data fetch");
        }
    }, []);




    return(
        (<div className='homepage'>
        <Statistics/>
        <TopRestaurants/>
        <BestRestaurants/>
        <BestDishes/>
        <Advertisements/>
        <Events/>
        <Recommendations/>
    </div>)
    );
}