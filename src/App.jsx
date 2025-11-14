import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"; 
import Create from './create.jsx';
import Crew_details from './crew_details.jsx';
import My_crew from './my_crews.jsx';


function App() {

  return (
    <>
    <div className='main'>
    <div className='navbar'>
         <Link 
          to={`/`}>
      <span>Home</span>
         </Link>
         <Link 
          to={`/create`}>
      <span>Create</span>
        </Link>      
        <Link 
          to={`/my-crew`}>
      <span>My crew</span>
         </Link>
    </div>
    <div className='main_content'>
    <Routes>

<Route path ="/" element={ <div className='wellcome-screen'>
 <h1>Wellcome!</h1>
 <p>Get started creating crews!</p>
 <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="among us cover"/>
</div>
} />
<Route path ="/create" element={ <Create/> 

} />
<Route path ="/my-crew" element={ <My_crew/> 

} />

<Route path ="/member-detail/:id" element={ <Crew_details/> 

} />

<Route path ="/edit-member/:id" element={ <Create/> 

} />

</Routes>
    </div>
    </div>
    </>
  )
}

export default App
