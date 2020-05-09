import React from 'react'
import ReactDOM from 'react-dom'
import {NavLink,BrowserRouter} from 'react-router-dom'

import DisplayForm from '../../../../Forms/DisplayForm'
import { Getdata } from '../../../../Network/Server'
import Table from '../../../Table'
import AddTpa from '../../../../Forms/Tpa/AddTpa'

export default function Tpa(props)
 {
  const [index1,setindex1]=React.useState({organisationName:'',code:'',contactNo:''
  ,contactPersonName:'',address:'',contactPersonPhone:''});
  const [index,setindex]=React.useState({});
  const column=[{data:'',title:'Sl.No',render:( data, type, row, meta ) =>`<b>${meta.row+1}</b>`},
  {data:'organisationName',title:'Organisation Name'},
  {data:'code',title:'Code'},
  {data:'contactNo',title:'Contact Number'},
  {data:'contactPersonName',title:'Contact Person'},
  {data:'address',title:'Address'},
  {data:'contactPersonPhone',title:'Phone'},
  {data:'action',title:'Action'}]
    const [dataSrc,setdataSrc]=React.useState([]);
    const columnDefs=[{targets:-1,orderable:false,responsivePriority:1,createdCell:(td,cellData,rowData,row,col)=>ReactDOM.render(
      <BrowserRouter>
      <button onClick={()=>setindex(rowData)} className={'btn btn-xs btn-light'} data-toggle='modal' data-target='#viewDetails'><i className='fa fa-eye'></i></button>
     
      </BrowserRouter>,td)}]
    
    React.useEffect(()=>{
       Getdata('organisation/get').then(data=>setdataSrc(data));
      },[])


    return (
        <>
        <nav aria-label="breadcrumb" >
  <ol class="p-2 px-5" style={{backgroundColor:'#3f51b5'}} >
  <li class="text-white font-weight-bold d-sm-flex justify-content-between align-items-baseline" aria-current="page">
      <h6 className='text-sm' style={{letterSpacing:'1px',lineHeight:'100%'}}>Tpa List</h6>
  <div className='btn-group p-0'>
    <button className={'btn btn-xs  btn-light ml-1 ' } style={{marginLeft:'0.5px !important',opacity:0}} data-toggle="modal" data-target="sdf">dfgh</button>
                         </div>
  </li>
  </ol>
  </nav>

  <div className='px-5 pb-5'>
    <Table id='medicineCategory' col={column} dataSrc={dataSrc} columnDefs={columnDefs}/>
 
    <DisplayForm data={index}/>
  </div>
        </>
    )
}
