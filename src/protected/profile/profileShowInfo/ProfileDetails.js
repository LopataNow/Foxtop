import React, { Component } from 'react';
import { Card, List, Button, Input, Spin } from 'antd';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import ProfileInfo from './ProfileInfo';
import ProfileFavoriteGames from './ProfileFavoriteGames';
import ProfilePersonalInfo from './ProfilePersonalInfo';

const { TextArea } = Input;

interface InfoProps {
    
};

interface InfoState {

};


class ProfilefoDetails extends Component<InfoProps, InfoState> {
    render() {
        return (
            <Card title={this.props.displayName}>

                <DetailsLoading isLoaded={this.props.profile.isLoaded} />

                <br />

                <InfoLoading isLoaded={this.props.profile.isLoaded} />

                <br />

                <FavoriteGamesLoading isLoaded={this.props.profile.isLoaded} />

            </Card>
        );
    }
}


function DetailsLoading(props) {
    if (props.isLoaded)
        return (
            <ProfilePersonalInfo />
        );
    else
        return (
            <div >
                <br />
                <br />

                <Spin />

                <br />
                <br />
            </div>
        );
}

function InfoLoading(props) {
    if (props.isLoaded)
        return (
            <ProfileInfo />
        );
    else
        return (
            <div>
                <br />
                <br />

                    <Spin />

                <br />
                <br />
            </div>
        );
}

function FavoriteGamesLoading(props) {
    if (props.isLoaded)
        return (
            <ProfileFavoriteGames />
        );
    else
        return (
            <div>
                <br />
                <br />

                    <Spin />

                <br />
                <br />
            </div>
        );
}

export default compose(
    withFirebase, // add props.firebase (firebaseConnect() can also be used)
    connect(
        ({ firebase: { profile } }) => ({
            profile
        })
    )
)(ProfilefoDetails)
