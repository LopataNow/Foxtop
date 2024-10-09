import React, { Component } from 'react';
import profil from './profil.svg';


interface ImgProps{
    srcImg: string;
    isLoaded?: boolean;
};

export default class ProfileImage extends Component<ImgProps> {

    render() {
        let imgPath: string;
        if (this.props.isLoaded)
            imgPath = this.props.srcImg;
        else imgPath = profil;

        return (
            <img src={imgPath} style={{ width: '100%' }} /> 
        );
    }
}