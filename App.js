import socketClient  from "socket.io-client";
import './css/initial.min.css';
import './css/jquery-ui-slider-pips.css';
import './css/slick.css';
import React from 'react';
import imgSchool from './images/bg/한국기술교육대_로고.png';
import _1991Human from "./images/bg/1991 인문경영관.png";
import './css/style.css';
import Modal from './Modal';
const SEVER = '192.168.0.12:20000';

// const year_list = [1990, 1991, 1992, 1993, 1995, 1997, 1999, 2000, 2001, 2002, 2004,
//   2008, 2009, 2012, 2014, 2015, 2019];
// const year_interval = [0, 16, 33, 50, 68, 84, 102, 117, 134, 152, 170, 186, 204, 219, 237, 254, 289];
// const play_rate_list = [5.3, 5.6, 6.3, 5, 6, 5, 5.6, 6, 6, 5.3, 6, 5, 6, 5.6, 11.6];
// var id =0;
// var flag = 0;
// const time_interval = 17
var current_mode = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: 0,
            audioNumber: 0,
            play: false,
            pause: true,
            playState: 0
        }
        this.mainBody = React.createRef();
        this.imageRef = React.createRef();
        this.yearRef1 = React.createRef();
        this.yearRef2 = React.createRef();
        this.yearRef3 = React.createRef();
        this.yearRef4 = React.createRef();
        this.yearRef5 = React.createRef();
        this.yearRef6 = React.createRef();
        this.yearRef7 = React.createRef();
        this.yearRef8 = React.createRef();
        this.yearRef9 = React.createRef();
        this.yearRef10 = React.createRef();
        this.itemArray = [];
        this.galleryArray = [];
        this.innerwarp_build = React.createRef();
        this.gallery_build = React.createRef();
        this.btn_build = React.createRef();
        this.btn_gallery = React.createRef();
        this.fullTrigRef = React.createRef();
        this.playtimer = [];
        this.yeartimer = [];

        for (var i = 0; i < 6; i++) {
            this.itemArray[i] = React.createRef();
            this.galleryArray[i] = React.createRef();
        }
        this.socket = socketClient(SEVER);
        this.isDown = false;
        this.startX = 0
        this.scrollLeft = 0;
    }
    componentDidMount() {
        this
            .imageRef
            .current
            .addEventListener("mousedown", this.sliderMouseDown);
        this
            .imageRef
            .current
            .addEventListener("mouseleave", this.sliderMouseLeave);
        this
            .imageRef
            .current
            .addEventListener("mouseup", this.sliderMouseUp);
        this
            .imageRef
            .current
            .addEventListener("mousemove", this.sliderMouseMove);
        this
            .yearRef1
            .current
            .addEventListener("mousedown", this.year1MouseDown);
        this
            .yearRef2
            .current
            .addEventListener("mousedown", this.year2MouseDown);
        this
            .yearRef3
            .current
            .addEventListener("mousedown", this.year3MouseDown);
        this
            .yearRef4
            .current
            .addEventListener("mousedown", this.year4MouseDown);
        this
            .yearRef5
            .current
            .addEventListener("mousedown", this.year5MouseDown);
        this
            .yearRef6
            .current
            .addEventListener("mousedown", this.year6MouseDown);
        this
            .yearRef7
            .current
            .addEventListener("mousedown", this.year7MouseDown);
        this
            .yearRef10
            .current
            .addEventListener("mousedown", this.year10MouseDown);
            this.fullTrigRef.current.addEventListener("mousedown", this.fullScreen);
    }
    fullScreen = () => {
      if(!this.fullTrigRef.current.classList.contains('on'))
      {
        this.fullTrigRef.current.classList.add('on');
        if (this.mainBody.current.requestFullscreen) {
          console.log('1');
          this.mainBody.current.requestFullscreen();
        } else if (this.mainBody.current.mozRequestFullScreen) {
          console.log('2');
          this.mainBody.current.mozRequestFullScreen();
        } else if (this.mainBody.current.webkitRequestFullscreen) {
          console.log('3');
          this.mainBody.current.webkitRequestFullscreen();
        } else if (this.mainBody.current.msRequestFullscreen) {
          console.log('4');
          this.mainBody.current.msRequestFullscreen();
        }
      }
      else
      {
        this.fullTrigRef.current.classList.remove('on');
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
    //#region
    play = (intVar) => {
        this.setState({play: true, pause: false});
        console.log(`audio${intVar}`);
        if (this.audioNumber < 8 && this.audioNumber > 0) {
            document
                .getElementById(`audio${this.audioNumber}`)
                .pause();
            document
                .getElementById(`audio${this.audioNumber}`)
                .load();
        }
        document
            .getElementById(`audio${intVar}`)
            .play();
        this.audioNumber = intVar;
    }
    pause = () => {
        this.setState({play: false, pause: true});
        document
            .getElementById("audio")
            .pause();
    }
    year1MouseDown = () => {
      if(this.state.playState == 2)
      {
        this.openModal(999);
      }
      else
      {
        this.state.playState = 2;
        if (!this.yearRef1.current.classList.contains('on')) 
            this
                .yearRef1
                .current
                .classList
                .add('on');
        if (this.yearRef2.current.classList.contains('on')) 
            this
                .yearRef2
                .current
                .classList
                .remove('on');
        if (this.yearRef3.current.classList.contains('on')) 
            this
                .yearRef3
                .current
                .classList
                .remove('on');
        if (this.yearRef4.current.classList.contains('on')) 
            this
                .yearRef4
                .current
                .classList
                .remove('on');
        if (this.yearRef5.current.classList.contains('on')) 
            this
                .yearRef5
                .current
                .classList
                .remove('on');
        if (this.yearRef6.current.classList.contains('on')) 
            this
                .yearRef6
                .current
                .classList
                .remove('on');
        
        //this.play(1);
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'block';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'block';
            } else {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'none';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'none';
            }
        }
        if (this.state.playState > 0) {
            for (var i = 0; i < 16; i++) {
                clearTimeout(this.playtimer[i]);
            }
        }
        if(this.yearRef10.current.classList.contains('on'))
        {
          this.yearRef10.current.classList.remove('on');
        }
        this
            .socket
            .emit('year', 1990);
        setTimeout(() => {
            this
                .socket
                .emit('year', 1991)
        }, 3000);
        setTimeout(() => {
            this
                .socket
                .emit('year', 1992)
        }, 6000);
        setTimeout(() => {
            this
                .socket
                .emit('year', 1993)
        }, 9000);
        setTimeout(() => {
            this
                .socket
                .emit('year', 1995);
            this.state.playState = 0;
        }, 12000);
      }
        

    }
    year2MouseDown = () => {
      if (this.state.playState == 2) {this.openModal(999)} else {
        this.state.playState = 2;
    if (!this.yearRef2.current.classList.contains('on')) 
        this
            .yearRef2
            .current
            .classList
            .add('on');
    if (this.yearRef1.current.classList.contains('on')) 
        this
            .yearRef1
            .current
            .classList
            .remove('on');
    if (this.yearRef3.current.classList.contains('on')) 
        this
            .yearRef3
            .current
            .classList
            .remove('on');
    if (this.yearRef4.current.classList.contains('on')) 
        this
            .yearRef4
            .current
            .classList
            .remove('on');
    if (this.yearRef5.current.classList.contains('on')) 
        this
            .yearRef5
            .current
            .classList
            .remove('on');
    if (this.yearRef6.current.classList.contains('on')) 
        this
            .yearRef6
            .current
            .classList
            .remove('on');
    
    //this.play(2);
    for (var i = 0; i < 6; i++) {
        if (i === 1) {
            this
                .itemArray[i]
                .current
                .style
                .display = 'block';
            this
                .galleryArray[i]
                .current
                .style
                .display = 'block';
        } else {
            this
                .itemArray[i]
                .current
                .style
                .display = 'none';
            this
                .galleryArray[i]
                .current
                .style
                .display = 'none';
        }
    }
    if (this.state.playState > 0) {
        for (var i = 0; i < 16; i++) {
            clearTimeout(this.playtimer[i]);
        }

    }
    if(this.yearRef10.current.classList.contains('on'))
    {
      this.yearRef10.current.classList.remove('on');
    }
    this
        .socket
        .emit('year', 1997)
    setTimeout(() => {
        this
            .socket
            .emit('year', 1999)
    }, 3000);
    setTimeout(() => {
        this
            .socket
            .emit('year', 2000)
            this.state.playState=0;
    }, 6000);
}
        
    }
    year3MouseDown = () => {
        if(this.state.playState == 2)
        {
          this.openModal(999);
        }
        else
        {
          this.state.playState = 2;
          if (!this.yearRef3.current.classList.contains('on')) 
            this
                .yearRef3
                .current
                .classList
                .add('on');
        if (this.yearRef2.current.classList.contains('on')) 
            this
                .yearRef2
                .current
                .classList
                .remove('on');
        if (this.yearRef1.current.classList.contains('on')) 
            this
                .yearRef1
                .current
                .classList
                .remove('on');
        if (this.yearRef4.current.classList.contains('on')) 
            this
                .yearRef4
                .current
                .classList
                .remove('on');
        if (this.yearRef5.current.classList.contains('on')) 
            this
                .yearRef5
                .current
                .classList
                .remove('on');
        if (this.yearRef6.current.classList.contains('on')) 
            this
                .yearRef6
                .current
                .classList
                .remove('on');
        
        //this.play(3);
        for (var i = 0; i < 6; i++) {
            if (i == 2) {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'block';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'block';
            } else {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'none';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'none';
            }
        }
        if (this.state.playState > 0) {
            for (var i = 0; i < 16; i++) {
                clearTimeout(this.playtimer[i]);
            }

        }
        if(this.yearRef10.current.classList.contains('on'))
        {
          this.yearRef10.current.classList.remove('on');
        }
        this
            .socket
            .emit('year', 2001)
        setTimeout(() => {
            this
                .socket
                .emit('year', 2002)
        }, 3000);
        setTimeout(() => {
            this
                .socket
                .emit('year', 2004)
            this.state.playState = 0;
        }, 6000);
        }
        
    }
    year4MouseDown = () => {
      if(this.state.playState == 2)
      {
        this.openModal(999);
      }
      else
      {
        this.state.playState = 2
        if (!this.yearRef4.current.classList.contains('on')) 
            this
                .yearRef4
                .current
                .classList
                .add('on');
        if (this.yearRef2.current.classList.contains('on')) 
            this
                .yearRef2
                .current
                .classList
                .remove('on');
        if (this.yearRef3.current.classList.contains('on')) 
            this
                .yearRef3
                .current
                .classList
                .remove('on');
        if (this.yearRef1.current.classList.contains('on')) 
            this
                .yearRef1
                .current
                .classList
                .remove('on');
        if (this.yearRef5.current.classList.contains('on')) 
            this
                .yearRef5
                .current
                .classList
                .remove('on');
        if (this.yearRef6.current.classList.contains('on')) 
            this
                .yearRef6
                .current
                .classList
                .remove('on');
        
        //this.play(4);
        for (var i = 0; i < 6; i++) {
            if (i == 3) {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'block';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'block';
            } else {
                this
                    .itemArray[i]
                    .current
                    .style
                    .display = 'none';
                this
                    .galleryArray[i]
                    .current
                    .style
                    .display = 'none';
            }
        }
        if (this.state.playState > 0) {
            for (var i = 0; i < 16; i++) {
                clearTimeout(this.playtimer[i]);
            }

        }
        if(this.yearRef10.current.classList.contains('on'))
        {
          this.yearRef10.current.classList.remove('on');
        }
        this
            .socket
            .emit('year', 2008)
        setTimeout(() => {
            this
                .socket
                .emit('year', 2009)
            this.state.playState = 0;
        }, 3000);
      }
        
    }
    year5MouseDown = () => {
      console.log(this.state.playState);
        if (this.state.playState == 2) {this.openModal(999);} else {
          this.state.playState = 2;
            if (!this.yearRef5.current.classList.contains('on')) 
                this
                    .yearRef5
                    .current
                    .classList
                    .add('on');
            if (this.yearRef2.current.classList.contains('on')) 
                this
                    .yearRef2
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef3.current.classList.contains('on')) 
                this
                    .yearRef3
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef4.current.classList.contains('on')) 
                this
                    .yearRef4
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef1.current.classList.contains('on')) 
                this
                    .yearRef1
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef6.current.classList.contains('on')) 
                this
                    .yearRef6
                    .current
                    .classList
                    .remove('on');
            
            //this.play(5);
            for (var i = 0; i < 6; i++) {
                if (i == 4) {
                    this
                        .itemArray[i]
                        .current
                        .style
                        .display = 'block';
                    this
                        .galleryArray[i]
                        .current
                        .style
                        .display = 'block';
                } else {
                    this
                        .itemArray[i]
                        .current
                        .style
                        .display = 'none';
                    this
                        .galleryArray[i]
                        .current
                        .style
                        .display = 'none';
                }
            }
            if (this.state.playState > 0) {
                for (var i = 0; i < 16; i++) {
                    clearTimeout(this.playtimer[i]);
                }
            }
            if(this.yearRef10.current.classList.contains('on'))
            {
              this.yearRef10.current.classList.remove('on');
            }
            this
                .socket
                .emit('year', 2012)
            setTimeout(() => {
                this
                    .socket
                    .emit('year', 2014)
            }, 3000);
            setTimeout(() => {
                this
                    .socket
                    .emit('year', 2015)
                this.state.playState = 0;
            }, 6000);
        }

    }
    year6MouseDown = () => {
        if (this.state.playState == 2) {this.openModal(999)} else {
          this.state.playState = 2;
          console.log(this.state.playState);
            if (!this.yearRef6.current.classList.contains('on')) 
                this
                    .yearRef6
                    .current
                    .classList
                    .add('on');
            if (this.yearRef2.current.classList.contains('on')) 
                this
                    .yearRef2
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef3.current.classList.contains('on')) 
                this
                    .yearRef3
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef4.current.classList.contains('on')) 
                this
                    .yearRef4
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef5.current.classList.contains('on')) 
                this
                    .yearRef5
                    .current
                    .classList
                    .remove('on');
            if (this.yearRef1.current.classList.contains('on')) 
                this
                    .yearRef1
                    .current
                    .classList
                    .remove('on');
            
            //this.play(6);

            for (var i = 0; i < 6; i++) {
                if (i == 5) {
                    this
                        .itemArray[i]
                        .current
                        .style
                        .display = 'block';
                    this
                        .galleryArray[i]
                        .current
                        .style
                        .display = 'block';
                } else {
                    this
                        .itemArray[i]
                        .current
                        .style
                        .display = 'none';
                    this
                        .galleryArray[i]
                        .current
                        .style
                        .display = 'none';
                }
            }
            if (this.state.playState > 0) {
                for (var i = 0; i < 16; i++) {
                    clearTimeout(this.playtimer[i]);
                }

            }
            if(this.yearRef10.current.classList.contains('on'))
            {
              this.yearRef10.current.classList.remove('on');
            }
            this
                .socket
                .emit('year', 2019)
                setTimeout(() => {
                  this.state.playState = 0;
              }, 1000);
        }

    }
    year7MouseDown = () => {
      if (this.state.playState == 2) {
        this.openModal(999);
        return;
      }
      this.yearRef7.current.classList.add('on');
      setTimeout(() => {
        this.yearRef7.current.classList.remove('on');
      },300)
      for (var i = 0; i < 16; i++) 
      {
        clearTimeout(this.playtimer[i]);
      }
      if(this.yearRef10.current.classList.contains('on'))
      {
        this.yearRef10.current.classList.remove('on');
      }
      this.socket.emit('mode', "mode");
      this.socket.emit('init', 0);
      this.socket.emit('view', 578.5);
      this.socket.emit('end_position',578.5);
    }
    year8MouseDown = () => {
        if (this.yearRef9.current.classList.contains('on')) {
            this
                .yearRef9
                .current
                .classList
                .remove('on');

        }
        this
            .yearRef8
            .current
            .classList
            .add('on');
        this
            .socket
            .emit('year', "UP");
    }  
    year9MouseDown = () => {
        if (this.yearRef8.current.classList.contains('on')) {
            this
                .yearRef8
                .current
                .classList
                .remove('on');
        }
        this
            .yearRef9
            .current
            .classList
            .add('on');
        this
            .socket
            .emit('year', "Down");
    }
    year10MouseDown = () => {
        
        //#endregion playmode 동작
        if (this.state.playState == 1) {
            for (var i = 0; i < 16; i++) {
                clearTimeout(this.playtimer[i]);
            }

        }
        console.log(this.state.playState);
        if (this.state.playState == 2) {
            console.log(this.state.playState);
            this.openModal(999);
            return;
        }
        else{
          if (!this.yearRef10.current.classList.contains('on')) {
            this
                .yearRef10
                .current
                .classList
                .add('on');
          }
          this.state.playState = 1;
          this
              .socket
              .emit('year', 1990);
          this.playtimer[0] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1991)
          }, 3000);
          this.playtimer[1] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1992)
          }, 6000);
          this.playtimer[2] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1993)
          }, 9000);
          this.playtimer[3] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1995)
          }, 12000);
          this.playtimer[4] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1997)
          }, 15000);
          this.playtimer[5] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 1999)
          }, 18000);
          this.playtimer[6] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2000)
          }, 21000);
          this.playtimer[7] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2001)
          }, 24000);
          this.playtimer[8] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2002)
          }, 27000);
          this.playtimer[9] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2004)
          }, 30000);
          this.playtimer[10] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2008)
          }, 33000);
          this.playtimer[11] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2009)
          }, 36000);
          this.playtimer[12] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2012)
          }, 39000);
          this.playtimer[13] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2014)
          }, 42000);
          this.playtimer[14] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2015)
          }, 45000);
          this.playtimer[15] = setTimeout(() => {
              this
                  .socket
                  .emit('year', 2019);
              this.state.playState = 0;
          }, 48000);
        }
       
    }
    sliderMouseDown = event => {
        this.isDown = true;
        this
            .imageRef
            .current
            .classList
            .add("active");
        this.startX = event.offsetX - this.imageRef.current.offsetLeft;
        this.scrollLeft = this.imageRef.current.scrollLeft;
    }
    sliderMouseLeave = () => {
        this.isDown = false;
        this
            .imageRef
            .current
            .classList
            .remove("active");
    }
    sliderMouseUp = () => {
        this.isDown = false;
        this
            .imageRef
            .current
            .classList
            .remove("active");
    }
    sliderMouseMove = event => {
        if (!this.isDown) 
            return;
        const x = event.offsetX - this.imageRef.current.offsetLeft;
        const walk = (x - this.startX) * 3; //scroll-fast
        this.imageRef.current.scrollLeft = this.scrollLeft - walk;
        console.log(walk);
    }
    openModal = (intpara) => {
        this.setState({modalOpen: intpara});
        document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    }
    closeModal = () => {
        this.setState({modalOpen: 0});
        this
            .mainBody
            .current
            .classList
            .remove("not-scroll");
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    render() {

        this
            .socket
            .on('connect', () => {
                console.log("connected")
                this
                    .socket
                    .emit('message', "I'm client1.");
            });
        this
            .socket
            .on("hello", (arg) => {
                console.log(arg); // world
            });
      
  return (
    <div ref={this.mainBody}>
        <meta charSet="UTF-8" />
        <title>한국기술교육대학교</title>
        <meta name="description" content="DESCRIPTION" />
        <header id="header"><img src={imgSchool} alt="" /><div className="line" /></header>
        <div className="container" >
          <div className="content">
            <div className="button_group">
              <button type="button" className="build on" ref = {this.btn_build} onClick={() =>{this.innerwarp_build.current.style.display = 'block'; this.gallery_build.current.style.display = 'none'; this.btn_build.current.classList.add('on'); this.btn_gallery.current.classList.remove('on')}}>준공된 건물</button>
              <button type="button" className="gallery" ref = {this.btn_gallery} onClick={() =>{this.innerwarp_build.current.style.display = 'none'; this.gallery_build.current.style.display = 'block'; this.btn_gallery.current.classList.add('on'); this.btn_build.current.classList.remove('on')}}>갤러리</button>
            </div>
            <div className="inner_wrap build" ref={this.innerwarp_build}>
              <div className="inner_item1" ref = {this.itemArray[0]}>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={_1991Human} alt=""  onClick={() => this.openModal(1)}/></a><span className="title">인문경영관</span><span className="sub_title">1990.08.23</span></div>
                  <Modal open={this.state.modalOpen == 1} close={this.closeModal} nameTxt="인문경영관" dayTxt="1990.08.23" 
                  contentTxt="연면적 7,401.12㎡ 철근콘크리트조 4층으로 1991년도에 건립되었으며, 2000년 12월까지 대학본부 및 교학관으로 사용되어 오다가 대학본부의 완공으로 2001년부터 교학관으로 전용되었다. 산업경영학부와 교양학부, HRD학과에서 사용하고 있으며, 교학관 명칭을 사용목적과 내용에 부합하도록 2013년 9월 16일에 인문경영관으로 변경하여 사용하고 있다. 2021년 2월 1개층 증축 (연면적: 9,111.172㎡)및 리모델링하여 강의시설을 확충하고 교육환경을 개선하였다. 리모델링 후 기존 산업경영학부, 교양학부, HRD학과와 더불어 융합학과와 신설예정인 고용서비스정책학과가 사용할 예정이다."
                  imgURL={require('./images/bg2/1991 인문경영관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1991 해울관.png').default} alt=""  onClick={() => this.openModal(2)}/></a><span className="title">해울관</span><span className="sub_title">1991.04.05</span></div>
                  <Modal open={this.state.modalOpen == 2} close={this.closeModal} nameTxt="해울관" dayTxt="1991.04.05" 
                  contentTxt="생활관은 1992년 3월 개교 당시 해울관(A동) 360명의 수용시설로 출발 해울관(A동 360명 규모, 건축면적 1,163㎡, 연면적 4,444㎡, 지하 1층, 지상 4층, 1991년 신축)에 제1기 신입생 240명이 전원 입소하였고, 동년 4월 8일 생활관 관리규칙을 제정하고 이어 9월 16일에 생활관 관리 시행세칙을 제정하여 관내 질서를 유지하는 기틀을 마련하였다."
                  imgURL={require('./images/bg2/1991 해울관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1991 학생회관.jpg').default} alt=""  onClick={() => this.openModal(3)}/></a><span className="title">학생회관</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 3} close={this.closeModal} nameTxt="학생회관" dayTxt="1991.07.10" 
                  contentTxt="1991년에 학생회관(건축면적 3,898㎡, 연면적 8,351㎡으로 철근콘크리트조 지하 1층에 지상 3층)이 1차 준공되었다. 1994년도에 체육관이 준공되었다. 그 후 학생 수의 증가로 1998년에 학생회관의 증축이 있었다. 학생회관의 주요시설은 학생 편의시설(헬스장, 스쿼시장, 보건소, 휴게실, 우편취급소, 동아리실, 학보사, 방송국)과 구내식당(학생식당)이 있다. "
                  imgURL={require('./images/bg2/1991 학생회관.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1992 예지관.jpg').default} alt=""  onClick={() => this.openModal(4)}/></a><span className="title">예지관</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 4} close={this.closeModal} nameTxt="예지관" dayTxt="1991.09.28" 
                  contentTxt=" "
                  imgURL={require('./images/bg2/1992 예지관.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1993 공학 1관.jpg').default} alt=""  onClick={() => this.openModal(5)}/></a><span className="title">공학 1관 및 다리</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 5} close={this.closeModal} nameTxt="공학 1관 및 다리" dayTxt="1991.09.28" 
                  contentTxt="담헌실학관은 연면적 17,976,94,지하 1층 , 지상 9층 철근콘크리트+철골조 구조로 고용노동부늬 임대형민자사업(BTL)을 통하여 2012년 7월 준공되었다. 담헌실학관에는 다양한 행사진행이 가능한 담헌홀(1,200명 수용)이 있으며, 일학습병행대학,교육성과인증센터, 다담창의센터, 교양교육센터, 교수학습센터, 공학교육혁신센터, 평생교육처, 듀얼공동훈련센터, 대학혁신사업단 등이 위치해 있다. 이외에도 계단식 강의실, 세미나실, 전산실습실, 물리실험실 등의 시서을 갖추고 있다."
                  imgURL={require('./images/bg2/1993 공학 1관.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1995 함지관.jpg').default} alt=""  onClick={() => this.openModal(6)}/></a><span className="title">함지관</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 6} close={this.closeModal} nameTxt="함지관" dayTxt="1995.06.17" 
                  contentTxt=""
                  imgURL={require('./images/bg2/1995 함지관.jpg').default}></Modal>
                </div>
              </div>
              <div className="inner_item2" style={{display: 'none'}} ref = {this.itemArray[1]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1997 강당.png').default} alt=""  onClick={() => this.openModal(7)}/></a><span className="title">강당</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 7} close={this.closeModal} nameTxt="강당" dayTxt="1997.05.30" 
                  contentTxt="국제교육센터 후면에 위치한 강당은 연면적 790.35㎡으로 1997년 철근콘크리트 2층 구조로 완공되었으며, 관객석 520석 규모로써 각종 실내공연 및 강연이 가능하다."
                  imgURL={require('./images/bg2/1997 강당.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1997 국제교육센터.png').default} alt=""  onClick={() => this.openModal(8)}/></a><span className="title">국제교육센터</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 8} close={this.closeModal} nameTxt="국제교육센터" dayTxt="1997.04.16" 
                  contentTxt="연면적 4,328.73㎡ 철근콘크리트조(지하1층 지상3층 화강석 외장마감)의 도서관으로 1997년 준공되었으나, 2009년 신축 다산정보관 증축에 따라 2010년부터 국제교육센터로 리모델링하여 학생들의 어학능력향상 및 외국인학생들의 중심시설로 사용하고 있으며, 주요시설로는 글로벌라운지, 어학LAB실, 소그룹실, 교수실, 다목적강의실 등이 있다."
                  imgURL={require('./images/bg2/1997 국제교육센터.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1999 다솔관.png').default} alt=""  onClick={() => this.openModal(9)}/></a><span className="title">다솔관</span><span className="sub_title">1991.07.10</span></div>
                  <Modal open={this.state.modalOpen == 9} close={this.closeModal} nameTxt="다솔관" dayTxt="1999.05.01" 
                  contentTxt="다솔관은 1999년 준공되었으며, 연면적 1,967.06㎡, 지하 1층 지상 4층이다."
                  imgURL={require('./images/bg2/1999 다솔관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1999 소울관.png').default} alt=""  onClick={() => this.openModal(10)}/></a><span className="title">소울관</span><span className="sub_title">1999.09.10</span></div>
                  <Modal open={this.state.modalOpen == 10} close={this.closeModal} nameTxt="소울관" dayTxt="1999.09.10" 
                  contentTxt="소울관(연면적 5,711.05㎡, 지하1층 지상5층, 1998년)은 재직자 교육을 위한 기숙사로 능력개발교육원에서 사용하고 있다."
                  imgURL={require('./images/bg2/1999 소울관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2000 대학본부.png').default} alt=""  onClick={() => this.openModal(11)}/></a><span className="title">대학본부</span><span className="sub_title">2000.12.20</span></div>
                  <Modal open={this.state.modalOpen == 11} close={this.closeModal} nameTxt="대학본부" dayTxt="2000.12.20" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2000 대학본부.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2000 한울관.png').default} alt=""  onClick={() => this.openModal(12)}/></a><span className="title">한울관</span><span className="sub_title">2000.11.30</span></div>
                  <Modal open={this.state.modalOpen == 12} close={this.closeModal} nameTxt="한울관" dayTxt="2000.11.30" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2000 한울관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1999 공학2관.png').default} alt=""  onClick={() => this.openModal(13)}/></a><span className="title">공학 2관</span><span className="sub_title">1999.07.29</span></div>
                  <Modal open={this.state.modalOpen == 13} close={this.closeModal} nameTxt="공학 2관" dayTxt="1999.07.29" 
                  contentTxt="공학 2관은 연면적 12,697.94㎡ 철근콘크리트조 4층 구조로 1998년 건립되었으며 2017년 11월 1개층 증축 및 리모델링하여 실험실, 강의실 등을 확충하고 교육환경을 개선하여 현재는 컴퓨터공학부, 디자인·건축공학부에서 사용하고 있다."
                  imgURL={require('./images/bg2/1999 공학2관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2000 공학3관.png').default} alt=""  onClick={() => this.openModal(14)}/></a><span className="title">공학 3관</span><span className="sub_title">2000.02.29</span></div>
                  <Modal open={this.state.modalOpen == 14} close={this.closeModal} nameTxt="공학 3관" dayTxt="2000.02.29" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2000 공학3관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1999 공학4관.png').default} alt=""  onClick={() => this.openModal(15)}/></a><span className="title">공학 4관</span><span className="sub_title">1999.11.30</span></div>
                  <Modal open={this.state.modalOpen == 15} close={this.closeModal} nameTxt="공학 4관" dayTxt="1999.11.30" 
                  contentTxt=""
                  imgURL={require('./images/bg2/1999 공학4관.png').default}></Modal>
                </div>
              </div>
              <div className="inner_item3" style={{display: 'none'}} ref={this.itemArray[2]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2001_복지관 준공 기념식.jpg').default} alt=""  onClick={() => this.openModal(16)}/></a><span className="title">복지관</span><span className="sub_title">2001.10.08</span></div>
                  <Modal open={this.state.modalOpen == 16} close={this.closeModal} nameTxt="복지관" dayTxt="2001.10.08" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2001_복지관 준공 기념식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2002 창업보육관.png').default} alt=""  onClick={() => this.openModal(17)}/></a><span className="title">창업보육관</span><span className="sub_title">2002.10.27</span></div>
                  <Modal open={this.state.modalOpen == 17} close={this.closeModal} nameTxt="창업보육관" dayTxt="2002.10.27" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2002 창업보육관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2004 캠퍼스컴퍼니.png').default} alt=""  onClick={() => this.openModal(18)}/></a><span className="title">캠퍼스컴퍼니</span><span className="sub_title">2004.08.14</span></div>
                  <Modal open={this.state.modalOpen == 18} close={this.closeModal} nameTxt="캠퍼스컴퍼니" dayTxt="2004.08.14" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2004 캠퍼스컴퍼니.png').default}></Modal>
                </div>
                </div>
              <div className="inner_item4" style={{display: 'none'}} ref={this.itemArray[3]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2008 청솔관.png').default} alt=""  onClick={() => this.openModal(19)}/></a><span className="title">청솔관</span><span className="sub_title">2008.02.11</span></div>
                  <Modal open={this.state.modalOpen == 19} close={this.closeModal} nameTxt="청솔관" dayTxt="2008.02.11" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2008 청솔관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2008 IH관.png').default} alt=""  onClick={() => this.openModal(20)}/></a><span className="title">IH관</span><span className="sub_title">2008.02.20</span></div>
                  <Modal open={this.state.modalOpen == 20} close={this.closeModal} nameTxt="IH관" dayTxt="2008.02.20" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2008 IH관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2008 참빛관.png').default} alt=""  onClick={() => this.openModal(21)}/></a><span className="title">참빛관</span><span className="sub_title">2008.06.18</span></div>
                  <Modal open={this.state.modalOpen == 21} close={this.closeModal} nameTxt="참빛관" dayTxt="2008.06.18" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2008 참빛관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2009 다산정보관.png').default} alt=""  onClick={() => this.openModal(22)}/></a><span className="title">다산정보관</span><span className="sub_title">2009.08.26</span></div>
                  <Modal open={this.state.modalOpen == 22} close={this.closeModal} nameTxt="다산정보관" dayTxt="2009.08.26" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2009 다산정보관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2009 새롬관.png').default} alt=""  onClick={() => this.openModal(23)}/></a><span className="title">새롬관</span><span className="sub_title">2009.08.23</span></div>
                  <Modal open={this.state.modalOpen == 23} close={this.closeModal} nameTxt="새롬관" dayTxt="2009.08.23" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2009 새롬관.png').default}></Modal>
                </div>
              </div>
              <div className="inner_item5" style={{display: 'none'}} ref={this.itemArray[4]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2012 나래돔.png').default} alt=""  onClick={() => this.openModal(24)}/></a><span className="title">나래돔</span><span className="sub_title">2012.09.14</span></div>
                  <Modal open={this.state.modalOpen == 24} close={this.closeModal} nameTxt="나래돔" dayTxt="2012.09.14" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2012 나래돔.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2012 예솔관.png').default} alt=""  onClick={() => this.openModal(25)}/></a><span className="title">예솔관</span><span className="sub_title">2012.09.14</span></div>
                  <Modal open={this.state.modalOpen == 25} close={this.closeModal} nameTxt="예솔관" dayTxt="2012.07.27" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2012 예솔관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2014 은솔관.png').default} alt=""  onClick={() => this.openModal(26)}/></a><span className="title">은솔관</span><span className="sub_title">2014.02.26</span></div>
                  <Modal open={this.state.modalOpen == 26} close={this.closeModal} nameTxt="은솔관" dayTxt="2014.02.26" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2014 은솔관.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2014 체육관.jpg').default} alt=""  onClick={() => this.openModal(27)}/></a><span className="title">체육관</span><span className="sub_title">2014.02.26</span></div>
                  <Modal open={this.state.modalOpen == 27} close={this.closeModal} nameTxt="체육관" dayTxt="2014.02.19" 
                  contentTxt=""
                  imgURL={require('./images/bg/2014 체육관.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2015 산학협력관.png').default} alt=""  onClick={() => this.openModal(28)}/></a><span className="title">산학협력단</span><span className="sub_title">2014.02.26</span></div>
                  <Modal open={this.state.modalOpen == 28} close={this.closeModal} nameTxt="산학협력단" dayTxt="2015.08.11" 
                  contentTxt=""
                  imgURL={require('./images/bg2/2015 산학협력관.png').default}></Modal>
                </div>                
              </div>
              <div className="inner_item6" style={{display: 'none'}} ref={this.itemArray[5]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2019 스마트팩토리.jpg').default} alt=""  onClick={() => this.openModal(29)}/></a><span className="title">K-Factory</span><span className="sub_title">2019.03.21</span></div>
                  <Modal open={this.state.modalOpen == 29} close={this.closeModal} nameTxt="K-Factory" dayTxt="2019.03.21" 
                  contentTxt="스마트팩토리는 연면적 976.65m, 1층 철골조 구조로 2019년 3월에 준공되었다. 4차 산업혁명 관련 이론과 기술을 실습에 적용하고, 실제 현장에 대처하는 능력을 향상 시킬 수 있는 실무중심의 선도적 인재양성의 장 구축 및 제조업 분야에서 국가 혁신 성장을 뒷받침하기 위해 IOT 등 융합능력을 보유한 고숙련 엔지니어 교육을 위한 인프라 조성을 위해 구축되었다. 주요 시설로는 FMS(유연생산시스템) 등으로 구성된 생산라인(Smart Factory)과 요소기술을 학습할 수 있는 모듈 실습공간(Learning Factory)으로 구성되었으며, Production Line, Labs(ICT,FMS), 개발실, 서버,자제실 등이 마련되어 있다."
                  imgURL={require('./images/bg/2019 스마트팩토리.jpg').default}></Modal>
                </div>
                </div>
            </div>
            <div className="inner_wrap gallery" style={{display: 'none'}} ref ={this.gallery_build}>
              <div className="inner_item1" ref ={this.galleryArray[0]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1990 대학 부지 조성.jpg').default} alt=""  onClick={() => this.openModal(30)}/></a><span className="title">대학 부지 조성</span><span className="sub_title">2019.03.21</span></div>
                  <Modal open={this.state.modalOpen == 30} close={this.closeModal} nameTxt="대학 부지 조성" dayTxt="1990.08.23" 
                  contentTxt="1988년 가을, 제144차 정 기국회에서 창원시에는 창원기능대학, 한백창원직업훈련원 등 기존의 직업능력훈련 시설이 이미 설치되어 있으므로, 한국직업훈련대학은 중부권에 설립하는 것이 좋겠다는 의견이 제시되었다. 또한 그해 회계 연도 정부 예산 심의 당시 (가칭) 한국직업훈련 대학에 대한 설립투자를 검토하는 과정에서 건축 소요면적이 대폭 감축되어, 대학부지가 7만 평으로 줄었고, 교육 시설 인 건물 면적도 본래의 절반가량인 12,677평으로 조정되었다. 결국 1989년 4월 21일, 대학의 설립 위치는 현재 우리 대학교의 위치인 충남 천원군 병천면 가전리 307번지로 변경되었다."
                  imgURL={require('./images/bg2/1990 대학 부지 조성.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1991 운동장.jpg').default} alt=""  onClick={() => this.openModal(31)}/></a><span className="title">운동장</span><span className="sub_title">1991.09.28</span></div>
                  <Modal open={this.state.modalOpen == 31} close={this.closeModal} nameTxt="운동장" dayTxt="1991.09.28" 
                  contentTxt="운동장은 1999년 13,785㎡ 규모로 농구 코드 2면과 배구 코드 1면, 축구 코드 1면으로 처음 조성되었다. 2009년에 FIFA 규격의 인조잔디구장 1면, 4라인의 400M 트랙 및 100M 트랙, 농구장 2면, 배구장 1면, 족구장 1면의 우레탄 경기장 시설과 함께 1,200여 석의 관람석, 야간조명 시설 및 본부석 등의 시설을 갖추고 재조성되면서 면적이 18,219㎡로 확대되었다."
                  imgURL={require('./images/bg2/1991 운동장.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1991 제1회 신입생 선발.jpg').default} alt=""  onClick={() => this.openModal(32)}/></a><span className="title">제1회 신입생 선발</span><span className="sub_title">1991.12.28</span></div>
                  <Modal open={this.state.modalOpen == 32} close={this.closeModal} nameTxt="제1회 신입생 선발" dayTxt="1991.12.28" 
                  contentTxt="1992년 입시지원을 위해 교학관(현 인문경영관) 건물 앞 지원자들의 모습이다. 당시 총 8개 학과 240명 입학정원으로, 지원자는 5,745명으로 24 대 1의 높은 경쟁률을 보였다."
                  imgURL={require('./images/bg2/1991 제1회 신입생 선발.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1992 개교식.jpg').default} alt=""  onClick={() => this.openModal(33)}/></a><span className="title">개교식</span><span className="sub_title">1992.03.02</span></div>
                  <Modal open={this.state.modalOpen == 33} close={this.closeModal} nameTxt="개교식" dayTxt="1992.03.02" 
                  contentTxt="1992년 3월 3일 충청남도 천안군 병천면 가전리 산 37-1번지에 위치한 우리 대학의 대운동장에서 개교 및 첫 입학식이 열렸다. 노동부 장관과 교육계 인사, 학교법인 임원 및 학부형 등 300명가량의 내외 귀빈이 참석한 가운데 신입생 240명은 면학 의지를 다졌다."
                  imgURL={require('./images/bg2/1992 개교식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1992 92년 식목일.jpg').default} alt=""  onClick={() => this.openModal(34)}/></a><span className="title">92년 식목일</span><span className="sub_title">1992.04.03</span></div>
                  <Modal open={this.state.modalOpen == 34} close={this.closeModal} nameTxt="92년 식목일" dayTxt="1992.04.03" 
                  contentTxt="92년도 식목일을 맞아 교직원들이 국기 게양대 주변 나무 심기 작업을 하는 모습이다."
                  imgURL={require('./images/bg2/1992 92년 식목일.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1992 학장배 테니스대회 및 테니스장 개장.jpg').default} alt=""  onClick={() => this.openModal(35)}/></a><span className="title">학장배 테니스장 개장</span><span className="sub_title">1992.11.25</span></div>
                  <Modal open={this.state.modalOpen == 35} close={this.closeModal} nameTxt="학장배 테니스장 개장" dayTxt="1992.11.25" 
                  contentTxt="교수의 친목단체 및 동아리 활동으로는 상조회, 교수협의회, 한기대 골프회(기골회), 테니스회 등이 있다. 제1캠퍼스 테니스장은 3,200㎡의 면적에 코트 4면과 연습장 1면을 갖추고 있고, 제2캠퍼스 테니스장은 960㎡의 면적에 코트 2면이 설치되어 있다."
                  imgURL={require('./images/bg2/1992 학장배 테니스대회 및 테니스장 개장.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1995 대학진입로.jpg').default} alt=""  onClick={() => this.openModal(36)}/></a><span className="title">대학진입로</span><span className="sub_title">1995.05.16</span></div>
                  <Modal open={this.state.modalOpen == 36} close={this.closeModal} nameTxt="대학진입로" dayTxt="1995.05.16" 
                  contentTxt="95년도 당시 대학 진입로이다."
                  imgURL={require('./images/bg2/1995 대학진입로.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1995 한국기술교육대학교로 교명 변경.jpg').default} alt=""  onClick={() => this.openModal(37)}/></a><span className="title">한국기술교육대학교로 교명 변경</span><span className="sub_title">1995.09.01</span></div>
                  <Modal open={this.state.modalOpen == 37} close={this.closeModal} nameTxt="한국기술교육대학교로 교명 변경" dayTxt="1995.09.01" 
                  contentTxt="1995년 9월 1일 한국기술교육대학교로 교명을 변경하고 정문 현판식을 가졌다."
                  imgURL={require('./images/bg2/1995 한국기술교육대학교로 교명 변경.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1995 정문 현판식.jpg').default} alt=""  onClick={() => this.openModal(38)}/></a><span className="title">정문 현판식</span><span className="sub_title">1995.09.01</span></div>
                  <Modal open={this.state.modalOpen == 38} close={this.closeModal} nameTxt="정문 현판식" dayTxt="1995.09.01" 
                  contentTxt="1991년 11월 2일 국가 산업발전에 필요한‘직업능력 개발 훈련교사 양성’을 목적으로 설립된 우리 대학은 그동안 학사 6,109명, 석사 1,018명, 박사 37명 등 모두 7,164명의 졸업생을 배출했다."
                  imgURL={require('./images/bg2/1995 정문 현판식.jpg').default}></Modal>
                </div>
              </div>
              <div className="inner_item2" style={{display: 'none'}} ref ={this.galleryArray[1]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/노동부차관방문_1996.jpg').default} alt=""  onClick={() => this.openModal(39)}/></a><span className="title">노동부 차관 방문</span><span className="sub_title">1996.03.04</span></div>
                  <Modal open={this.state.modalOpen == 39} close={this.closeModal} nameTxt="노동부 차관 방문" dayTxt="1996.03.04" 
                  contentTxt="우리 대학교의 설립 주체는 정부였다. 정부의 노동 행정을 관할하는 노동부(현 고용노동부)가 우리 대학교의 설립을 추진하게 된 법률적 근거는 직업훈련 기본법이었다. 이 법은 근로자의 직업능력 개발 및 향상을 위해 직업훈련을 강조한다. 즉, 국민의 삶의 질을 향상시키고자 한 정책 의지가 한국기술교육대학교를 낳은 것이다."
                  imgURL={require('./images/bg2/노동부차관방문_1996.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/1998 97학년도 전기 학위 수여식_1998.jpg').default} alt=""  onClick={() => this.openModal(40)}/></a><span className="title">97학년도 전기 학위 수여식</span><span className="sub_title">1998.02.20</span></div>
                  <Modal open={this.state.modalOpen == 40} close={this.closeModal} nameTxt="97학년도 전기 학위 수여식" dayTxt="1998.02.20" 
                  contentTxt="1998년 2월 20일 '97학년도 전기 학위 수여식이 열렸다."
                  imgURL={require('./images/bg/1998 97학년도 전기 학위 수여식_1998.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/연구_교육협력 협약식_1998.jpg').default} alt=""  onClick={() => this.openModal(41)}/></a><span className="title">한국기계연구원 협력 협약식</span><span className="sub_title">1998.04.28</span></div>
                  <Modal open={this.state.modalOpen == 41} close={this.closeModal} nameTxt="한국기계연구원 협력 협약식" dayTxt="1998.04.28" 
                  contentTxt="한국기술교육대학교 20년사》를 간행하겠다는 계획을 세우고 일을 진행한 지도 어언 1년 이 다 되어 간다. 건학과 교육이념과 지난 20년을 응축하여 보여주는 통사를 다루고, 다음으로는 교육, 연구, 산학협력 그리고 학생에 대한 장을 배치했다. 마지막으로는 행정지원과 부속기관을 기술하는 방식을 선택했다."
                  imgURL={require('./images/bg2/연구_교육협력 협약식_1998.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/한국생산기술연구소학연협정체결_1999.jpg').default} alt=""  onClick={() => this.openModal(42)}/></a><span className="title">의학연협력조인식</span><span className="sub_title">1999.02.10</span></div>
                  <Modal open={this.state.modalOpen == 42} close={this.closeModal} nameTxt="한국 생산기술 연구원 의.학.연 협력 협약 조인식" dayTxt="1999.02.10" 
                  contentTxt="직업훈련 대상자들은 학력 수준이 고등학교 이상으로 높아졌다. 산업체의 생산기술도 고도화되었고, 산업체 근로자 연구 교육협력 협약식의 재훈련 및 향상훈련의 수요도 증대하여 직업훈련 여건이 전반적으로 변화되었다. 따라서 새로운 지도기법으로 이론과 실기를 지도할 능력을 겸비한 우수교사의 양성이 시급히 요구되었다. 그리하여 1974년 3월, 국립중앙직업훈련원은 2년 과정의 고급 직업능력개발훈련교사 개발과정을 신설하고, 그 대상을 2년제 직업능력개발훈련교사 양성과정 이수자와 전문대학 졸업자로 정하였다. 그럼에도 불구하고 그 성과는 만족스럽지 못한 점이 있었다."
                  imgURL={require('./images/bg2/한국생산기술연구소학연협정체결_1999.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2000 기술과학지원연구소학연협정체결_2000.jpg').default} alt=""  onClick={() => this.openModal(43)}/></a><span className="title">기술과학지원연구학연협정체결</span><span className="sub_title">2000.03.29</span></div>
                  <Modal open={this.state.modalOpen == 43} close={this.closeModal} nameTxt="기술과학지원연구학연협정체결" dayTxt="2000.03.29" 
                  contentTxt="한국기술교육대학교는 “실사구시”를 교육이념으로 삼고, 산업사회가 원하는 실무 중심의 실천공학적 인재를 양성하는 데 박차를 가해 온 과정은 KUT 기술교육 모델의 심화 발전에 그대로 나타나 있다. 본교는 독자적인 교육모델을 개발함에 있어 공학 분야는 물론, 산업현장의 기술과 접목된 산업경영 분야의 인재육성에도 많은 성과를 냈다. 이는 우리 대학이 구축한 우수한 교육환경에 힘입은 바가 크다."
                  imgURL={require('./images/bg/2000 기술과학지원연구소학연협정체결_2000.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/인터넷 기술 교육을 위한 전략적 제휴 조인식_2021.jpg').default} alt=""  onClick={() => this.openModal(44)}/></a><span className="title">인터넷 기술 교육 제휴 조인식</span><span className="sub_title">2000.04.08</span></div>
                  <Modal open={this.state.modalOpen == 44} close={this.closeModal} nameTxt="인터넷 기술 교육을 위한 전략적 제휴 조인식" dayTxt="2000.04.08" 
                  contentTxt="(주)터보테크와의 인터넷 기술 교육을 위한 전략적 제휴 조인식이 진행되었다."
                  imgURL={require('./images/bg/인터넷 기술 교육을 위한 전략적 제휴 조인식_2021.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/중소기업청 기술지도대학 선정증서 수여식_2000.jpg').default} alt=""  onClick={() => this.openModal(45)}/></a><span className="title">기술지도대학 선정증서 수여식</span><span className="sub_title">2000.04.08</span></div>
                  <Modal open={this.state.modalOpen == 45} close={this.closeModal} nameTxt="중소기업청 기술지도대학 선정증서 수여식" dayTxt="2000.04.27" 
                  contentTxt="산학협력체제도 한 단계 진보했다. 2003년 11월에는 기왕의 산학협동센터를 확대 개편해 산학협력단을 열었다. 이 기관은 이후 산학연의 협동과 국책과제의 수행 및 대중소 기업 교육의 허브 역할을 함으로써 우리 대학을 한 단계 도약시키는 중요한 역할을 담당하였다."
                  imgURL={require('./images/bg/중소기업청 기술지도대학 선정증서 수여식_2000.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/능력개발교육원과삼성전자 생산기술센터 산학협동 약정서 체결_2000.jpg').default} alt=""  onClick={() => this.openModal(46)}/></a><span className="title">삼성전자 산학협동 체결</span><span className="sub_title">2000.05.24</span></div>
                  <Modal open={this.state.modalOpen == 46} close={this.closeModal} nameTxt="능력개발교육원과삼성전자 생산기술센터 산학협동 약정서 체결" dayTxt="2000.05.24" 
                  contentTxt="한국기술교육대학교의 설립은 그 자체가 한국현대사의 귀중한 결실이었다. 1960년대부터 휩쓸기 시작한 산업화 열기는 마침내 한반도 역사에서 최초의 공업 국가를 탄생시켰으며, 이것은 보다 성숙한 시민사회 건설의 열망으로 이어졌다. 이는 필연적으로 산업 기능면에서 질적으로 우수한 산업노동력에 대한 요구로 나타났다. 이와 같은 시대적 바람 속에서 우리 대학은 고도로 훈련된 최상의 직업훈련교사(현 직업능력개발훈련교사)를 양성하는 요람으로 오랜 준비 끝에 첫발을 내디뎠다. 1992년 봄의 일이었다."
                  imgURL={require('./images/bg/능력개발교육원과삼성전자 생산기술센터 산학협동 약정서 체결_2000.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2001년_복지관 준공기념식.png').default} alt=""  onClick={() => this.openModal(47)}/></a><span className="title">담헌실학관 개관</span><span className="sub_title">2001.08.09</span></div>
                  <Modal open={this.state.modalOpen == 47} close={this.closeModal} nameTxt="담헌실학관 개관" dayTxt="2001.08.09" 
                  contentTxt="담헌실학관은 연면적 17,976,94,지하 1층 , 지상 9층 철근콘크리트+철골조 구조로 고용노동부늬 임대형민자사업(BTL)을 통하여 2012년 7월 준공되었다. 담헌실학관에는 다양한 행사진행이 가능한 담헌홀(1,200명 수용)이 있으며, 일학습병행대학,교육성과인증센터, 다담창의센터, 교양교육센터, 교수학습센터, 공학교육혁신센터, 평생교육처, 듀얼공동훈련센터, 대학혁신사업단 등이 위치해 있다. 이외에도 계단식 강의실, 세미나실, 전산실습실, 물리실험실 등의 시서을 갖추고 있다."
                  imgURL={require('./images/bg/2001년_복지관 준공기념식.png').default}></Modal>
                </div>
              </div>
              <div className="inner_item3" style={{display: 'none'}} ref={this.galleryArray[2]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2001_창업보육센터 입주업체 대학 발전기금 기증 약정 조인식.jpg').default} alt=""  onClick={() => this.openModal(48)}/></a><span className="title">창업보육센터 발전기금 약정</span><span className="sub_title">2001.02.20</span></div>
                  <Modal open={this.state.modalOpen == 48} close={this.closeModal} nameTxt="창업보육센터 입주업체 대학 발전기금 기증 약정 조인식" dayTxt="2001.02.20" 
                  contentTxt="창업보육센터는 사업화 역량을 갖춘 예비창업인을 발굴하고 각종 교육 및 기술자문, 컨설팅을 통해 창업을 꿈꾸는 예비창업인들에게 부족한 경영능력과 자원을 지원하여 창업을 활성화하고 성공할 수 있도록 돕기 위한 목적으로 운영되고 있다. 창업보육센터는 중소기업청, 충청남도(충남TP), 천안시로부터 지원을 받고 있다. 창업보육센터는 1999년 08월 중소기업청의 지정으로 제1캠퍼스에 개소하였다. 2000년 충남창업보육센터협의회에서 주관하는“충남 창업박람회”를 개최하였으며 창업아이디어 공모전을 개최하는 등 활발한 지원활동을 벌였다. 그 결과, 2001년과 2002년에 걸쳐 2년 연속 중소기업청에서 실시하는“창업보육센터 운영평가”에서“A등급”으로 지정되었으며, 2003년에는 중소기업청 BI 확장사업과 창업지원 우수대학으로 선정되었다."
                  imgURL={require('./images/bg2/2001_창업보육센터 입주업체 대학 발전기금 기증 약정 조인식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2001년_복지관 준공기념식.png').default} alt=""  onClick={() => this.openModal(49)}/></a><span className="title">복지관 준공기념식</span><span className="sub_title">2001.10.24</span></div>
                  <Modal open={this.state.modalOpen == 49} close={this.closeModal} nameTxt="창업보육센터 입주업체 대학 발전기금 기증 약정 조인식" dayTxt="2001.10.24" 
                  contentTxt="2001년 10월 학생들의 복지증진을 위하여 학생종합복지관(건축면적 1,266㎡, 연면적 3,597㎡, 철근콘크리트조 지하 1층에 지상 3층)이 준공되었으며, 주요시설로는 학생종합지원센터, 학생지원팀, 취업지원팀, 보건소, 취업클리닉센터 및 서점, 매점, 커피전문점, 패스트푸드점, 교직원식당, 미용실, 상담진로개발센터, 그리고 소규모 강연 및 공연을 위한 소극장 등이 있다. 학생회관과 복지관에 있는 학생 편의시설 등은 대부분 우리 대학 구성원의 협동조합인 생활협동조합에서 직영 또는 임대로 운영하고 있다."
                  imgURL={require('./images/bg/2001년_복지관 준공기념식.png').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2002_제 4대 문형남 총장 취임식.jpg').default} alt=""  onClick={() => this.openModal(50)}/></a><span className="title">제4대 문형남 총장 취임식</span><span className="sub_title">2002.03.21</span></div>
                  <Modal open={this.state.modalOpen == 50} close={this.closeModal} nameTxt="제4대 문형남 총장 취임식" dayTxt="2001.10.24" 
                  contentTxt="우리 대학의 교육목표는 약간의 변화를 겪게 되었다. 종래와 같이 창조적인 실천기술을 겸비한 직업능력개발훈련교사와 인력개발담당자의 양성은 여전히 중요한 과제였으나, 새로 고도지식산업사회가 요구하는 실천공학기술자의 양성이란 목표가 추가되었다. 실천공학기술자란 학습지도능력을 갖춘 엔지니어로서, 기술자, 관리감독자, 기술연구개발자로서 기업 내에서 임무를 수행하는 것이다. 이러한 실천공학기술자의 양성이 중요 목표로 등장한 것은 우리 대학이 변화하는 시대 상황에 부응하는 내실 있는 교육을 꾀한 결과로 이해된다."
                  imgURL={require('./images/bg/2002_제 4대 문형남 총장 취임식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2003_테크노 HRD 연구소 개소식.jpg').default} alt=""  onClick={() => this.openModal(51)}/></a><span className="title">테크노 HRD 연구소 개소식</span><span className="sub_title">2003.03.04</span></div>
                  <Modal open={this.state.modalOpen == 51} close={this.closeModal} nameTxt="테크노 HRD 연구소 개소식" dayTxt="2003.03.04" 
                  contentTxt="2003년, 그동안 일반대학원 인문사회계열에 소속되어 있던 인력개발학과가 폐지되고, 그 대신 산업경영학과가 신설되었다. 이와 더불어 직업능력개발원, 노동연구원, 자동차부품연구원과의 학-연 협동과정과 공학-디자인 협동과정이 설치되었다. 뿐만 아니라 대학원에 전문대학원인 테크노인력개발대학원(석사과정 30명 정원)과 특수대학원인 산업대학원(석사과정 정원30명)이 추가로 신설되었다. 테크노인력개발전문대학원에는 일반대학원에 두었던 인력개발학과가 이전 설치되었고, 산업대학원에는 산업기술공학과와 산업경영학과가 가동되기 시작했다. 요컨대, 3개 대학원(석사과정 10개 학과)의 체제가 성립된 것이다."
                  imgURL={require('./images/bg/2003_테크노 HRD 연구소 개소식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2004_제10회 졸업연구작품전시회.jpg').default} alt=""  onClick={() => this.openModal(52)}/></a><span className="title">제10회 졸업연구작품전시회</span><span className="sub_title">2004.09.16</span></div>
                  <Modal open={this.state.modalOpen == 52} close={this.closeModal} nameTxt="제10회 졸업연구작품전시회" dayTxt="2004.09.16" 
                  contentTxt="2003년부터는 “Unlimited Challenge(無限挑戰) KUT 2003”의 일환으로 제9회 졸업작품전을 개최했다. 그 해 10월 28일~29일 양일 간에 총 148개(기계 13, 메카13, 제어시스템 12, 정보기술48, 디자인 16, 건축 19, 신소재 13, 응용화학 14)의 졸업작품을 발표하였다. 2004년에는 “Unlimited Challenge(無限挑戰) KUT 2004”란 이름 아래 9월16일~17일에 제10회 졸업작품전을 개최하였고, 2005년에는“Unlimited Challenge(無限挑戰) KUT 2005”란 이름으로 제11회 졸업작품전을 개최하였다."
                  imgURL={require('./images/bg/2004_제10회 졸업연구작품전시회.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/한국기술교육대학교.한국지역사회교육협의회 교류협력사업추진 협정체결.jpg').default} alt=""  onClick={() => this.openModal(53)}/></a><span className="title">교류협력사업추진 협정체결</span><span className="sub_title">2004.11.04</span></div>
                  <Modal open={this.state.modalOpen == 53} close={this.closeModal} nameTxt="한국기술교육대학교.한국지역사회교육협의회 교류협력사업추진 협정체결" dayTxt="2004.11.04" 
                  contentTxt="우리 대학과 한국지역사회교육협의회가 상호 관심사항에 대한 협력을 강화하며, 양 기관의 경쟁력 확보를 위한 협력기반을 조성하고 상호협력을 통해 지역사회 발전과 대학발전에 기여하기 위하여 2004. 11. 4(목) 12:00에 대학 중회의실에서 교류협력사업추진 협정식을 가졌다."
                  imgURL={require('./images/bg/한국기술교육대학교.한국지역사회교육협의회 교류협력사업추진 협정체결.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2004_2004 전국 e-Learning match Point 한기대 우수대학 선정.jpg').default} alt=""  onClick={() => this.openModal(54)}/></a><span className="title">e-Learning match Point</span><span className="sub_title">2005.02.25</span></div>
                  <Modal open={this.state.modalOpen == 54} close={this.closeModal} nameTxt="2004 전국 e-Learning match Point 한기대 우수대학 선정" dayTxt="2005.02.25" 
                  contentTxt="우리 대학 졸업생들은 4년간의 교육과정을 이수하고, 공학사 학위 및 직업능력개발훈련교사  자격을 취득해 교사 및 산업체의 설계 및 개발담당 엔지니어 등으로 취업한 경우가 많다. 그들 졸업생의 재교육 및 능력향상을 돕기 위해 우리 대학 부설 기술교육 전문연수기관인 능력개발교육원에서는 이러닝(E-learning) 등을 통해 졸업생 리콜제를 운영한다. 이를 통해 졸업생들이 현업에서 겪고 있는 기술애로를 해결한다."
                  imgURL={require('./images/bg/2004_2004 전국 e-Learning match Point 한기대 우수대학 선정.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2005_취업클리닉센터 개소.jpg').default} alt=""  onClick={() => this.openModal(55)}/></a><span className="title">취업클리닉센터 개소</span><span className="sub_title">2005.02.25</span></div>
                  <Modal open={this.state.modalOpen == 55} close={this.closeModal} nameTxt="취업클리닉센터 개소" dayTxt="2005.02.25" 
                  contentTxt="급변하는 채용시장의 변화에 발맞춰 우리 대학은 전국 대학 최초로“취업클리닉센터”를 설립하여 운영하고 있다. 외부전문가를 초청해 취업특강, 취업커뮤니티, 입사서류 1:1 클리닉, 모의면접 등 입사에 필요한 전 과정을 맞춤식 취업지도 프로그램으로 개발하였다. 또한 상담·진로개발 센터는 취업경쟁력 향상을 위해 온라인 진로지도 시스템을 운영하는 중이다. 온라인 진로지도 시스템은 1~2학년에게는 대학 진로 및 직업탐색 프로그램을, 3~4학년에게는 직업 선택과 취업 준비에 관한 내용을 제공해, 취업경쟁력을 제고시키는 데 목적을 둔다. 이 프로그램은 수요자의 요구를 반영하고 기업 현장의 필요에 부응한다는 점에서 대단히 성공적인 진로·취업지도 시스템으로 평가받고 있다."
                  imgURL={require('./images/bg/2005_취업클리닉센터 개소.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2005_제1회 전국 자작 하이브리드 자동차 경진대회.jpg').default} alt=""  onClick={() => this.openModal(56)}/></a><span className="title">전국 하이브리드 자동차 경진대회</span><span className="sub_title">2005.05.20</span></div>
                  <Modal open={this.state.modalOpen == 56} close={this.closeModal} nameTxt="제1회 전국 자작 하이브리드 자동차 경진대회" dayTxt="2005.05.20" 
                  contentTxt="우리 대학 졸업생들은 4년간의 교육과정을 이수하고, 공학사 학위 및 직업능력개발훈련교사 자격을 취득해 교사 및 산업체의 설계 및 개발담당 엔지니어 등으로 취업한 경우가 많다. 그들 졸업생의 재교육 및 능력향상을 돕기 위해 우리 대학 부설 기술교육 전문연수기관인 능력개발교육원에서는 이러닝(E-learning) 등을 통해 졸업생 리콜제를 운영한다. 이를 통해 졸업생들이 현업에서 겪고 있는 기술애로를 해결한다."
                  imgURL={require('./images/bg/2005_제1회 전국 자작 하이브리드 자동차 경진대회.jpg').default}></Modal>
                </div>
              </div>
              <div className="inner_item4" style={{display: 'none'}} ref ={this.galleryArray[3]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/로보원 대통령상 수상_2006.jfif').default} alt=""  onClick={() => this.openModal(56)}/></a><span className="title">로보원 대통령상 수상</span><span className="sub_title">2006.10.15</span></div>
                  <Modal open={this.state.modalOpen == 56} close={this.closeModal} nameTxt="로보원 대통령상 수상" dayTxt="2006.10.15" 
                  contentTxt="전국 대학생들의 공학적 창의력을 겨루는“2007 ABU-KBS 로보콘코리아”에 참가한 “스타덤”(메카트로닉스공학부)은 2006 제1부 통사 39년에 이어 대회 2연패를 달성하였다. 또한 국제로봇전시회인 “로보월드 2007” 국제로봇컨테스트(IRC)에서 우리 대학 휴머노이드 로봇동아리인 “가제트”가 대상(종합우승)인 대통령상과산업자원부 장관상을 수상하며 대회 2연패를 달성했다."
                  imgURL={require('./images/bg/로보원 대통령상 수상_2006.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2006 KUT-HRD 연구센터 제막식_2006.jfif').default} alt=""  onClick={() => this.openModal(57)}/></a><span className="title">KUT-HRD 연구센터 제막식</span><span className="sub_title">2006.10.19</span></div>
                  <Modal open={this.state.modalOpen == 57} close={this.closeModal} nameTxt="KUT-HRD 연구센터 제막식" dayTxt="2006.10.19" 
                  contentTxt="1996년 초대 이낙주 총장이 퇴임하고, 제2대 권원기 총장이 취임하였다. 설립 초기 크고 작은 대내외적 도전을 극복하고, 내실 있는 성장을 위한 준비가 차근차근 진행되었던 시기였다. 본교는 이미 작지만 알찬 교육의 결실을 맺어, 미래의 웅비를 예견케 하였다. 1996년 2월, 8개 학과 240명의 제1회 학위수여식이 거행되었는데, 한 사람도 빠짐없이 전원 취업되었다. 그 해 월부터는 대학이 확대·개편되어 학과별 입학정원이 30명에서 40명으로 늘어나 신입생 총 정원은 240명에서 320명으로 증원되었고, 동년 9월에는 산학협동연구센터가 가동되었다."
                  imgURL={require('./images/bg/2006 KUT-HRD 연구센터 제막식_2006.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/한국에너지기술연구원과의 교휴협력에 관한 협정 체결_2006.jfif').default} alt=""  onClick={() => this.openModal(58)}/></a><span className="title">한국에너지기술연구원 협정체결</span><span className="sub_title">2006.11.03</span></div>
                  <Modal open={this.state.modalOpen == 58} close={this.closeModal} nameTxt="한국에너지기술연구원과의 교류협력에 관한 협정 체결" dayTxt="2006.11.03" 
                  contentTxt="우리 대학은 교육역량강화사업에 선발되어 25억 원을 지원받게 되었고, ‘광역경제권 선도산업 인재양성사업’ 대상 학교로 선정되었다. 그 결과 매년 50억 원씩 5년간 250억 원의 지원금을 받게 되어, 경쟁력을 갖춘 공학교육 인재양성 특성화 대학으로서의 면모를 다시 한번 대내외적으로 과시했다. 교육과학기술부의 교육역량강화사업에서도 우수대학으로 선정되었고, 중앙일보 대학평가에서도 취업률 부문 전국 1위를 차지했다. 또한 13개 전공에서 공학교육인증도 획득하는 등“작지만 강한 대학”으로서 명문대학의 위상을 더욱 굳건히 다져갔다."
                  imgURL={require('./images/bg/한국에너지기술연구원과의 교휴협력에 관한 협정 체결_2006.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/신한은행 한기대 출장소 개소식_2006.jfif').default} alt=""  onClick={() => this.openModal(59)}/></a><span className="title">신한은행 한기대 출장소 개소식</span><span className="sub_title">2006.12.06</span></div>
                  <Modal open={this.state.modalOpen == 59} close={this.closeModal} nameTxt="신한은행 한기대 출장소 개소식" dayTxt="2006.12.06" 
                  contentTxt="2001년 10월 학생들의 복지증진을 위하여 (연면적 3,597.37㎡, 철근콘크리트조 지하 1층에 지상 3층) 준공되었으며, 주요시설로는 학생종합지원센터, 학생지원팀, 취업지원팀, 취업클리닉센터 및 서점, 매점, 커피전문점, 교직원식당, 보건소, 상담ㆍ진로개발센터, 은행 그리고 소규모 강연 및 공연을 위한 소극장(144명 수용) 등이 있다."
                  imgURL={require('./images/bg/신한은행 한기대 출장소 개소식_2006.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/휴머노이드 로봇 경진대회부문 종합 우승_2007.jfif').default} alt=""  onClick={() => this.openModal(60)}/></a><span className="title">휴머노이드 로봇 경진대회</span><span className="sub_title">2007.10.22</span></div>
                  <Modal open={this.state.modalOpen == 60} close={this.closeModal} nameTxt="휴머노이드 로봇 경진대회 부문 종합우승" dayTxt="2006.12.06" 
                  contentTxt="본교 특성화 교육은 이미 여러 해 전부터 다방면에 걸쳐 그 수월성을 입증해 왔다. 먼저 국내외 각종 경진대회에서 본교생들이 거둔 수상실적이 탁월하다는 사실을 언급할 필요가 있다. 본교의 가제트 팀은 수년 동안 로보원그랑프리대회를 비롯해, 창의적 종합설계대회, 국제로봇 컨테스트, 대한민국 로봇대전, 일본 로보원대회, 아시아로보원 그랑프리 등 각종 휴머노이드로봇대회에서 최우수상, 종합우승 및 준우승을 거둔 바 있다."
                  imgURL={require('./images/bg/휴머노이드 로봇 경진대회부문 종합 우승_2007.jfif').default}></Modal>
                </div>  
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2007 HRD 협회 인적자원개발 파트너십 구축 협약식_2007.jfif').default} alt=""  onClick={() => this.openModal(61)}/></a><span className="title">HRD 협회 인적자원개발 파트너십</span><span className="sub_title">2007.11.09</span></div>
                  <Modal open={this.state.modalOpen == 61} close={this.closeModal} nameTxt="HRD 협회 인적자원개발 파트너십 구축 협약식" dayTxt="2007.11.09" 
                  contentTxt="Vision 2005”를 수립하고, 학교의 목적을 직업훈련교사 및 직업 능력 개발담당자 양성에서 직업훈련교사, 인력개발담당자, 실천공학기술자 양성으로 다양화한 것은 현실 타개책이자 교육 이상에 다가서기 위한 우리의 노력이었다. 그 세부계획에 따라 학교 홍보와 공공봉사 및 교류프로그램을 확대하였다. 또한 인적자원개발을 선도하기 위해 기술교육을 특성화하고, 교과과정 및 운영체제 쇄신하였다. 실험실습, 교직이수, 현장실습, 자격증 취득 등도 내실화하였다."
                  imgURL={require('./images/bg/2007 HRD 협회 인적자원개발 파트너십 구축 협약식_2007.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2008 (주)크래듀 상호협력 양해각서 체결_2008.jfif').default} alt=""  onClick={() => this.openModal(62)}/></a><span className="title">(주)크래듀 상호협력 각서체결</span><span className="sub_title">2008.03.12</span></div>
                  <Modal open={this.state.modalOpen == 62} close={this.closeModal} nameTxt="(주)크래듀 상호협력 양해각서 체결" dayTxt="2008.03.12" 
                  contentTxt="각 프로그램별 교육내용은 조형(Formgiving), 인간공학(Human Factors Engineering), 기술공학(Technology), 비즈니스(Business), 사회가치(Social Value) 영역으로 구분된다. 이들 영역은 각각의 독립적 영역이지만 상호 연계되어, 특성화된 디자인공학 교육영역을 구축한다. 세부 교과로는 기초조형, 제품디자인, 컴퓨터응용디자인, 인간공학, 디자인공학이론, 디자인사, 디자인방법론, 디자인공학기초실무, 인터페이스 디자인 등이 있다."
                  imgURL={require('./images/bg/2008 (주)크래듀 상호협력 양해각서 체결_2008.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/케이엘넷 상호협력 협약 체결_2008.jfif').default} alt=""  onClick={() => this.openModal(63)}/></a><span className="title">케이엘넷 상호협력 협약 체결</span><span className="sub_title">2008.10.07</span></div>
                  <Modal open={this.state.modalOpen == 63} close={this.closeModal} nameTxt="케이엘넷 상호협력 협약 체결" dayTxt="2008.10.07" 
                  contentTxt="전공에서 학습한 내용을 해당분야의 현장실무에서 응용 및 적용하고 취업으로 이어질 수 있도록 하고자, 산업체 등 기관과 대학 간의 인턴십 계약에 따라 협약기관에 1학기 간 파견(인턴십) 근무하고 근무기간 동안 교내 교수와 협약기관 전문가의 지도를 받도록 한다. 인턴십 Ⅰ,Ⅱ는 3개월 이내의 파견(인턴십) 근무 시 해당하며, 인턴십 Ⅲ는 1개 학기(6개월) 이상의 파견(인턴십) 근무 시 해당한다."
                  imgURL={require('./images/bg/케이엘넷 상호협력 협약 체결_2008.jfif').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/한국발전교육원 교류협력 협약 체결식_2009.jfif').default} alt=""  onClick={() => this.openModal(64)}/></a><span className="title">한국발전교육원</span><span className="sub_title">2009.10.23</span></div>
                  <Modal open={this.state.modalOpen == 64} close={this.closeModal} nameTxt="한국발전교육원" dayTxt="2009.10.23" 
                  contentTxt="007년 6월에는 지식경제부(한국산업기술진흥원)가 주관하는 지역혁신센터사업(RIC)에 응모하여 기계 수송 분야에 우리 대학의“기전융합형 부품·소재 Trouble Sooting 지역혁신센터”가 선정되었다. 2008년에는 지식경제부(정보통신산업진흥원)의 IT 전공역량강화사업(NEXT)과 우수인력양성대학 교육역량강화 사업(2008.9부터 3년간)에 선정되었다. 또한 2009년에는 교육과학기술부의 “광역경제권 선도산업 인재양성 사업” New-It 사업에 우리 대학의‘E2-반도체 장비인재 양성센터’가 선정(2009.06.01.-2014.05.31)되었다. 이처럼 최근 몇 해 동안은 사실상 해마다 국책사업에 선정되어 본교의 연구 시설과 장비는 날로 새로워졌고, 연구 역량 역시 배가되고 있다. "
                  imgURL={require('./images/bg/한국발전교육원 교류협력 협약 체결식_2009.jfif').default}></Modal>
                </div>
              </div>
              <div className="inner_item5" style={{display: 'none'}} ref={this.galleryArray[4]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2011_MOU TVTO 협약식.jpg').default} alt=""  onClick={() => this.openModal(65)}/></a><span className="title">MOU TVTO 협약식</span><span className="sub_title">2011.03.07</span></div>
                  <Modal open={this.state.modalOpen == 65} close={this.closeModal} nameTxt="MOU TVTO 협약식" dayTxt="2011.03.07" 
                  contentTxt="2011년에 들어서도 우리 대학은 KUT교육모델을 세계에 확산시키고, 세계 속의 KUT로 성장하기 위해 글로벌마인드와 봉사정신을 갖춘 창의적 인재 양성에 노력을 집중한다. 이와 같은 맥락에서 중동, 아시아 등 개도국과의 교류협력프로그램과 해외연수프로그램을 확대42 한국기술교육대학교 20년사하고, 국내 및 해외 봉사프로그램의 활성화를 위해 많은 노력을 기울인다. 2011년 연초에 이미 UAE, 오만, 바레인 등의 중동국가들의 직업훈련기관 및 대학과 직업훈련·인력교류 등 MOU를 체결하는 등의 성과를 거두었다. 직업훈련분야 특성화대학으로서 글로벌 위상을 크게 향상시키는 성과를 낸 것이다."
                  imgURL={require('./images/bg/2011_MOU TVTO 협약식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2011_제8회 임베디드 소프트웨어 공모전 대상 수상.jpg').default} alt=""  onClick={() => this.openModal(66)}/></a><span className="title">임베디드 소프트웨어 공모전 수상</span><span className="sub_title">2011.05.24</span></div>
                  <Modal open={this.state.modalOpen == 66} close={this.closeModal} nameTxt="제8회 임베디드 소프트웨어 공모전 대상 수상" dayTxt="2011.05.24" 
                  contentTxt="지식경제부가 주체하고 정보통신산업진흥원, 한국전자통신연구원, 한국정보산업연합회가 주관한 제8회 임베디드 소프트웨어 공모전에서 김상연 교수 연구팀(ACE팀 : 윤지환, 김재민, 윤인호, 천창현 /컴퓨터공학부 3학년)이 대상(상금 : 2,000만원)을 수상하였으며 개발 작품은 체감형 카약게임으로 물위에서 카약을 즐기는 것과 똑같이 느낄 수 있는 체감형 시스템이다."
                  imgURL={require('./images/bg/2011_제8회 임베디드 소프트웨어 공모전 대상 수상.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2011_한국기술교육대학교 원격훈련심사센터 개소식.jpg').default} alt=""  onClick={() => this.openModal(67)}/></a><span className="title">원격훈련심사센터 개소식</span><span className="sub_title">2011.07.01</span></div>
                  <Modal open={this.state.modalOpen == 67} close={this.closeModal} nameTxt="한국기술교육대학교 원격훈련심사센터 개소식" dayTxt="2011.07.01" 
                  contentTxt="능력개발교육원의 조직은 원장 아래 연수사업본부, 신기술교육개발실, 이러닝센터 및 원격훈련심사센터가 있다. 연수사업본부는 연수과정 중 자격과정 및 HRD과정을 운영하고 신기술, e-Learning 등 전체 연수 과정을 지원하는 업무를 담당하고 있다. 그밖에 전략사업 발굴, 위탁연수 운영, 생활관 운영 등 능력개발교육원 타부서에 속하지 않는 업무 등을 관장하고 있다. 신기술교육개발실은 연수과정 중 기술연수 전반, 교재개발, 신성장동력센터 운영, 실험실습장비 관리 등을 관장하458 한국기술교육대학교 20년사고 있다. 이러닝센터는 이러닝 매체개발 및 보급, 이러닝 운영 등의 업무를 담당한다. 원격훈련 심사센터는 2011년 7월에 신설된 조직으로 우편심사, 인터넷 심사를 통합한 원격훈련 심사업무를 전담한다."
                  imgURL={require('./images/bg/2011_한국기술교육대학교 원격훈련심사센터 개소식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2012_2012졸업연구작품전시회.jpg').default} alt=""  onClick={() => this.openModal(68)}/></a><span className="title">2012 졸업연구작품전시회</span><span className="sub_title">2012.10.10</span></div>
                  <Modal open={this.state.modalOpen == 68} close={this.closeModal} nameTxt="2012 졸업연구작품전시회" dayTxt="2012.10.10" 
                  contentTxt="졸업연구작품 전시회는 1995년에 5월에 최초로 개최할 당시“실기작품전시회”라 불렸다. 당시는 4학년생의 졸업연구작품 뿐만 아니라 재학생 전원이 실험실습 교과목에서 익힌 지식으로 제작한 여러 가지 실기작품들도 함께 전시되었다. 그러다가 2002년부터는 졸업작품만 전시하게 되었다. 이에 따라 전시회 명칭도 2003년과 2004년에는“졸업작품전시회”로, 2006년부터는“졸업연구작품전시회”로 개칭되었다."
                  imgURL={require('./images/bg/2012_2012졸업연구작품전시회.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2012_체육관 및 기숙사 신축공사 기공식.jpg').default} alt=""  onClick={() => this.openModal(69)}/></a><span className="title">체육관 및 기숙사 신축공사 기공식</span><span className="sub_title">2012.12.18</span></div>
                  <Modal open={this.state.modalOpen == 69} close={this.closeModal} nameTxt="체육관 및 기숙사 신축공사 기공식" dayTxt="2012.12.18" 
                  contentTxt="2011년 우리 대학이 짓고 있는 공학교육센터에는 1,000명이 동시 수용 가능한 다기능 대강당(2,700㎡)이 들어설 예정이며, 낙후된 체육시설 확충을 통한 생활여건 개선을 통해 지방 학생의 면학을 지원할 수 있는 생활체육장소를확보하기위해학생회관(3,298㎡)이 신축하였다. 기숙사 시설도 개교 이래 많이 확충되었다."
                  imgURL={require('./images/bg/2012_체육관 및 기숙사 신축공사 기공식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2013_2013 고교생 과학캠프.jpg').default} alt=""  onClick={() => this.openModal(70)}/></a><span className="title">2013 고교생 과학캠프</span><span className="sub_title">2013.05.24</span></div>
                  <Modal open={this.state.modalOpen == 70} close={this.closeModal} nameTxt="2013 고교생 과학캠프" dayTxt="2013.05.24" 
                  contentTxt="지역의 주도대학으로서 과학기술의 저변확대를 위해 충남지역의 과학지원기관들과 협력을 강화하고 있다. 2006년부터는 지역주민을 위해 생활과학교실을 운영해 왔고, 2010년에는 전국 규모의“인공지능형 로봇레고 과학캠프 및 경진대회(E²-반도체인재양성센터 주관)”를 열었다. 20011년에는“한기대 과학꿈나무대회”와“전국 고교생 과학캠프”를 개최하였다."
                  imgURL={require('./images/bg/2013_2013 고교생 과학캠프.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2014_제8대 김기영 총장 부임식.jpg').default} alt=""  onClick={() => this.openModal(71)}/></a><span className="title">제8대 김기영 총장 부임식</span><span className="sub_title">2014.12.15</span></div>
                  <Modal open={this.state.modalOpen == 71} close={this.closeModal} nameTxt="제8대 김기영 총장 부임식" dayTxt="2014.12.15" 
                  contentTxt="김기영 한국기술교육대학교 총장이 8일 오전 제 8대 총장에 공식 취임했다. 김 총장은 이날 취임사에서 “코리아텍을 정규 대학교육과 평생교육이라는 두 축을 중심으로 발전시켜나가겠다”면서 “이미 정규 대학교육과 평생능력교육이라는 듀얼코어시스템을 운영하도록 체제를 개편해 온 것을 바탕으로 앞으로 두 분야의 우수한 성과가 큰 시너지효과를 내도록 하겠다”고 밝혔다. 김 총장은 △창조적 지성과 공동체 의식을 가진 인재 양성 △국내 최고 수준 교육경쟁력 확보 △국가 인적자원개발 선도 △국내 대학의 신산업협력 선도 △소통과 배려를 바탕으로 한 코리아텍 문화 조성 △동문회 활성화 등을 강조했다."
                  imgURL={require('./images/bg/2014_제8대 김기영 총장 부임식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2015_2015. 해외봉사활동 발대식.jpg').default} alt=""  onClick={() => this.openModal(72)}/></a><span className="title">2015 해외봉사활동 발대식</span><span className="sub_title">2015.07.03</span></div>
                  <Modal open={this.state.modalOpen == 72} close={this.closeModal} nameTxt="2015 해외봉사활동 발대식" dayTxt="2015.07.03" 
                  contentTxt="우리 대학의 학생과 교직원은 2000년부터 한국 대학생 해외 봉사단과 한국국제협력단의 해외프로젝트에 참여하는 등 해외 봉사활동에 참여해 왔다. 그러다가 2009년에 Vision 2015년을 선포하여 향후 전문성과 봉사정신을 갖춘 글로벌 인재 양성을 목표로 함에 따라, 해외교류협력과 개발도상국에 대한 기술 이전 및 기술교육을 더욱 활발히 전개하는 동시에, 국내에서 닦아 온 기술봉사의 역량을 해외에서 펼치고자 하였다. 이에 빈곤 지역에 대한 기술·교육·문화 봉사 프로젝트인“KUT Global Challenger 2010”를 기획, 실행하여 나눔과 봉사의 정신을 확산하고, 나아가 폭 넓은 국제경험과 다양한 체험으로 자기개발을 함과 동시에 국제사회에서의 한국과 우리 대학의 이미지를 제고하였다."
                  imgURL={require('./images/bg/2015_2015. 해외봉사활동 발대식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2015_ILO 공동연구단 일행 방문.jpg').default} alt=""  onClick={() => this.openModal(73)}/></a><span className="title">ILO 공동연구단 일행 방문</span><span className="sub_title">2015.05.28</span></div>
                  <Modal open={this.state.modalOpen == 73} close={this.closeModal} nameTxt="ILO 공동연구단 일행 방문" dayTxt="2015.05.28" 
                  contentTxt="HRD 및 전문 기술연수기관인 우리 대학 부설 능력개발교육원은 매년 ILO와 공동으로 동아시아 국가 직업능력개발 담당자 및 교원, 공무원 등을 대상으로 우리나라의 HRD 및 IT분야에 대한 Regional Workshop과 National Workshop을 진행한다. 2007년에는“한국의 평생직업능력개발정책방향과 KUT의 운영 사례”란 주제로 우리 대학 제2캠퍼스에서 ILO-KUT Regional Technical Workshop이 열렸다. 동남아 국가 6개국에서 온 18명의 전문가들이 이 회의에 참가했다. 2008년에는 National Workshop이 인도 뉴델리에서 열렸는데, 회의 주제는“National Consultation on Development of Training Policy in India”였다. 인도 정부가 전해의 ILO Workshop에 참가한 인도 대표를 통해 인도 공무원을 대상으로 우리나라의 정책방향과 KUT의 운영사례 발표를 요청함에 따라, ILO와 공동으로 워크숍을 개최한 것이다."
                  imgURL={require('./images/bg/2015_ILO 공동연구단 일행 방문.jpg').default}></Modal>
                </div>
              </div>
              <div className="inner_item6" style={{display: 'none'}} ref={this.galleryArray[5]}>
              <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2016 일학습병행대학 설치.jpg').default} alt=""  onClick={() => this.openModal(74)}/></a><span className="title">일학습병행대학 설치</span><span className="sub_title">2016.03.16</span></div>
                  <Modal open={this.state.modalOpen == 74} close={this.closeModal} nameTxt="일학습병행대학 설치" dayTxt="2016.03.16" 
                  contentTxt="2016년 03월 16일 일학습병행대학 현판식이 담헌실학관에서 진행되었다."
                  imgURL={require('./images/bg/2016 일학습병행대학 설치.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2016 대학전경.jpg').default} alt=""  onClick={() => this.openModal(75)}/></a><span className="title">2016 대학 전경</span><span className="sub_title">2016.05.25</span></div>
                  <Modal open={this.state.modalOpen == 75} close={this.closeModal} nameTxt="2016 대학 전경" dayTxt="2016.05.25" 
                  contentTxt="2016년 대학 전경이다."
                  imgURL={require('./images/bg/2016 대학전경.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2016 개교 25주년 기념식.jpg').default} alt=""  onClick={() => this.openModal(76)}/></a><span className="title">개교 25주년 기념식</span><span className="sub_title">2016.11.01</span></div>
                  <Modal open={this.state.modalOpen == 76} close={this.closeModal} nameTxt="개교 25주년 기념식" dayTxt="2016.11.01" 
                  contentTxt="2016년 11월 1일 개교 25주년 기념식이 있었다. 당시 후배사랑 장학금을 모금하여 1억 4천여만 원의 장학금이 모여 400여 명의 학부생에게 지급되었다."
                  imgURL={require('./images/bg/2016 개교 25주년 기념식.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2017 코리아텍 전자게시판 제막식(복지관).jpg').default} alt=""  onClick={() => this.openModal(77)}/></a><span className="title">코리아텍 전자게시판 제막식</span><span className="sub_title">2017.03.06</span></div>
                  <Modal open={this.state.modalOpen == 77} close={this.closeModal} nameTxt="코리아텍 전자게시판 제막식(복지관)" dayTxt="2017.03.06" 
                  contentTxt="2016년 11월 1일 개교 25주년 기념식이 있었다. 당시 후배사랑 장학금을 모금하여 1억 4천여만 원의 장학금이 모여 400여 명의 학부생에게 지급되었다."
                  imgURL={require('./images/bg/2017 코리아텍 전자게시판 제막식(복지관).jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2018 휴먼아카데미.jpg').default} alt=""  onClick={() => this.openModal(78)}/></a><span className="title">휴먼아카데미</span><span className="sub_title">2018.03.21</span></div>
                  <Modal open={this.state.modalOpen == 78} close={this.closeModal} nameTxt="휴먼아카데미" dayTxt="2018.03.21" 
                  contentTxt="소강당에서 휴먼아카데미 강연을 하는 모습이다."
                  imgURL={require('./images/bg/2018 휴먼아카데미.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2018 2018 학술제.jpg').default} alt=""  onClick={() => this.openModal(79)}/></a><span className="title">2018 학술제</span><span className="sub_title">2018.10.12</span></div>
                  <Modal open={this.state.modalOpen == 79} close={this.closeModal} nameTxt="2018 학술제" dayTxt="2018.10.12" 
                  contentTxt="학술제를 맞아 중앙공원에 조명과 텐트가 쳐진 모습이다."
                  imgURL={require('./images/bg/2018 2018 학술제.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2018 2018 코리아텍 라오스 기술교육 봉사활동.jpg').default} alt=""  onClick={() => this.openModal(80)}/></a><span className="title">코리아텍 라오스 봉사활동</span><span className="sub_title">2018.12.24</span></div>
                  <Modal open={this.state.modalOpen == 80} close={this.closeModal} nameTxt="2018 코리아텍 라오스 기술교육 봉사활동" dayTxt="2018.12.24" 
                  contentTxt="2018년 12월 24일부터 2019년 1월 4일까지 진행된 ‘2018 동계 해외봉사’에서 창의과학교육 및 네트워크 설치 기술 등 다양한 프로그램을 진행하였다."
                  imgURL={require('./images/bg/2018 2018 코리아텍 라오스 기술교육 봉사활동.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2019 스마트러닝팩토리 개관.jpg').default} alt=""  onClick={() => this.openModal(81)}/></a><span className="title">스마트러닝팩토리 개관</span><span className="sub_title">2019.03.25</span></div>
                  <Modal open={this.state.modalOpen == 81} close={this.closeModal} nameTxt="스마트러닝팩토리 개관" dayTxt="2019.03.25" 
                  contentTxt="2019년 3월 25일 국내 대학 중 최대규모, 세계최초 5G 기반 스마트 러닝 팩토리(Smart Learning Factory) 개관식을 개최했다."
                  imgURL={require('./images/bg/2019 스마트러닝팩토리 개관.jpg').default}></Modal>
                </div>
                <div className="inner">
                  <div><a href="#ex1" rel="modal:open"><img src={require('./images/bg/2020 병천면 재해 구호 물품.jpg').default} alt=""  onClick={() => this.openModal(82)}/></a><span className="title">병천면 재해 구호 물품</span><span className="sub_title">2020.08.20</span></div>
                  <Modal open={this.state.modalOpen == 82} close={this.closeModal} nameTxt="병천면 재해 구호 물품" dayTxt="2020.08.20" 
                  contentTxt="병천면 재해 구호 물품 전달 및 수해 복구 봉사활동을 하는 모습이다."
                  imgURL={require('./images/bg/2020 병천면 재해 구호 물품.jpg').default}></Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-container" >
            <main className="grid-item main">
              <div className="items" ref={this.imageRef}>
                <div className="s_item item1 on" ref={this.yearRef1} >1990~1995</div>
                <div className="s_item item2" ref={this.yearRef2} >1996~2000</div>
                <div className="s_item item3" ref={this.yearRef3} >2001~2005</div>
                <div className="s_item item4" ref={this.yearRef4}>2006~2010</div>
                <div className="s_item item5" ref={this.yearRef5}>2011~2015</div>
                <div className="s_item item6" ref={this.yearRef6}>2016~2020</div>
                <div className="s_item item10" ref={this.yearRef10}>자동재생</div>
                <div className="s_item item7" ref={this.yearRef7}>Init</div>
                <div className="s_item item9" ref ={this.fullTrigRef}>Full</div>
                <div className="s_item item11">any</div>
              </div>
            </main>
          </div>
          <div> 
                <Modal open={this.state.modalOpen == 999} close={this.closeModal} nameTxt="시대 이동중입니다." contentTxt="잠시 후 눌러주세요." imgURL={require('./images/bg/클릭금지.jpg').default}></Modal></div>
        </div>
      </div>
    );
}
}
export default App;