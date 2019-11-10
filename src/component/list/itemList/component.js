import React, { Component } from 'react';
import CurItem from '../itemCur';

import {
  Card,
  CardBody
} from "reactstrap"


class TodoList extends React.Component {

    render() {
      const { deleteItem } = this.props;
    return (  
        <div>
        {this.props.items.map(item => (
          <>
          <Card>
            <CardBody>
            <CurItem value={item.value} label={item.label} fromCurrency={item.fromCurrency} initCurrency={item.initCurrency} deleteItem={deleteItem} />
            </CardBody>
          </Card>
          </>
        
        ))} 
    </div>
        
    );
  } 
}

export default TodoList;

