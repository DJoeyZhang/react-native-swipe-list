/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import CheckBox from '../Check/CheckBox';
export default class HiddenView extends Component{

	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}

	switchCheckedStatus=()=>{
		this.setState({
			isChecked:!this.state.isChecked
		});
	}

	setCheckedStatus=(checkedStatus)=>{
		this.setState({
			isChecked:checkedStatus
		});
	}

	shouldComponentUpdate(nextProp , nextState){
		if(nextProp.rowData === this.props.rowData
			&&nextState.isChecked === this.state.isChecked){
			return false;
		}
		return true;
	}

	render() {
		let {rowData} = this.props;
		return (
			<View style={{height:'100%',width:'100%',position:'absolute',right:0}}>
				<CheckBox
					isChecked={this.state.isChecked}
					onClick={()=>{
						this.setState({
							isChecked:!this.state.isChecked
						});
					}}
					style={[styles.commonButtonStyle,{backgroundColor:'white',left:0}]}/>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{alert('删除'+JSON.stringify(rowData.item.title));}}
					style={[styles.commonButtonStyle,{backgroundColor:'red',right:0}]}>
					<Text style={{color:'white',fontSize:14}}>删除</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{alert('备注'+JSON.stringify(rowData.item.title));}}
					style={[styles.commonButtonStyle,{backgroundColor:'grey',right:65}]}
				>
					<Text style={{color:'white',fontSize:14}}>备注</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	commonButtonStyle: {
		width:65,
		height:'100%',
		position:'absolute',
		justifyContent:'center',
		alignItems:'center'
	}
});
