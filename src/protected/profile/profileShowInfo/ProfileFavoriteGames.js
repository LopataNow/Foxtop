import React, { Component } from 'react';
import { Card, List, Button, Input } from 'antd';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import ProfileInfo from './ProfileInfo';

const { TextArea } = Input;

interface InfoProps {

};

interface InfoState {

};

class PrifileFavoriteGames extends Component<InfoProps, InfoState> {
    render() {
        return (
            <div>
                <h4>Favorite Games</h4>
                <List
                    title="Favorite Games"
                    favoriteGames
                    dataSource={this.props.profile.favoriteGames}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                <Button >Edit</Button>
                <Button >Add</Button>
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
)(PrifileFavoriteGames)
