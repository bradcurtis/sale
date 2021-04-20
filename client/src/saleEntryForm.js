import React from 'react'
import { useForm } from "react-hook-form";
import { createLogEntry } from './api';


const SaleEntryForm = (location) =>{
    const API_URL = process.env.REACT_APP_APIURL; 
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        data.location = {type:"Point",
        coordinates:[location.location.longitude,location.location.latitude]};  
             
        
        const created = createLogEntry(API_URL,data);
        console.log(created);
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="house">House</label>
        <input name="house" {...register("house")}></input>
        <label htmlFor="family">Family</label>
        <input name="family" {...register("family")}></input>       

        <button>Create Sale Entry</button>
    </form>
    );

}

export default SaleEntryForm;