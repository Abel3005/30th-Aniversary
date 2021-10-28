/*
// sockey 'year'
// default: changeActuator
// mode 0: changeYearSlow()
// mode 1: changeYearFast(Number(arg), socket);
//
*/
const server = require('http').createServer();
const SerialPort = require('serialport')
const fs = require('fs');
const { emit } = require('process');

function deepCopyObject(inObject) {
  var outObject, value, key
  if(typeof inObject !== "object" || inObject === null) {
    return inObject
  }
  outObject = Array.isArray(inObject) ? [] : {}
  for (key in inObject) {
    value = inObject[key]
    outObject[key] = (typeof value === "object" && value !== null) ? deepCopyObject(value) : value
  }
  return outObject
}

let viewState = 0;

const year_list = [1990, 1991, 1992, 1993, 1995, 1997, 1999, 2000, 2001, 2002, 2004,
  2008, 2009, 2012, 2014, 2015, 2019];
const year_interval = [0, 16, 33, 50, 68, 84, 102, 117, 134, 152, 170, 186, 204, 219, 237, 254, 289];
const play_rate_list = [5.3, 5.6, 6.3, 5, 6, 5, 5.6, 6, 6, 5.3, 6, 5, 6, 5.6, 11.6];
var id =0;
var is_working = 0;
var current_year = 1990;
var current_mode = 0;
var sendcheck =0;

const io = require('socket.io')(server, {
  cors: {
    origin: "http://192.168.0.12:3000",
    credentials: true,
    methods: ["GET", "POST"]
  },

});

function changeYearSlow(to_year, socket){
  var direction = 1-(to_year - current_year < 0)*2; //1: right, -1:reverse
  console.log(`Change year direction = ${direction}`);
  clearTimeout(id);
  var to_year_index = year_list.findIndex((ele) => ele==to_year);
  var current_year_index = year_list.findIndex((ele) => ele== current_year);
  if (direction === 1){
    socket.broadcast.emit('view', (year_interval[current_year_index])/5);
    socket.broadcast.emit('end_position', (year_interval[to_year_index])/5);
    
  } else {
    console.log('view', 578.5-year_interval[current_year_index]);
    console.log('end_position', 578.5-year_interval[to_year_index]);
    socket.broadcast.emit('view', (578.5-year_interval[current_year_index])/5);
    socket.broadcast.emit('end_position', (578.5-year_interval[to_year_index])/5);
  }
  
  id = setInterval(() => {
    +(current_year);
    if(direction ===1)
      socket.emit('rate', play_rate_list[current_year_index]);
    else
      socket.emit('rate', play_rate_list[15-current_year_index]);
    if(current_year_index == to_year_index){
      clearTimeout(id);
      console.log('finish');
      is_working = 0;
    }
    current_year = year_list[current_year_index];  
    current_year_index += direction;
  }, 3000);
}

function changeYearFast(to_year, socket){
  var direction = 1-(to_year - current_year < 0)*2; //1: right, -1:reverse
  console.log(`Change year direction = ${direction}`);
  clearTimeout(id);
  var to_year_index = year_list.findIndex((ele) => ele==to_year);
  var current_year_index = year_list.findIndex((ele) => ele== current_year);

  if (direction === 1){
    socket.broadcast.emit('rate', (year_interval[to_year_index] - year_interval[current_year_index]) / 25);
    socket.broadcast.emit('view', (year_interval[current_year_index])/5);
    socket.broadcast.emit('end_position', (year_interval[to_year_index])/5);
  } else {
    socket.broadcast.emit('rate', (year_interval[current_year_index] - year_interval[to_year_index]) / 25);
    console.log('view', 578.5-year_interval[current_year_index]);
    console.log('end_position', 578.5-year_interval[to_year_index]);
    socket.broadcast.emit('view', (578.5-year_interval[current_year_index])/5);
    socket.broadcast.emit('end_position', (578.5-year_interval[to_year_index])/5);
  }
  current_year = year_list[to_year_index];
  setTimeout(() => {
    is_working = 0;
  }, 1000);
  setTimeout(() => {
    changeYearActuator(to_year);
  },1500)
}

