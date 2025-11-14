import { supabase } from './supabaseClient';
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from "react-router-dom";


function create(){
const { id } = useParams();
const [name, setName] = useState('');
const [speed, setSpeed] = useState('');
const [color, setColor] = useState('');
const navigate = useNavigate(); 


const handleCreateCrewmate = () => {
    if(id){
        updateCrewmate(name, speed, color)
    }else{
    addCrewmate(name, speed, color);
    }
    };

const handleDeleteCrewmate = async () => {
    if (!window.confirm("Are you sure you want to delete?")) {
        return;
    }
    
    const { error } = await supabase
        .from('crewmembers')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error('Deletion error:', error);
        alert(`Error deleting: ${error.message}`);
    } else {
        alert('Crewmate deleted successfully!');
        navigate(`/my-crew/`);

    }
};

useEffect(() => {
    if (id) {
        fetchOnemember();
    } else {
        setName('');
        setSpeed('');
        setColor(''); 
    }
  }, [id]);

async function addCrewmate(name, speed, color) {
    if (!name || !speed || !color) {
            alert('Please fill in all fields.');
            return;
        }
const { data, error } = await supabase
    .from('crewmembers')
    .insert([
      { name: name, speed: speed, color: color },
    ])
    .select();

  if (error) {
    alert('Error inserting data:', error.message);
  } else {
    alert('New crew created sucessfully', data);
  }
}

   async function fetchOnemember() {
    const { data, error } = await supabase
    .from('crewmembers')
      .select('*')
      .eq('id', id);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
    setName(data[0].name);
    setSpeed(data[0].speed);
    setColor(data[0].color);
    }
  }

  async function updateCrewmate(name, speed, color) {
    if (!name || !speed || !color) {
            alert('Please fill in all fields.');
            return;
        }
const { data, error } = await supabase
.from('crewmembers')
        .update({ name, speed, color }) 
        .eq('id', id)                 
        .select();
  if (error) {
    alert('Error updating data:', error.message);
  } else {
    alert('New crew created sucessfully:', data);
  }
}

    return(
 <div className='create-screen'>
 <h1>{id ? 'Update Crewmate:' : 'Create Crewmate'}</h1>

<div className="input-container"> 
<span>Name:</span>
<input value={name} type="text" name="name" onChange={(e) => setName(e.target.value)}/> 
</div>

<div className="input-container"> 
<span>Speed:</span>
<input value={speed} type="text" name="speed" onChange={(e) => setSpeed(e.target.value)}/>
</div>

<div className="input-container"> 
<span>Color:</span>
<label>
    <input checked={color === 'green'} type="radio" name="color" value="green" onChange={(e) => setColor(e.target.value)}/> Green
  </label>
  
  <label>
    <input checked={color === 'red'} type="radio" name="color" value="red" onChange={(e) => setColor(e.target.value)}/> Red
  </label>
  
  <label>
    <input checked={color === 'blue'} type="radio" name="color" value="blue" onChange={(e) => setColor(e.target.value)}/> Blue
  </label>
  </div>

 <button onClick={handleCreateCrewmate}>{id ? 'Update Crewmate' : 'Create Crewmate'}</button>
 {id && (
 <button onClick={handleDeleteCrewmate} >
  Delete Crewmate
 </button>
)}
</div>
    );
}
export default create;