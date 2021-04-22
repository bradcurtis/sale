import React,{useState, useMemo} from 'react'
import { useForm } from "react-hook-form";
import { createLogEntry, getAddress } from './api';


const SaleEntryForm = React.memo(location =>{
    const API_URL = process.env.REACT_APP_APIURL; 
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const address = async (lat,long) =>{
        
        console.log(getAddress(long,lat));
       // return getAddress(lat,long);
    }
    // neighborhood too new  it will always come back as oxford oaks ln
    //const calcValue = useMemo(() => address(location.location.longitude,location.location.latitude), [location.location.longitude,location.location.latitude]);

    

    
    const  onSubmit = async (data) => {
        setLoading(true);
        data.location = {type:"Point",
        coordinates:[location.location.longitude,location.location.latitude]};      
        
        const created =  await createLogEntry(API_URL,data);
        console.log(location.onClose);
        console.log(created);        
        location.onClose();
    }
    return(
        
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <h3>{typeof(onClose)}</h3>
        <label htmlFor="house">House Address</label>
        <input name="house" {...register("house")}></input>
        <br></br>
        <label htmlFor="family">Name</label>
        <input name="family" {...register("family")}></input> 
        <br></br>        
            <label htmlFor="comments.body">What do you have for sale?</label>
            <textarea name="comments.body" rows='5' {...register("comments.body")}></textarea> 
            <br></br>
             
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        
    </form>
    );

});

export default SaleEntryForm;