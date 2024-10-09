import React, { Component } from 'react';
import { Card, List, Button, Input } from 'antd';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase';

const { TextArea } = Input;

interface InfoProps {
};

interface InfoState {
    editing: any;
    valueInfo: string;
};

class ProfileInfo extends Component<InfoProps, InfoState> {
    constructor(props: InfoProps) {
        super(props)
        this.state = {
            editing: false,
            valueInfo:"",
        };

        this.enableEdit = this.setEdit.bind(this, true);
        this.disableEdit = this.setEdit.bind(this, false);
        this.saveInfo = this.setSave.bind(this);
    }

    setEdit(edit: boolean) {
        this.setState({ editing: edit });
    }

    setSave() {
        this.setState({ editing: false });
        this.props.firebase.updateProfile({ info: this.state.valueInfo });
    }   

    render() {
        
        if (!this.state.editing)
        return (
            <div>
                <Card title="Info">
                    <p>{this.props.profile.info}</p>
                </Card>
                <br />
                <Button onClick={this.enableEdit} >Edit</Button>
            </div>
            );
        else
            return (
                <div>
                    <TextArea
                        setFieldsValue={this.state.valueInfo}
                        defaultValue={this.props.profile.info}
                        onChange={(e) => { this.setState({ valueInfo: e.target.value }) }}
                    />
                    <Button onClick={this.disableEdit} >Canel</Button>
                        <Button onClick={this.saveInfo}>Save</Button>
                </div>
            );
    }
}

export default compose(
    withFirebase, // add props.firebase (firebaseConnect() can also be used)
    connect(
        ({ firebase: { profile } }) => ({
            profile
        })
    )
)(ProfileInfo)
