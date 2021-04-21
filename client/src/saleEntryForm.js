import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { createLogEntry } from './api';


const SaleEntryForm = (location, close) =>{
    const API_URL = process.env.REACT_APP_APIURL; 
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    console.log(typeof(close));
    const  onSubmit = async (data) => {
        setLoading(true);
        data.location = {type:"Point",
        coordinates:[location.location.longitude,location.location.latitude]};        
        
        const created =  await createLogEntry(API_URL,data);
        console.log(typeof(close));
        console.log(created);        
        close();
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="house">House</label>
        <input name="house" {...register("house")}></input>
        <br></br>
        <label htmlFor="family">Family</label>
        <input name="family" {...register("family")}></input> 
        <br></br>        
            <label htmlFor="comments.body">Sale Comments</label>
            <input name="comments.body" {...register("comments.body")}></input> 
            <br></br>
             
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        
    </form>
    );

}

export default SaleEntryForm;