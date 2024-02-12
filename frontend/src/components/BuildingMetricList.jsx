import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import CSVReaderComponent from './CSVReaderComponent'

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const BuildingMetricList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)

    const [buildingmetrics,setBuildingMetrics]=useState([]);

    useEffect(()=>{
        getBuildingMetrics()
    },[]);

    const getBuildingMetrics = async() =>{
        const response = await axios.get('http://localhost:5000/buildingmetrics');
        setBuildingMetrics(response.data);
    }
    const deleteBuildingMetric = async(buildingmetricId)=>{
        await axios.delete(`http://localhost:5000/deletebuildingmetric/${buildingmetricId}`);
        getBuildingMetrics();
    }
  return (
    <div>
        <h1 className='title'>Καταχωρημένες Μετρήσεις Αέριων Ρύπων</h1>
        <h2 className='subtitle'></h2>
        {user && user.role ==="admin" && (
        <div className="columns">
          <div className="column">
            
                <Link to={"/buildingmetrics/add"} className='button is-primary mb-2'>Προσθήκη Νέου</Link>
            
          </div>
          <div className="column">
            
            <CSVReaderComponent/>
           
          </div>
        
        </div>
   )}

        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Όνομα Σημέιου</th>
                    <th>Όνομα Ρύπου</th>
                    <th>Τιμή</th>
                    <th>Περίοδος Μετρήσεων</th>
                    {user && user.role ==="admin" && (


                    <th>Εκτέλεση</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {buildingmetrics.map((buildingmetric,index)=>(
                    <tr key={buildingmetric.id}>
                        <td>{index+1}</td>
                        <td>{buildingmetric.building.name}</td>
                        <td>{buildingmetric.metric.name}</td>
                        <td>{buildingmetric.value}</td>
                        <td>{buildingmetric.year}</td>
                        {user && user.role ==="admin" && (

                        <td>
                            <Link to={`/buildingmetrics/edit/${buildingmetric.uuid}`} className='button is-small is-info'>Επεξεργασία</Link>
                            <button onClick={()=>deleteBuildingMetric(buildingmetric.uuid)} className='button is-small is-danger'>Διαγραφή</button>
                        </td>
                          )}
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default BuildingMetricList