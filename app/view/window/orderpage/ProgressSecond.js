import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    AppState,
    FlatList,
    RefreshControl,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import SearchPage from '../../SearchPage'
import OrderPage from '../../OrderPage'
import {Container, Tab, Tabs,TabHeading} from 'native-base';
import MyTimer from '../../../common/MyTimer'

var TimerMixin=require('react-timer-mixin');
import comstyle from '../../../common/CommonStyle'

// var comdtime=600;
var uptime=1;
var theTime = 0;//秒
var theTime1 = 0;//分
var theTime2 = 0;//时
var navigation=null
export default class ProgressSecond extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props);

        this.state={
            datas:'',

            title:'',
            // dataSource: new ListView.DataSource({
            //     rowHasChanged: (row1, row2) => row1 !== row2,
            // }),
            // system:theTime2+':'+theTime1+':'+theTime,

            id:[],//订单id
            // ids:'',
            // time:'',
            isRefreshing:false,
            totalpage:0,
            perpage:0,
            // dataArray:[],
            pageIndex:0,
            isLoading:false

        }
        navigation=this.props.navigation
        // alert(JSON.stringify(navigation))
    }
    componentDidMount(){
        this.timer && clearInterval(this.timer);
        //开始预约计时rowan
        // this.timer=setTimeout(()=>{
        // this.fetchDate()
        //     },2000)
        var tem=this

        // setTimeout(function () {
        //     tem.fetchDate()
        // },1000)
        this.fetchDate(1)
        this.setState({
            isRefreshing:true
        })


    }
    fetchDate(page){
        postFetch(API.OrderSec,{orderDining:{status:1,diningType:1},pageNum:page,numPerPage:10},(result)=>{
             //alert(JSON.stringify(result))

            result.status=1;
            result.page ={totalCount:10};
            result.data = [{id:1,orderNumber:1,orderName:'牛排',countdownTime:800000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:2,orderNumber:2,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:3,orderNumber:3,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:4,orderNumber:4,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:5,orderNumber:5,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:6,orderNumber:6,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:7,orderNumber:7,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:8,orderNumber:8,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:9,orderNumber:9,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:10,orderNumber:10,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},
                {id:11,orderNumber:11,orderName:'牛排',countdownTime:80000,diningType:0,deliveryType:0,imlUrl:'http://imgsrc.baidu.com/imgad/pic/item/9a504fc2d562853574b40c099bef76c6a7ef6346.jpg'},

            ];
            this.setState({
                isRefreshing:false
            })
            this.timer && clearInterval(this.timer);
            if(result.status==1){
                this.setState({
                    totalpage:result.page.totalCount
                })
                this.timer = setInterval(()=>{

                    this.setState({
                        datas:this.state.datas-1
                    })


                },1000)
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        title:'当前没有进行中订单记录',
                    })
                }else if(page==1){
                    this.setState({
                        // dataSource:this.state.dataSource.cloneWithRows(result.data),
                        id:result.data,
                        isRefreshing:false,
                        title:'',
                        perpage:result.data.length
                    })
                }else {
                    this.setState({
                        id:this.state.id.concat(result.data),
                        title:'',
                        perpage:this.state.perpage+result.data.length,
                        isLoading:true,
                    })
                }
            }
        },(error)=>{
             alert(error)
            this.setState({
                isRefreshing:false
            })
        })
        AppState.addEventListener('change',this.handleAppState.bind(this));
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        AppState.removeEventListener('change', this.handleAppState.bind(this));
    }
    handleAppState(nextAppState) {
        if (nextAppState === 'inactive') {
            this.recodTime = new Date();
            this._endTimer();
        } else if (nextAppState === 'active') {

            this.turnsOnTimer();
        }
    }
    _endTimer(){

        this.timer && clearInterval(this.timer)

    }
    turnsOnTimer(){

        const now = new Date();
        const diff = Math.round((now - this.recodTime) / 1000);

        this.count = this.count+diff;

        // this._beginTimer();
        this.fetchDate()

    };

    render(){
        var contentView=null;

        return(<View style={{flex:1,backgroundColor:'#f9f9f9'}}>
            <View style={styles.text}>
                <Text>{this.state.title}</Text>

            </View>

            {/*<ListView*/}
                {/*dataSource={this.state.dataSource}*/}
                {/*renderRow={this._renderRow}*/}

                {/*refreshControl={*/}
                    {/*<RefreshControl*/}
                        {/*refreshing={this.state.isRefreshing}*/}
                        {/*onRefresh={this._onRefresh.bind(this)}*/}
                    {/*/>*/}
                {/*}*/}
            {/*/>*/}
            <ScrollView
                showsVerticalScrollIndicator={true}
                scrollEnabled={true}
                pagingEnabled={true}
                horizontal={false}
                onScroll={this.renderFooter}
                automaticallyAdjustContentInsets={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {this.state.id.map((rowData,index)=>{
                    rowData.countdownTime-=1000
                    //
                    // if((MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime)/1000))==0){
                    //     alert("sss")
                    // }
                    // if(rowData.countdownTim==0){
                    //     alert("ssssss")
                    // }
                    var i =  rowData.countdownTime/1000;
                    var j = MyTimer.formatSeconds(2,i)
                    return(
                        <View style={{flexDirection:'column'}} key={index}>
                            <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
                                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                    <View style={{flexDirection:'column'}}>
                                        <Image source={require('../../../img/order/lvshutiao.png')}/>
                                    </View>
                                    <Image source={{uri:rowData.imlUrl}} style={{width:45,height:45,marginLeft:20}}/>
                                    <View style={styles.item}>
                                        {/*<Text>{rowData.consignee}</Text>*/}
                                        <Text style={{fontSize:14,color:'#282828',marginBottom:2.5}}>{rowData.orderName}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{fontSize:10,color:'#B2B2B2',marginTop:2.5}}>【新消息】</Text>
                                            <Text style={{fontSize:10,color:'#B2B2B2',marginTop:2.5}}>{rowData.deliveryType==0?'预约成功':'预约失败'}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/*<Text>{MyTimer.formatSeconds(1,this.state.comdtime)}</Text>*/}
                                <View style={{flexDirection:'row',justifyContent:"flex-end"}}>
                                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
                                    <Image source={require('../../../img/order/greenquan.png')} style={{marginRight:20,alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
                                        <Text style={{color:'#33BAB2',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                                    </Image>
                                    {/*<Text style={{marginRight:20}}>{(rowData.countdownTime)<0?*/}

                                    {/*MyTimer.formatSeconds(1,-((rowData.countdownTime/1000))):MyTimer.formatSeconds(1,(rowData.countdownTime)/1000)}</Text>*/}
                                    {/*<Text>{i+"-"+j}</Text>*/}
                                    <Text style={{marginRight:20,fontSize:10,color:'#FF305E'}}>{rowData.countdownTime<0?MyTimer.formatSeconds(2,-(rowData.countdownTime/1000)):MyTimer.formatSeconds(2,rowData.countdownTime/1000)}</Text>
                                </View>
                                    {/*<View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}>*/}
                                        {/*<Image source={require('../../../img/window/press.png')} style={{marginRight:20}}/>*/}
                                    {/*</View>*/}
                                </View>
                                {/*<Text onPress={this.jiedan.bind(this,rowData.id)}>{rowData.id}</Text>*/}
                                {/*<Text>{this.state.ids}</Text>*/}
                            </TouchableOpacity>
                            <View style={comstyle.heng}/>
                        </View>
                    )

                })}
            </ScrollView>
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
        </View>)
    }
    _onRefresh(){
        this.setState({
            isRefreshing:true,
            id:[],
            pageIndex:1
        })
        this.timer && clearInterval(this.timer);
        this.fetchDate(1);
    }
    renderFooter=()=>{
        // alert(this.state.totalpage)
        if(this.state.totalpage==this.state.perpage){
            return(<View style={comstyle.loadingMore}>
                <Text style={comstyle.loadingText}>没有更多数据啦...</Text>
            </View>)
        }else {
            this.setState({
                pageIndex:this.state.pageIndex+1,
                isLoading:true
            })
            this.fetchDate(this.state.pageIndex+1)
            return(<ActivityIndicator style={comstyle.loadingMore}/>)
        }
    }
    // _renderRow=(rowData,sectionID,rowID)=>{
        // this.setState({
        //     isRefreshing:true
        // })
        // this.fetchDate();
        // alert(this.state.datas)

        // rowData.countdownTime-=1000
        // //
        // // if((MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime)/1000))==0){
        // //     alert("sss")
        // // }
        // // if(rowData.countdownTim==0){
        // //     alert("ssssss")
        // // }
        // var i =  rowData.countdownTime/1000;
        // var j = MyTimer.formatSeconds(2,i)
        // return(
        //     <View style={{flexDirection:'column'}}>
        //     <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
        //         <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        //             <View style={{flexDirection:'column'}}>
        //                 <Image source={require('../../../img/order/lanshutiao.png')}/>
        //             </View>
        //             <Image source={{uri:rowData.imlUrl}} style={{width:45,height:45,marginLeft:20}}/>
        //             <View style={styles.item}>
        //                 {/*<Text>{rowData.consignee}</Text>*/}
        //                 <Text>{rowData.orderName}</Text>
        //                 <Text>{rowData.deliveryType==0?'外送：立即配送':'到店'}</Text>
        //             </View>
        //         </View>
        //         {/*<Text>{MyTimer.formatSeconds(1,this.state.comdtime)}</Text>*/}
        //         <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
        //             <Image source={require('../../../img/order/greenquan.png')} style={{marginRight:20,alignItems:'center',justifyContent:'center'}}>
        //                 <Text style={{color:'#33BAB2',fontSize:10,}}>{rowData.orderNumber+'号'}</Text>
        //             </Image>
        //             {/*<Text style={{marginRight:20}}>{(rowData.countdownTime)<0?*/}
        //
        //             {/*MyTimer.formatSeconds(1,-((rowData.countdownTime/1000))):MyTimer.formatSeconds(1,(rowData.countdownTime)/1000)}</Text>*/}
        //             {/*<Text>{i+"-"+j}</Text>*/}
        //             <Text style={{marginRight:20}}>{rowData.countdownTime<0?MyTimer.formatSeconds(2,-(rowData.countdownTime/1000)):MyTimer.formatSeconds(2,rowData.countdownTime/1000)}</Text>
        //         </View>
        //         {/*<Text onPress={this.jiedan.bind(this,rowData.id)}>{rowData.id}</Text>*/}
        //         {/*<Text>{this.state.ids}</Text>*/}
        //     </TouchableOpacity>
        //         <View style={comstyle.heng}/>
        //     </View>
        // )


    // }
    jiedan(rowData){
        // postFetch(API.JieDan,{orderDining:{
        //     id:rowData,
        //     status:'1'
        // }},(result)=>{
        //     alert(JSON.stringify(result))
        //     if(result.status==1){
        //         this._toast.show('接单成功')
        //     }
        // })
    }

    select(rowData){
        // alert(rowData.id.toString())
        // alerthistles
        //  alert('sss')

        this.props.navigation.navigate('ProgressDaoTot',{data:JSON.stringify(rowData.id)})
        // alert(JSON.stringify(rowData.id))
    }
}
const styles=StyleSheet.create({
    contain:{
        flex:1
    },
    text:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        position:'absolute',
        marginLeft:100
    },
    listview:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        marginTop:10,
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    item:{
        flexDirection:'column',
        marginLeft:10
    }
})