import React, {Component} from 'react'
import { Avatar } from 'antd';
import { Row, Col } from 'antd/lib/grid';
import { Card, List } from 'antd';


import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import { Button } from 'antd/lib/radio';

import ProfileDetails from './profileShowInfo/ProfileDetails';
import ProfileImage from './profileShowInfo/ProfileImage';

// HOWTO: http://react- redux-firebase.com/docs/recipes/profile.html

class Profile extends Component {
 
    render() {
        return (
            <Row type="flex">
                <Col span={4} order={4}>
                    <ProfileImage
                        srcImg={this.props.profile.avatarUrl}
                        isLoaded={this.props.profile.isLoaded} />
                </Col>
                <Col span={16} order={4}>

                    <ProfileDetails/>
                   
                </Col>
            </Row>
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
)(Profile)