function changeYearActuator(to_year){
  waitWrite_building(port, bufferUnit, 'building.json', to_year);
  waitWrite_building(port2, bufferUnit2, 'building.json', to_year);
  waitWrite_building(port3, bufferUnit3, 'building.json', to_year);
  waitWrite_building(port4, bufferUnit4, 'building.json', to_year);
}


io.on('connection', (socket) => {
  socket.emit("hello", "world");
  console.log('connection');
  socket.on('message', (msg) => {console.log(msg)});
  socket.on("Msg", function(data){
         //console.log(data);
         socket.emit("MesgRes", data);
       });
  socket.on('click', (arg)=>{
    // console.log(arg+"가 클릭됨");
    if(arg === "UP"){
      waitWrite(port, bufferUnit, 'example.json');
      waitWrite(port2, bufferUnit2,'example.json');
    }
    if(arg === "Down"){
      waitWrite(port, bufferUnit, 'down.json');
      waitWrite(port2, bufferUnit2,'down.json');
    }
      // setTimeout(waitWrite, 3000, port, bufferUnit);
  });
  socket.on('view', (arg)=>{
    viewState = arg;
    console.log('view', arg);
    socket.broadcast.emit('view', viewState);
  });

  socket.on('init', (arg)=>{
    viewState = arg;
    console.log('init_view');
    socket.broadcast.emit('view', 578.5);
    socket.broadcast.emit('end_position',578.5);
    current_year = 1990;
  });


  socket.on('year', (arg)=>{
    // check
    console.log(arg);
    if (arg === 'UP') {
      waitWrite_up(port, bufferUnit, 'example.json');
      waitWrite_up(port2, bufferUnit2, 'example.json');
      waitWrite_up(port3, bufferUnit3, 'example.json');
      waitWrite_up(port4, bufferUnit4, 'example.json');
    }
    if (arg === "Down") {
      waitWrite_down(port, bufferUnit, 'down.json');
      waitWrite_down(port2, bufferUnit2, 'down.json');
      waitWrite_down(port3, bufferUnit3, 'down.json');
      waitWrite_down(port4, bufferUnit4, 'down.json');
    }
    
    if (Number(arg) >= 1990) {
      //check
      console.log(Number(arg));  
      console.log(`is_working = ${is_working}`);

      if(is_working === 0){
        is_working = 1;
        //DG_Mod Fast 하나만 처리하도록 수정
        changeYearFast(Number(arg), socket);
      }
      
    }
  });
  socket.on('mode', (arg)=>{
    init_building(port, bufferUnit);
    init_building(port2, bufferUnit2);
    init_building(port3, bufferUnit3);
    init_building(port4, bufferUnit4);
  })

});



io.on('message', (msg) => {console.log(msg)});


server.listen(20000, ()=>{console.log('server open')});

//define about port
const port = new SerialPort('\\\\.\\COM3', {
  baudRate: 19200,
  autoOpen: false
});
const port2 = new SerialPort('\\\\.\\COM5', {
  baudRate: 19200,
  autoOpen: false
});

const port3 = new SerialPort('\\\\.\\COM6', {
  baudRate: 19200,
  autoOpen: false
});
const port4 = new SerialPort('\\\\.\\COM4', {
  baudRate: 19200,
  autoOpen: false
});

//define about buffer data

const buffer = new ArrayBuffer(68);
var bufferUnit = new Uint8Array(buffer);

//const buffer2 = new ArrayBuffer(68);
var bufferUnit2 = new Uint8Array(buffer);

//const buffer3 = new ArrayBuffer(68);
var bufferUnit3 = new Uint8Array(buffer);

