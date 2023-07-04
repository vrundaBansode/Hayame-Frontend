import React, { useEffect, useState } from 'react'
import "./admindashboard.css"
import  { Link } from "react-router-dom"

const AdminDashboard = () => {

    const [options, setOptions] = useState([])

    useEffect(()=>{

        const fillOptions = async () => {

            let opt = []

            const response = await fetch("http://45.127.4.151:8000/api/skill-list", {
                method: "GET",
                headers: {
                    'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                    "Content-type": "application/json"
                }})
            const data = await response.json()
            for(let i = 0; i < data.length; i++){
                opt.push(data[i]['skill'])
            }

            setOptions(opt)

        }

        fillOptions()

    },[])

    
    const handleAddLabour = (e) => {

        e.preventDefault()
        
        fetch("http://127.0.0.1:8000/api/labour-list", {
                method: "POST",
                body: JSON.stringify({
                    "first_name": document.getElementById("labour-firstName").value,
                    "last_name": document.getElementById("labour-lastName").value,
                    "email": document.getElementById("labour-email").value,
                    "phone": document.getElementById("labour-phone-number").value,
                    "skills": document.getElementById("labour-skill").value,
                    "passport_no": document.getElementById("labour-passport-no").value,
                }),
                headers: {
                    'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                    "Content-type": "application/json"
                }})
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            
            }
        );

        alert("Labour Added!")


    }

    let labourSkills = []
    
    function removeskill(e){
        // console.log(document.getElementById(e.target.id).parentElement.textContent.split(" ")[0])
        // let skillToBeRemoved = document.getElementById(e.target.id).parentElement.textContent.split(" ")[0]
        // labourSkills = labourSkills.filter(skill => (skill===skillToBeRemoved))
        // console.log(labourSkills)
        // console.log("remove skill")
        console.log(e.target.value)
    }    
    
    // const pushSkills = () => {
    //     labourSkills.push(document.getElementById("labour-skill").value)
    //     console.log(labourSkills)
    //     let skillTags = ""
    //     for(let i = 0; i < labourSkills.length; i++){
    //             skillTags += `<li>${labourSkills[i]} </li>`
    //         }
    //     document.getElementById("selected-skills").innerHTML = "<ul>" + skillTags + "</ul>"
            
    // }

    const pushSkill = (e) => {
        // console.log(e.target.value)
        if(!labourSkills.includes(e.target.value)){
            labourSkills.push(e.target.value)
        }
        console.log(labourSkills)
        let skillTags = ""
        for(let i = 0; i < labourSkills.length; i++){
                skillTags += "<li id="+labourSkills[i] + ">"+labourSkills[i] +"<icon> X </icon>"+"</li>"
            }
        document.getElementById("selected-skills").innerHTML = "<ul>" + skillTags + "</ul>"
        
        
    }
    
    
return (
    <div className='adminDashboard'>
        <div>
            <h2 className='labour-form-header' >Add Workforce Details</h2>
        </div>
        <form name="adminform" className="admin-dashboard-form">
            <div className="admin-dashboard-labour-username">
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="labour-firstName" className="admin-dashboard-labour-input-label" >First Name</label>
                    <input type="text" name="labour-firstName" id="labour-firstName" className="admin-dashboard-labour-input-field" placeholder="First Name" />
                </div>
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="labour-lastName" className="admin-dashboard-labour-input-label" >Last Name</label>
                    <input type="text" name="labour-lastName" id="labour-lastName" className="admin-dashboard-labour-input-field" placeholder="Last Name" />
                </div>
            </div>
            <div className="admin-dashboard-labour-input-control">
                <label htmlFor="labour-email" className="admin-dashboard-labour-input-label" >Email Address</label>
                <input type="email" name="labour-email" id="labour-email" className="admin-dashboard-labour-input-field" placeholder="Email Address" />
            </div>
            <div className="admin-dashboard-labour-input-control">
                <label htmlFor="labour-passport-no" className="admin-dashboard-labour-input-label" >Passport Number</label>
                <input type="email" name="labour-passport-no" id="labour-passport-no" className="admin-dashboard-labour-input-field" placeholder="Enter Passport Number" />
            </div>
            <div className="admin-dashboard-labour-input-control">
                <label htmlFor="labour-skill" className="admin-dashboard-labour-input-label" >Skills</label>
                {/* <input type="text" name="labour-skill" id="labour-skill" className="labour-input-field" placeholder="Enter labour skill" /> */}
                <select className="labour-select" id="labour-skill" multiple>
                    {options.map(opt => (<option  key={opt} className="labour-dropdown" id={`labour-skill-${opt}`} onClick={e=>pushSkill(e)} value={opt}>{opt}</option>))}
                </select>
                <div id="selected-skills">

                </div>
            </div>
            <div className="admin-dashboard-labour-input-control">
                <label htmlFor="number" className="admin-dashboard-labour-input-label" >Phone Number</label>
                <input type="tel" name="number" id="labour-phone-number" className="admin-dashboard-labour-input-field" placeholder="Enter your Phone Number" />
            </div>
            <div className="admin-dashboard-labour-input-control">
                {/* <input type="submit" name="submit" className="input-submit" value={<Link to="/login" >Submit</Link>} onClick={handleRegister}/> */}
                <button type="submit" name="submit" className="admin-dashboard-labour-input-submit" onClick={handleAddLabour} >
                    <Link style={{ color: "#ffd000" }} >Add</Link>
                </button>
            </div>
        </form>
    </div>
  )
}

export default AdminDashboard