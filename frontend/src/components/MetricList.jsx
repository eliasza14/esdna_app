import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

const MetricList = () => {
    const [products,setMetrics]=useState([]);

    useEffect(()=>{
        getMetrics()
    },[]);

    const getMetrics = async() =>{
        const response = await axios.get('http://localhost:5000/metrics');
        setMetrics(response.data);
    }
    const deleteMetric = async(productId)=>{
        await axios.delete(`http://localhost:5000/metrics/${productId}`);
        getMetrics();
    }
  return (
    <div>
        <h1 className='title'>Metrics</h1>
        <h2 className='subtitle'>List of Metrics</h2>
        <Link to={"/metrics/add"} className='button is-primary mb-2'>Add New</Link>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Metric Name</th>
                    <th>Metric Unit Measure</th>
                    <th>Metric Description</th>

                </tr>
            </thead>
            <tbody>
                {products.map((metric,index)=>(
                    <tr key={metric.uuid}>
                        <td>{index+1}</td>
                        <td>{metric.name}</td>
                        <td>{metric.unit}</td>
                        <td>{metric.unit_desc}</td>

                        <td>
                            <Link to={`/metrics/edit/${metric.uuid}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=>deleteMetric(metric.uuid)} className='button is-small is-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default MetricList