//const buffer4 = new ArrayBuffer(68);
var bufferUnit4 = new Uint8Array(buffer);
var bufferInit = new Uint8Array(buffer.byteLength);


function init(port, buffer) {
  buffer[0] = 0xFB;
  buffer[1] = 0xFC;
  buffer[2] = 0xFD;
  buffer[3] = 0xFE;
  
  port.write(buffer, (err, result) => {
    if (err) {
      console.log("error occured: " + err);
    }
    if (result) {
      console.log("success : " + result);
    }
  });
}



function waitWrite_down(port, _bufferUnit, fileName) {
  let actuator;
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    let actuator = JSON.parse(data);
    //console.log(actuator.actuator);

    _bufferUnit[0] = 0xFA;
    for(var i =0;i<63;i++){
      _bufferUnit[i+1] = 0;
      
    }
    // for (var abc in actuator.actuator) {
    //   //_bufferUnit[actuator.actuator[abc].id + 1] = actuator.actuator[abc].height;
    //   //console.log(actuator.actuator[abc].id, actuator.actuator[abc].height);   
    // }


    _bufferUnit[65] = 0xFC;
    _bufferUnit[66] = 0xFD;
    _bufferUnit[67] = 0xFE;
    port.write(_bufferUnit, (error, result) => {
      
    });
  });
}


