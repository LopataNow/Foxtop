import React, {Component} from 'react'
import {compose} from "redux";
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

interface ItemProps {
  title: String;
  img: String;
  price: number;
}

const Item = (props: ItemProps) => (
  <div style={{padding: "10px", width: "220px", textAlign: "center", background: '#fff', margin: "10px"}}>
    <h2 style={{color: '#F38A21'}}>{props.title}</h2>
    <img height={250} src={props.img}/>
    <h2 style={{color: '#F38A21'}}>{props.price} Kč</h2>
  </div>
)

class Eshop extends Component {
  render() {
    return (
      <div>
        {
          this.props.merchandise
            ? this.props.merchandise.map(it => (
              <div key={it.id} style={{
                display: 'inline-flex'
              }}>
                <Item {...it} key={it.id}/>
              </div>

            ))
            : null
        }
      </div>
    )
  }
}

export default compose(
  firestoreConnect((props) => [
    {collection: 'merchandise'} // or `todos/${props.todoId}`
  ]), // or { collection: 'todos' }
  connect((state, props) => ({
    merchandise: state.firestore.ordered.merchandise ? state.firestore.ordered.merchandise.map((it, index) => ({key: index, ...it})) : state.firestore.ordered.merchandise
  }))
)(Eshop)