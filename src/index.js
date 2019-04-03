/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions , TouchableOpacity} from 'react-native';
import SwipeListView from './Swipe/SwipeListView';
import MockData from './mock/mock';
import HiddenView from './components/HiddenView';
import CheckBox from './Check/CheckBox';
const screenWidth = Dimensions.get('window').width;
export default class App extends Component{

	constructor(props) {
		super(props);
		this.state = {
			isLeftOpen: false,
			isAllChecked:false
		};
		this._hiddenRows=[];
	}

	_listScroll = (e)=>{

	}

	_renderHiddenRow = (rowData) =>{
		// console.log(rowData);
		return (
			<HiddenView
				ref={h=>this._hiddenRows[rowData.index]=h}
				rowData = {rowData}/>
		);
	}

	renderItem =(rowData)=>{
		// console.log(rowData);
		return(
			<View style={{height:100 , flexDirection:'row' ,justifyContent:'space-between',alignItems:'center',backgroundColor:'white',paddingHorizontal:40}}>
				<Text>{rowData.section.key+rowData.index}</Text>
				<Text style={{marginLeft:40}}>{rowData.item.title}</Text>
			</View>
		);
	}

	_renderListHeader=()=>{
		return(
			<View style={{width:screenWidth,height:150,backgroundColor:'gold',justifyContent:'center',alignItems:'center'}}>
				<Text style={{fontSize:20}}>这里是listHeader</Text>
			</View>
		);
	}

	_renderSectionHeader = ()=>{
		return(
			<View style={{flexDirection:'row',backgroundColor:'grey',alignItems:'center'}}>
				<View style={{height:100,width:screenWidth,justifyContent:'center',alignItems:'center',flex:1}}>
					<Text style={{fontSize:20}}>这里是sectionHeader</Text>
				</View>
				<TouchableOpacity
					onPress={()=>{
						this._listView && this._listView.switchLeftRadio((isOpen)=>{
							this.setState({
								isLeftOpen:isOpen
							});
							this._resetAllCheckBox();
							// console.log('checkBox组是否打开:'+isOpen);
						});
					}}
					activeOpacity={0.9}
					style={{width:80,height:40,backgroundColor:'pink',justifyContent:'center',alignItems:'center',marginRight:10}}>
					<Text style={{fontSize:16,color:'white'}}>{this.state.isLeftOpen?'关闭批量':'打开批量'}</Text>
				</TouchableOpacity>
				
			</View>
			
		);
	}

	_onItemTap = (rowData)=>{
		if(this.state.isLeftOpen){
			this._hiddenRows && this._hiddenRows[rowData.index] && this._hiddenRows[rowData.index].switchCheckedStatus();
		}else{
			alert(JSON.stringify(rowData.item.title));
		}
	}

	_resetAllCheckBox=()=>{
		this._hiddenRows && Object.keys(this._hiddenRows).forEach((key)=>{
			this._hiddenRows[key] && this._hiddenRows[key].setCheckedStatus(false);
		});
		this.setState({
			isAllChecked:false
		});
	}

	_setAllCheckBoxStatus = (status)=>{
		this._hiddenRows && Object.keys(this._hiddenRows).forEach((key)=>{
			this._hiddenRows[key] && this._hiddenRows[key].setCheckedStatus(status);
		});
	}

	render() {
		let sections = MockData.section;
		return (
			<View style={styles.container}>
				<SwipeListView
					ref={r => (this._listView = r)}
					useSectionList
					style={{width: '100%', height: '100%'}}
					keyExtractor={(item) => 'item'+item.id}
					stickySectionHeadersEnabled={true}
					swipeToOpenPercent={20}
					ListHeaderComponent={this._renderListHeader}
					renderSectionHeader={this._renderSectionHeader}
					ItemSeparatorComponent={()=>{return(<View style={{height:1,width:screenWidth-30,backgroundColor:'#eaeaea',marginLeft:15}}/>);}}
					onScroll={
						this._listScroll
					}
					recalculateHiddenLayout={true}
					onItemTap={this._onItemTap}
					disableRightSwipe={true}
					rightOpenValue={-130}
					renderHiddenItem={ this._renderHiddenRow}
					renderItem={this.renderItem}
					sections={sections}
				/>
				{
					this.state.isLeftOpen?
						<View style={{backgroundColor:'#e5e5e5',width:screenWidth,height:40,flexDirection:'row',justifyContent:'flex-start'}}>
							<CheckBox 
								onClick={()=>{
									this.setState({
										isAllChecked:!this.state.isAllChecked
									});
									this._setAllCheckBoxStatus(!this.state.isAllChecked);
								}}
								isChecked={this.state.isAllChecked}
								style={{marginLeft:20,marginTop:10}}/>
							<Text style={{marginTop:14,marginLeft:4}}>全选</Text>
						</View>:
						null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		marginBottom:30
	}
});
