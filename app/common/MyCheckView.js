import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import Contants from './Contants'

export default class MyCheckView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked
        }
    }

    static propTypes = {
        ...View.propTypes,
        checkedImage: React.PropTypes.element,
        unCheckedImage: React.PropTypes.element,
        onChange: React.PropTypes.func,
        isChecked: React.PropTypes.bool,
        id:React.PropTypes.number
    };

    static defaultProps = {
        isChecked: false
    };

    isCheck(){
        return this.state.isChecked;
    }

    check(isChecked){
        this.setState({
            isChecked: isChecked
        });
    }

    render(){
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={()=>{
                    var isChecked = !this.state.isChecked;
                    this.setState({
                        isChecked: isChecked
                    });
                    if(this.props.onChange){
                        this.props.onChange(this.props.id,isChecked);
                    }
                }}
                underlayColor='transparent'
            >
                <View style={[styles.container,{flexDirection:'row'} ]}>
                    {this._renderImage()}
                </View>
            </TouchableHighlight>
        )
    }

    _renderImage(){
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    genCheckedImage(){
        var source = this.state.isChecked ? require('../img/pinglun/dianzanpress.png') : require('../img/pinglun/dianzan.png');

        return (
            <Image  source={source} resizeMode="contain"/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    imgSize: {
        width:60*Contants.Screen.width/750,
        height:60*Contants.Screen.height/1334
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
});