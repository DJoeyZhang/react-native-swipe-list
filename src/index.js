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
const screenWidth = Dimensions.get('window').width;
export default class App extends Component{

	_listScroll = (e)=>{

	}

	_renderHiddenRow = (rowData) =>{
		// console.log(rowData);
		return (
			<View style={{height:'100%',width:130,position:'absolute',right:0}}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{alert('删除'+JSON.stringify(rowData.item.title));}}
					style={{backgroundColor:'red',width:65,position:'absolute',right:0,height:'100%',alignItems:'center',justifyContent:'center'}}>
					<Text style={{color:'white',fontSize:14}}>删除</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{alert('备注'+JSON.stringify(rowData.item.title));}}
					style={{backgroundColor:'grey',width:65,position:'absolute',right:65,height:'100%',alignItems:'center',justifyContent:'center'}}
				>
					<Text style={{color:'white',fontSize:14}}>备注</Text>
				</TouchableOpacity>
			</View>
			
		);
	}

	renderItem =(rowData)=>{
		// console.log(rowData);
		return(
			<View style={{height:100 , flexDirection:'row' ,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
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
							console.log('checkBox组是否打开:'+isOpen);
						});
					}}
					activeOpacity={0.9}
					style={{width:80,height:40,backgroundColor:'pink',justifyContent:'center',alignItems:'center',marginRight:10}}>
					<Text style={{fontSize:16,color:'white'}}>批量编辑</Text>
				</TouchableOpacity>
				
			</View>
			
		);
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
					onItemTap={(isRadioShow,rowData)=>{alert(JSON.stringify(rowData.item.title));}}
					disableRightSwipe={true}
					rightOpenValue={-130}
					renderHiddenItem={ this._renderHiddenRow}
					renderItem={this.renderItem}
					sections={sections}
				/>
        
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
	}
});
