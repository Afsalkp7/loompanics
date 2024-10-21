import React from 'react'
import './membership.css'

function Membership({userData}) {
  return (
    <>
    <div className="membership">
        <span>Membership</span><br />
        <div className="membershipCard">
            {userData?.isMember?<></>:<span>Create <br /> Membership <br /> +</span>}
            
        </div>
        {userData?.isMember?<div className='membershipButtons'>
            <div className="printButton">Print Membership</div>
            <div className="editButton">Edit Membership</div>
        </div>:<></>}
        
    </div>
    
    </>
  )
}

export default Membership