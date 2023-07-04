
import React from 'react'
import "./dashboardform.scss"
import Dashboard from "./Dashboard"
import { leftarrow } from '../../../../assets'


const DashboardForm = () => {

    
    const handleClick = () => {
        return (
            <div>
            <Dashboard />
        </div>
    )
}

const handleContractorDashboardForm = (e) => {

    e.preventDefault()
    
    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let skill = ""
    for (let pair of queryString.entries()) {
        skill = pair[1]
    }
    skill = skill.replace("-", "/")
    console.log("Handle Next Clicked")

    fetch("http://45.127.4.151:8000/api/booking", {
                    method: "POST",
                    body: JSON.stringify({
                        "contractor_name": JSON.parse(localStorage.getItem("first_name")) +" " + JSON.parse(localStorage.getItem("last_name")),
                        "contractor_email": JSON.parse(localStorage.getItem("email")),
                        "labour_skill": skill,
                        "labour_count": document.getElementById("labour-count").value,
                        "start_date": document.getElementById("start-date").value,
                        "end_date": document.getElementById("end-date").value,
                        "start_time": document.getElementById("start-time").value,
                        "end_time": document.getElementById("end-time").value,
                        "location": document.getElementById("job-loc").value,
                        "status" : "Pending",
                    }),
                    headers: {
                        'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                        'Content-Type': 'application/json'
                    
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    
                })

  }


  return (
    <div className='dashboard-card'>
      
      <main className="dashboard-main">
            <div className="dashboard-container">
                <section className="dashboard-wrapper">
                <span onClick={handleClick}><a href='/dashboard'><img src={leftarrow} alt="back arrow" className='dashboard-icon-align'/></a></span>
                    <div className="dashboard-heading">
                        <h1 className="dashboard-header-text">Job Details</h1>
                    </div>
                    <form name="signin" className="dashboard-form">
                        
                        <div className="dashboard-input-control">
                            <label htmlFor="job-loc" className="dashboard-input-label" >Job Location</label>
                            <input type="text" name="job-loc" id="job-loc" className="contractor-dashboardform-input-field" placeholder='Job Location'/>
                        </div>
                        <div className="dashboard-input-control">
                            <label htmlFor="labour-count" className="dashboard-input-label" >Labour Count</label>
                            <input type="number" name="labour-count" id="labour-count" className="contractor-dashboardform-input-field" placeholder='Labour Count'/>
                        </div>
                        <div className="dashboard-input-control">
                            <label htmlFor="start-date" className="dashboard-input-label" >Start Date</label>
                            <input type="date" name="start-date" id="start-date" className="contractor-dashboardform-input-field" placeholder='Start Date'/>
                        </div>
                        <div className="dashboard-input-control">
                            <label htmlFor="end-date" className="dashboard-input-label" >End Date</label>
                            <input type="date" name="end-date" id="end-date" className="contractor-dashboardform-input-field" placeholder='End Date'/>
                        </div>
                        <div className='contractor-dashboardform-starttime'>
                        <div className="dashboard-input-control"  >
                            <label htmlFor="start-time" className="dashboard-input-label" >Start Time</label>
                            <input type="time" name="start-time" id="start-time" className="contractor-dashboardform-input-field" placeholder='Start Time'/>
                        </div>
                        <div className="dashboard-input-control">
                            <label htmlFor="end-time" className="dashboard-input-label" >End Time</label>
                            <input type="time" name="end-time" id="end-time" className="contractor-dashboardform-input-field" placeholder='End Time'/>
                        </div>
                        </div>                        
                        <div className="dashboard-input-control btn">
                            <input type="submit" name="submit" className="dashboard-input-submit" value="Next" onClick={handleContractorDashboardForm} />
                        </div>
                    </form>
                </section>
            </div>
        </main>
    </div>
  )
}

export default DashboardForm




// import React from 'react'
// import { Typography, Space, Card, Button, Form, Input, Radio } from 'antd'


// export default DashboardForm
// const DashboardForm = () => {
//   return (
//     <div>
//         <Space>
//             <Form>
//                 <Form.Item label="Job Title" >
//                     <Input placeholder='Job title' />
//                 </Form.Item>
//             </Form>
//         </Space>
//     </div>
//   )
// }