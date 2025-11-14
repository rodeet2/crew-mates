import { supabase } from './supabaseClient';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link,useNavigate } from "react-router-dom"; 


function My_crew(){
const [crewmates, setCrewmates] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate(); 

const handleTileClick = (id) => {
        navigate(`/member-detail/${id}`);
    };

useEffect(() => {
    fetchCrewmates();
  }, []); 

    async function fetchCrewmates() {
    setLoading(true);
    const { data, error } = await supabase
    .from('crewmembers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCrewmates(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading crewmates...</p>;

    return(
<div className='mycrew-screen'>
<h1>My crew:</h1>
<div className='crew_member_tiles'>
      {crewmates.map((crewmate) => (
        <div className='crew_member_tile' key={crewmate.id} onClick={() => handleTileClick(crewmate.id)}>
          <img src='https://www.svgrepo.com/show/504093/among-us.svg'/>
          <h3>Name: {crewmate.name}</h3>
          <h3>Speed: {crewmate.speed}</h3>
          <h3>Color: {crewmate.color}</h3>
           <Link 
          to={`/edit-member/${crewmate.id}`} onClick={(e) => e.stopPropagation()}>
          <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
</div>

        );
}
export default My_crew;