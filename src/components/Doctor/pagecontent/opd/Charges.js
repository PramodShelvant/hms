import React from 'react'
import ReactDOM from 'react-dom'
import {NavLink,BrowserRouter,useParams} from 'react-router-dom'
import Table from '../../../Table'
import {Getdata,Postdata} from '../../../../Network/Server'
import DisplayForm from '../../../../Forms/DisplayForm'
import AddPat from '../../../../Forms/OPDForms/AddPat'
import Addprescription from '../../../../Forms/Addprescription'
import ReactTooltip from 'react-tooltip'
import DisplayPriscription from '../../../../Forms/DisplayPriscription'
import AddCharges from '../../../../Forms/OPDForms/AddCharges'
export default function OpdCharges(props)
{
    let { patientId } = useParams();
    const [index,setindex]=React.useState({});
const column=[{data:'date',title:'Date',render:
(data,type,row,meta)=>new Date(data)=='Invalid Date'?'':new Date(data).toLocaleDateString()
},{data:'chargeType',title:'Charge Type'}
,{data:'chargeCategory',title:'Charge Category'},
{data:'standardCharge',title:'Stardard Charge'},
{data:'tpaCharge',title:'TPA Charge'},
{data:'appliedCharge',title:'Applied Charge'},
{data:'action',title:'Action'}]
const [dataSrc,setdataSrc]=React.useState([{name:'opd123',patientId:'2019/12/12',gender:'Dr Covinda',mobileNumber:'Refe123',appointmentDate:'corona',totalVisit:2}]);
const columnDefs=[{targets:-1,orderable:false,responsivePriority:1,createdCell:(td,cellData,rowData,row,col)=>ReactDOM.render(
    <BrowserRouter>
    <button onClick={()=>setindex(rowData)} className={'btn btn-xs btn-warning'} title='view Details' data-toggle='modal' data-target='#viewDetails'><i className='fa fa-eye'></i></button>
   
    <button onClick={()=>setindex(rowData)} className={'btn btn-xs btn-success'} title='add prescription'  data-toggle='modal' data-target='#add_chargeModal'><i className='fa fa-pencil' data-tip='hello'></i></button>
    
    <button onClick={()=>Getdata(`myopdcharges/delete/${rowData.id}`).then(data=>setdataSrc(item=>item.filter(item1=>item1.id!=data)))} className={'btn btn-xs btn-danger'} ><i className='fa fa-trash'></i></button>
   
   <ReactTooltip/>
    </BrowserRouter>,td)}
  ]
const Link=<NavLink to='dfgh'/>
//React.useEffect(()=>{Getdata('opdoutpatient').then(data=>{console.log(data);setdataSrc(data)});},[])
React.useEffect(()=>{
  //alert(patientId)
  Getdata('myopdcharges/get/'+patientId).then(data=>{setdataSrc(data);console.log(data)});},[])
return (
<>
<nav aria-label="breadcrumb" >
<ol class="p-2 px-5" style={{backgroundColor:'#3f51b5'}} >
<li class="text-white font-weight-bold d-sm-flex justify-content-between align-items-baseline" aria-current="page">
<h6 className='text-sm' style={{letterSpacing:'1px',lineHeight:'100%'}}>Opd Charges</h6>
<div className='btn-group p-0'>
<button className={'btn btn-xs  btn-light ml-1 ' } style={{marginLeft :'0.5px !important',opacity:0}} data-toggle="modal" data-target="sdf">dfgh</button>
<NavLink to={`/doctor/myopd/diagnosis/${patientId}`}  
    class="btn btn-light text-xs  btn-xs  ml-1"><i className='fa fa-reorder'/> Diagnosis</NavLink>  
    <NavLink to={`/doctor/myopd/payment/${patientId}`} 
    class="btn btn-light text-xs  btn-xs  ml-1"><i className='fa fa-reorder'/>  Payment</NavLink>  
    <NavLink to={`/doctor/myopd/bill/${patientId}`} 
    class="btn btn-light text-xs  btn-xs  ml-1"><i className='fa fa-reorder'/>  Bill</NavLink>  
   
<button data-toggle="modal" data-target="#add_chargeModal" onClick={()=>setindex({})} class="btn btn-light text-xs  btn-xs  ml-1"> <i class="fa fa-plus"></i> Add Charges</button>   
           
</div>
</li>
</ol>
</nav>
<div className='px-5 pb-5'>
<Table id='addOpdPatient' col={column} dataSrc={dataSrc} columnDefs={columnDefs}/>
<DisplayForm data={index}/>
<AddCharges patientId={patientId} data={index} setdataSrc={setdataSrc}/>
</div>
</>
)
}
