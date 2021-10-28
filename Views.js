import React, {componenet, Component} from 'react';

import './Views.css'
import 'video.js/dist/video-js.css';
import forwardVideoSample from './video/forward_backward_5.0rate.mp4'

import videojs from 'video.js';


import socketClient  from "socket.io-client";

const SEVER = '192.168.0.12:20000';

let background;
let padding = 0;
let id = 0;


class Views extends Component{
    constructor(props){
        super(props);
        var socket = socketClient(SEVER);
        
        socket.on('connect', ()=>{console.log("connected")
        socket.emit('message', "I'm client2.");
            });
        socket.on("hello", (arg) => {
          console.log(arg); // world
        });
        socket.on('view', (arg)=>{
            this.view = arg;
            if(arg !== null)
                this.player.currentTime(arg);
                this.player.play();
                this.setState({isshown : 'visible'})
            console.log(arg);
        });
        //this.state = { style: {padding :0, left : left, top : top,position:'absolute'} };
        this.state = {left: 9, top : -23, inc: 1, isshown: 'visible'}; //9 -23
        socket.on("end_position", (arg)=>{
            console.log('end_position:',arg)
            this.end = arg;            
        });
        socket.on('rate', (arg)=>{
            this.player.playbackRate(arg);
        })
    };

    componentDidMount(){
        this.player = videojs(this.videoNode, this.props, function onPlayerRead(){
            console.log('onPlyaerReady', this)
        });
        this.player.pause();
        this.end = 19*31;
        id = setInterval(() => {
            var time = this.player.currentTime();
            console.log(time);
            if(time >= this.end)
                this.player.pause();
          }, 50)
        this.player.width(1994.16) //1982.06
        this.player.height(1124.88) //1114.66
        
    }

    componentWillUnmount(){
        if(this.player){
            this.player.dispose()
        }
    }
    handleKeyPress = (event) => {
        if(event.key === 'O' || event.key === 'o'){
            this.player.height(this.player.currentHeight()*0.99);
            this.player.width(this.player.currentWidth()*0.99);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 'P' || event.key === 'p'){
            console.log('P');
            this.player.height(this.player.currentHeight()*1.01);
            this.player.width(this.player.currentWidth()*1.01);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 'w' || event.key === 'W'){
            this.player.height(this.player.currentHeight()*1.0);
            this.player.width(this.player.currentWidth()*1.01);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 's' || event.key === 'S'){
            this.player.height(this.player.currentHeight()*1.0);
            this.player.width(this.player.currentWidth()*0.99);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 'a' || event.key === 'A'){
            this.player.height(this.player.currentHeight()*1.0);
            this.player.width(this.player.currentWidth()*0.999);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 'H' || event.key === 'h'){
            this.player.width(this.player.currentWidth()*1.0);
            this.player.height(this.player.currentHeight()*1.01);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === 'n' || event.key === 'N'){
            this.player.height(this.player.currentHeight()*0.99);
            this.player.width(this.player.currentWidth()*1.0);
            console.log(this.player.currentWidth());
            console.log(this.player.currentHeight());
        }
        if(event.key === '+'){
            this.setState({
                inc : this.state.inc *2
            })
        }
        if(event.key === '-'){
            this.setState({
                inc : this.state.inc /2
            })
        }
        if(event.key === '2'){
            console.log("ArrowDown");
            
            ///this.state.style = {padding :0, left : 0,top : 500,position:'absolute'};
            this.setState({
                top : this.state.top+this.state.inc
            })
            console.log("top %d",this.state.top);
        }
        if(event.key === '8'){
            console.log("ArrowUp");  
            this.setState({
                top : this.state.top-this.state.inc
            })
            console.log("top %d",this.state.top);
        }
        if(event.key === '4'){
            this.setState({
                left : this.state.left-this.state.inc
            })
            console.log("left %d",this.state.left)
        }
        if(event.key === '6'){
            this.setState({
                left : this.state.left+this.state.inc
            })
            console.log("left %d",this.state.left)
        }
        
    }

    

    render(){
        var myStyle = {left: this.state.left, top: this.state.top, position: 'absolute', visibility: this.state.isshown};
        return (
            <div id="hello"  onKeyPress={this.handleKeyPress} style={myStyle}>
                <div data-vjs-player >
                    <video ref = { node=> this.videoNode = node} className="video-js" ></video>
                </div>
            </div>
        );
    }
}

const videoJsOptions = {
    autoplay: true,
    controls: false,
    loop: true,
    width: 1280,
    height: 720,
    sources: [{
        src: `${forwardVideoSample}`,
        //src: `https://cdn.videvo.net/videvo_files/video/free/2012-07/small_watermarked/Countdown%20Timer_preview.webm`,
        type: 'video/mp4'
    }]
    
};


export default <Views {...videoJsOptions}/>;
// export default <Views/>;