import React from 'react';
import { Col, Row } from 'reactstrap';

function CallData(props) {
  return (
      <>
   {/* <Row> */}
     {/* <Col md="" style={{ color:"white", backgroundColor:"black" , fontSize:"12px" }}> */}
                    <p style={{  color:"white", backgroundColor:"black" , fontSize:"12px", marginTop:"15px", marginLeft:"2%", height:"40px", alignItems:"center", border:"1px solid #ECF0F1", display:"flex", paddingLeft:"5px" }}>
                         {props.heading}  : <span style={{marginLeft:"10px", color:"#DADADA"}}> {props.name}  </span> </p>
     {/* </Col> */}
     {/* <Col md="6" style={{ backgroundColor:"black" , color:"white" , fontSize:"12px" }}>

                <p style={{ marginTop:"15px", marginLeft:"2%", height:"40px", alignItems:"center", display:"flex", border:"1px solid #ECF0F1", paddingLeft:"5px"}}>
                     {props.heading2}   : <span style={{marginLeft:"10px", color:"#DADADA"}}> {props.name2} </span></p>
     </Col> */}
  {/* </Row> */}
  </>
  );
}

export default CallData;
