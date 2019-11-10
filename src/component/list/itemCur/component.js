import React, { Component } from 'react';
// import './component.css';
import {Row, Col} from "react-bootstrap"

class CurItem extends Component {
    handleRemoveButtonClick = () => {
      const { deleteItem, id } = this.props;
      deleteItem(id);
    }
    render() {
    return (
      <>
                  <Row>
                    <Col>
                    <div className="container-fluid">
        <div className="item">
        <span> {this.props.label} </span> 
        <br/>
        <span> 1 {this.props.fromCurrency} = {this.props.label} {this.props.initCurrency} </span> 
       
        
        </div>
        </div>
                  
                
                    </Col>
                  <Col>
                  <span> {this.props.value} </span> {" "}
                  <button style={{float:'right', marginTop:"-4px"}} type="button" className="btn btn-danger btn-sm" onClick={this.handleRemoveButtonClick}>x</button>
                  </Col>
                  </Row>
              </>
        
    );
  }   
}

export default CurItem;