import React, { Component } from 'react';
import { Card, List, Button, Input } from 'antd';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'

const { TextArea } = Input;

interface InfoProps {
};

interface InfoState {
    editing: any;
    ageValue: string;
    emailValue: string;
    facebookValue: string;
};

class ProfilePersonalInfo extends Component<InfoProps, InfoState>{
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

    async setSave() {
        this.setState({ editing: false });
        await this.props.firebase.updateProfile({ age: this.state.ageValue });
        await this.props.firebase.updateProfile({ email: this.state.emailValue });
        await this.props.firebase.updateProfile({ facebook: this.state.facebookValue });
    }   

    render() {
        if (!this.state.editing)
        return (
            <div>
                <p>Age : {this.props.profile.age}</p>
                <p>Email : {this.props.profile.email}</p>
                <p>Facebook : {this.props.profile.facebook}</p>
                <Button onClick={this.enableEdit}>Edit</Button>
            </div>
            );
        else
            return (
                <div>
                    <Input
                        setFieldsValue={this.state.ageValue}
                        defaultValue={this.props.profile.age}
                        onChange={(e) => { this.setState({ ageValue: e.target.value }) }}
                    />
                    <Input
                        setFieldsValue={this.state.emailValue}
                        defaultValue={this.props.profile.email}
                        onChange={(e) => { this.setState({ emailValue: e.target.value }) }}
                    />
                    <Input
                        setFieldsValue={this.state.facebookValue}
                        defaultValue={this.props.profile.facebook}
                        onChange={(e) => { this.setState({ facebookValue: e.target.value }) }}
                    />
                    <Button onClick={this.disableEdit} >Canel</Button>
                    <Button onClick={this.saveInfo} >Save</Button>
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
)(ProfilePersonalInfo)
