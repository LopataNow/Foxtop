import React, {Component} from 'react'

import {Form, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import FormItem from "antd/es/form/FormItem";
import Map from "../places/maps/Map";

const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

interface Props {
  closeCallback: () => void;
  submitCallback: (Event) => void;
}

class CreateEventForm extends Component<Props, {}> {
  /*
  title: String;
  description: String;
  place: String;
  people: {
    invited: Array<String>;
    accepted: Array<String>;
    refused: Array<String>;
  };
  games: Array<String>;
  date: String;
   */

  state = {
    showMap: true,
    place: {
      name: ""
    },
    title: "",
    game: "",
    people: "",
    datetime: "",
    description: "",
    level: 1
  }

  formItemLayout = {
    labelCol: {
      xs: {span: 12},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };
  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  render() {
    return (
      <div style={{display: 'block', height: '700px'}}>
        <div style={{display: 'inline-box'}}>
          <div style={{float: 'left'}}>
            <div>
              <input placeholder="Title" value={this.state.title} onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>
            </div>
            <div>
              <input placeholder="Game" value={this.state.game} onChange={(e) => {
                this.setState({game: e.target.value})
              }}/>
            </div>
            <div>
              <input placeholder="People" value={this.state.people} onChange={(e) => {
                this.setState({people: e.target.value})
              }}/>
            </div>
            <div>
              <input placeholder="Datetime" value={this.state.datetime} onChange={(e) => {
                this.setState({datetime: e.target.value})
              }}/>
            </div>
            <div>
              <Map placeCallback={this.placeSelected} search={this.state.place.name}/>
            </div>
            <div>
              <textarea placeholder="Description" value={this.state.description} onChange={(e) => {
                this.setState({description: e.target.value})
              }}/>
            </div>
            <div>
              <Button type="primary" onClick={this.handleSubmit}>Create</Button>
              <Button type="secondary" onClick={this.props.closeCallback}>Hide</Button>
            </div>
          </div>
          <div>
            <h2 style={{color: '#FA8C16', fontStyle: 'bold'}}>Level {this.state.level}</h2>
            <img src={'/imgs/level' + this.state.level + '.svg'} onClick={this.toggleLevel} height={500}
                 style={{cursor: 'pointer', marginLeft: '10px'}}/>
          </div>
        </div>
      </div>
    )
  }

  toggleLevel = () => {
    if (this.state.level >= 3) {
      this.state.level = 0
    }
    this.setState({level: this.state.level + 1})
  }

  handleSubmit = () => {
    this.props.submitCallback({
      place: this.state.place,
      title: this.state.title,
      game: this.state.game,
      people: {
        invited: this.state.people.split(",").map(it => it.trim()),
        accepted: [this.props.me.email],
        required: 6
      },
      datetime: this.state.datetime,
      description: this.state.description,
      level: this.state.level
    })
    // this.props.closeCallback()
  };

  selectPlace = () => {
    this.setState({showMap: true})
  }
  placeSelected = (place: Place) => {
    this.setState({showMap: false, place: place})
  }
}

export default CreateEventForm
