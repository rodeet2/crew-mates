import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';


function Crew_details(){
const { id } = useParams();
const [loading, setLoading] = useState(true);
const [Member, setMember] = useState(null);

useEffect(() => {
    fetchOnemember();
  }, []); 

   async function fetchOnemember() {
    setLoading(true);
    const { data, error } = await supabase
    .from('crewmembers')
      .select('*')
      .eq('id', id);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setMember(data[0]);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading member...</p>;

  function getSpeedComment(speed) {
        if (speed <= 10) {
            return "Speed is Low 🐢";
        } else if (speed > 10 && speed <= 60) {
            return "Medium speed 🏃";
        } else {
            return "High Speed! 🚀";
        }
    }

    return(
        <>
        <h2>Member details:</h2>
        <label>Name: {Member.name}</label><br/>
        <label>Speed: {Member.speed}</label><br/>
        <label>Color: {Member.color}</label><br/>
        <label>Comment: {getSpeedComment(Member.speed)}</label> <br/>  
        <Link 
          to={`/edit-member/${Member.id}`}>
         <button>Edit?</button> 
        </Link>
    </>
    );
}
export default Crew_details;