function waitWrite_up(port, _bufferUnit, fileName) {
  let actuator;
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    let actuator = JSON.parse(data);
   // console.log(actuator.actuator);

    _bufferUnit[0] = 0xFA;

    for(var i =0;i<63;i++)  {
      _bufferUnit[i+1] = 50;
    }

    //test
    _bufferUnit[23 + 1] = 120;
    _bufferUnit[39 + 1] = 120;


    //2공
    _bufferUnit[35 + 1] = 70;//130 //200


    //나래돔
    _bufferUnit[14 + 1] = 115;
     ////1공
    // _bufferUnit[7 + 1] = 130;//130
    _bufferUnit[0 + 1] = 90;//130 //90
    //3공
    _bufferUnit[42 + 1] = 130;
    //담헌
    _bufferUnit[34 + 1] = 195;
 
    //인문경영관
    _bufferUnit[11 + 1] = 135;
 
    //대학본부
    _bufferUnit[49 + 1] = 120; //130
 
 
    
 
    //학생회관
    _bufferUnit[41 + 1] = 120;
 
    //체육관
    _bufferUnit[8 + 1] = 185;
 
    //해울관
    _bufferUnit[28 + 1] = 175;
 
    //한울관
    _bufferUnit[29 + 1] = 180;
    
    //예지관
    _bufferUnit[18 + 1] = 160;
 
    //예솔관
    _bufferUnit[9 + 1] = 160;
 
    //다솔관
    _bufferUnit[13 + 1] = 155;

    //소울관1, 공학 4관
    _bufferUnit[5 + 1] = 100;
 
    //4공, 새롬관
    _bufferUnit[51 + 1] = 110;
  
    
    //캠퍼스컴퍼니
    _bufferUnit[20 + 1] = 135;
 
 
    
 
 
    //\k팩토리
    _bufferUnit[24 + 1] = 140;
 
    //창업보육관
    _bufferUnit[12 + 1] = 135;
 
 
    //은솔
    _bufferUnit[19 + 1] = 195;
 
    //참빛관, 청솔관, IH
    _bufferUnit[10 + 1] = 225;
 
 
 
    //다산
    _bufferUnit[2 + 1] = 160; //160
 
    //복지관
    _bufferUnit[33 + 1] = 90; //115
 
 
    //대강당, GEC
    _bufferUnit[46 + 1] = 110; //120
 
 
    //함지관
    _bufferUnit[15 + 1] = 165;
 
    //산학
    _bufferUnit[27 + 1] = 200;
 
    

    


  

   


    //47 50

    _bufferUnit[65] = 0xFC;
    _bufferUnit[66] = 0xFD;
    _bufferUnit[67] = 0xFE;
    setTimeout( () => {
      port.write(_bufferUnit, (error, result) => {
      });
    },500)
  });
}
function init_building(port, _bufferUnit){
  fs.readFile("init.json", (err, data) => {
    if (err) throw err;
    let actuator = JSON.parse(data);
    _bufferUnit[0] = 0xFA;
    for (var abc in actuator.actuator) {
        _bufferUnit[actuator.actuator[abc].id + 1] = Number(actuator.actuator[abc].height);
        bufferInit[actuator.actuator[abc].id + 1] = Number(actuator.actuator[abc].height);
    }
    //console.log(`Debug : to_year(${_year})`)
    _bufferUnit[65] = 0xFC;
    _bufferUnit[66] = 0xFD;
    _bufferUnit[67] = 0xFE;
    setTimeout( () => {
      port.write(_bufferUnit, (error, result) => {
      });
    },1000)
  });
}
function waitWrite_building(port, _bufferUnit, fileName, _year) {
  let actuator;
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    let actuator = JSON.parse(data);
    //console.log(actuator.actuator);
    
    console.log('before_Init', bufferInit);
    console.log('before_Unit', _bufferUnit);
    _bufferUnit[0] = 0xFA;

    for (var i = 1; i < 65; i++) {
      _bufferUnit[i] = bufferInit[i];
    }
    console.log('after_Init', bufferInit);
    console.log('after+Unit', _bufferUnit);
    for (var abc in actuator.actuator) {

      // if(actuator.actuator[abc].years === _year){

      //   console.log(_year + " is ready");
      //   console.log(actuator.actuator[abc].building);
      //   _bufferUnit[actuator.actuator[abc].id+1] = actuator.actuator[abc].height;

      // }
      if (actuator.actuator[abc].years <= _year) {
        //console.log(`Debug : call(${actuator.actuator[abc].years})`)
        //console.log(_year + " is ready");
        //console.log(actuator.actuator[abc].building);
        _bufferUnit[actuator.actuator[abc].id + 1] = actuator.actuator[abc].height;
      }
    }
    //console.log(`Debug : to_year(${_year})`)

    _bufferUnit[65] = 0xFC;
    _bufferUnit[66] = 0xFD;
    _bufferUnit[67] = 0xFE;

    //console.log(_bufferUnit);
    setTimeout( () => {
      port.write(_bufferUnit, (error, result) => {
        if (error) {
          console.log("error occured: " + error);
        }
        else {
          console.log("success : " + result);
        }
      });
    },500)
  });
}



//port open
port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
  console.log("1port open")
  bufferUnit[0] = 0xFB;
  bufferUnit[1] = 0xFC;
  bufferUnit[2] = 0xFD;
  bufferUnit[3] = 0xFE;
  init(port, bufferUnit);
  setTimeout( () => {
    init_building(port,bufferUnit);
  },3000);
  // Because there's no callback to write, write errors will be emitted on the port:
});

port2.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
  console.log("2port open")
  init(port2, bufferUnit2);
  setTimeout( () => {
    init_building(port2,bufferUnit2);
  },3000);
  // Because there's no callback to write, write errors will be emitted on the port:
});

port3.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
  console.log("3port open")
  init(port3, bufferUnit3);
  // Because there's no callback to write, w2ite errors will be emitted on the port:
  setTimeout( () => {
    init_building(port3,bufferUnit3);
  },3000);
});

port4.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
  console.log("4port open")
  init(port4, bufferUnit4);
  // Because there's no callback to write, write errors will be emitted on the port:
  setTimeout( () => {
    init_building(port4,bufferUnit4);
  },3000);
});

  // setTimeout(waitWrite, 3000, port, bufferUnit);
  // setTimeout(waitWrite, 3000, port2, bufferUnit2);