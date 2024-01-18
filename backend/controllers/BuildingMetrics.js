import BuildingMetric from "../models/BuildingMetricModel.js";
import User from "../models/UserModel.js";
import Building from "../models/BuildingModel.js"
import Metric from "../models/MetricModel.js"

import { Sequelize,Op } from "sequelize";





export const getBuildingMetricsAVG = async (req, res) => {
    try {
        let response;
        const groupAttributes = [
            'Building.name',
            'Building.category',
            'Metric.name',
            'year',
        ];

        if (req.role === 'admin') {
            response = await BuildingMetric.findAll({
                attributes: [
                    ...groupAttributes,
                    [Sequelize.fn('AVG', Sequelize.col('value')), 'mean_value'],
                ],
                include: [
                    {
                        model: Building,
                        attributes: ['name', 'lat', 'lon', 'category'],
                    },
                    {
                        model: Metric,
                        attributes: ['name'],
                    },
                ],
                group: groupAttributes,
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export const getBuildingMetrics = async(req,res)=>{
    try{
        let response;
        if(req.role === "admin"){
            response=await BuildingMetric.findAll({
                attributes:['uuid','year','value'] ,
                include:[
                    {
                    model:Building,
                    attributes:['name','lat','lon','category'],
                },
                {
                    model:Metric,
                    attributes:['name','unit','unit_desc']
                            
                }
           ],
           order: [['year', 'ASC']] // Add this line to order by 'year' in ascending order


            });
        }
        
     
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});

    }
}

export const getBuildingMetricsById = async(req,res)=>{

    try{
        const response = await BuildingMetric.findOne({
            attributes:['uuid','year','value'],
            include:[
                {
                model:Building,
                attributes:['name','lat','lon','category'],
            },
            {
                model:Metric,
                attributes:['name','unit','unit_desc']
                        
            }
            ],    
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
}

export const createBuildingMetric = async(req,res)=>{
    const {buildingId,metricId,value,year} = req.body
    // const { name, coordinates } = req.body; // Assuming the request body contains 'name' and 'coordinates' for the building


    try {
        await BuildingMetric.create({
            buildingId:buildingId,
            metricId:metricId,
            value:value,
            year:year
        });
        res.status(201).json({msg:"BuildingMetric Created succesfuly"})


    }
    catch(error){
        res.status(500).json({msg:error.message});

    }
    
}

export const updateBuildingMetric= async(req,res)=>{

    const buildingmetric = await BuildingMetric.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if (!buildingmetric) return res.status(404).json({msg:"Data not found"})
    const {value,year} = req.body

    try{

        await BuildingMetric.update({value,year},{
            where:{
                id:buildingmetric.id
            }
        });
        
   
    
    // else{
    //     if (req.userId !== product.userId) return res.status(403).json({msg:"Access is forbidedn"})

    //     await Building.update({name,lat,lon},{
    //         where:{
    //             [Op.and]:[{id:building.id},{userId:req.userId}]
    //         }
    //     });
    // }
    res.status(200).json({msg:"BuildingMetric updated successfulyyy"});
} catch (error){
    res.status(500).json({msg:error.message});

}
}


export const deleteBuildingMetric = async(req,res)=>{
    
    const buildingmetric = await BuildingMetric.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if (!buildingmetric) return res.status(404).json({msg:"BuildingMetric not found"});
    
    try{
        await BuildingMetric.destroy({
            
      
            where:{
                id:buildingmetric.id
            }
        });
        res.status(200).json({msg:"BuildingMetric deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
