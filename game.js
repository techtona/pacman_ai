/**
 * Pacman Dev
 * 
 * Pacman Dev.. game pacman ini di kembangkan untuk menguji 
 * algoritma ghost yang mengejar pacman
 */

var PACMAN =  (function () {

  const SCATTER_MODE = 1;
  const FRIGHTENED_MODE = 2;
  const CHASE_MODE = 3;

  const BOARD_BLOCK_HEIGHT = 16;
  const BOARD_BLOCK_WEIGHT = 16;

  var timer_min  = 0;
  var timer_sec = 0;
  var frameNumber = 0;
  var currentMode = SCATTER_MODE;
  var currentLevel = 1;

  var modeSwitchingPattern = [];

  var ctx;
  var pacmanBoardMap = [];

  pacmanBoardMap.containPoint = function (p) {
    for (let i=0;i<this.length;i++) {
      if (this[i][0]!=p[0] || this[i][1]!=p[1])
            continue;
      return i;
    }
    return -1;
  };


  var getTilesCenterCoordinates =  function (x,y) {
    return [ x - (x % BOARD_BLOCK_WEIGHT) + (BOARD_BLOCK_WEIGHT/2), y - (y % BOARD_BLOCK_HEIGHT) + (BOARD_BLOCK_HEIGHT/2) ];
  }

  var switchMode = function () {
      switch (currentMode) {
        case SCATTER_MODE : currentMode = CHASE_MODE; break;
        case CHASE_MODE : currentMode = SCATTER_MODE;
      }
  };

  var initializeModeSwitchingPattern = function () {
    switch(currentLevel) {
      case 1: modeSwitchingPattern = [7,20,7,20,5,20,5,Infinity]; break;
      case 2:
      case 3:
      case 4: modeSwitchingPattern = [7,20,7,20,5,1033,1,Infinity]; break;
      default : modeSwitchingPattern = [5,20,5,20,5,1037,1,Infinity];
    }
  };

  var switchToFrightenedMode = function () {

  };

  // membuat function untuk menggambar peta sekat
  var drawBoard = function () {

  	var qct = function(cpx,cpy,epx,epy) {
  		PACMAN.ctx.quadraticCurveTo(cpx,cpy,epx,epy);
  	}
  	var lt = function (x,y) {
  		PACMAN.ctx.lineTo(x,y);
  	}
  	var mt = function (x,y) {
  		PACMAN.ctx.moveTo(x,y);
  	}

    /*
    setting warna, skala, garis 
    */
  	PACMAN.ctx.scale(2,2);
  	PACMAN.ctx.beginPath();
    PACMAN.ctx.strokeStyle="blue";
    PACMAN.ctx.fillStyle="#000000";
    // black rectangle background
    PACMAN.ctx.fillRect(0,0,500,500);
  	PACMAN.ctx.strokeStyle="blue";

    // mulai menggambar sekat
  	mt(0,108);
  	lt(41,108);
  	qct(42,107,43,106);
  	lt(43,79);
  	qct(42,78,41,77);
  	lt(5,77);
  	qct(4,76,3,75);
  	lt(3,6);
  	qct(4,5,5,4);
  	lt(106,4);
  	qct(107,5,108,6);
  	lt(108,34);
  	qct(109,35,110,36);
  	lt(113,36);
  	qct(114,35,115,34);
  	lt(115,6);
  	qct(116,5,117,4);
  	lt(218,4);
  	qct(219,5,220,6);
  	lt(220,75);
  	qct(219,76,218,77);
  	lt(182,77);
  	qct(181,78,180,79);
  	lt(180,106);
  	qct(181,107,182,108);
  	lt(223,108);

  	mt(223,125);
  	lt(182,125);
  	qct(181,126,180,127);
  	lt(180,154);
  	qct(181,155,182,156);
  	lt(218,156);
  	qct(219,157,220,158);
  	lt(220,195);
  	qct(219,196,218,197);
  	lt(206,197);
  	qct(205,198,204,199);
  	lt(204,202);
  	qct(205,203,206,204);
  	lt(218,204);
  	qct(219,205,220,206);
  	lt(220,243);
  	qct(219,244,218,245);
  	lt(5,245);
  	qct(4,244,3,243);
  	lt(3,206);
  	qct(4,205,5,204);
  	lt(17,204);
  	qct(18,203,19,202);
  	lt(19,199);
  	qct(18,198,17,197);
  	lt(5,197);
  	qct(4,196,3,195);
  	lt(3,158);
  	qct(4,157,5,156);
  	lt(41,156);
  	qct(42,155,43,154);
  	lt(43,127);
  	qct(42,126,41,125);
  	lt(0,125);

  	mt(0,105);
  	lt(39,105);
  	qct(40,105,40,104);
  	lt(40,81);
  	qct(40,80,39,80);
  	lt(4,80);
  	qct(1,79,0,76);
  	lt(0,5);
  	qct(1,2,4,1);
  	lt(219,1);
  	qct(222,2,223,5);
  	lt(223,76);
  	qct(222,79,219,80);
  	lt(184,80);
  	qct(183,80,183,81);
  	lt(183,104);
  	qct(183,105,184,105);
  	lt(223,105);

  	mt(223,128);
  	lt(184,128);
  	qct(183,128,183,129);
  	lt(183,152);
  	qct(183,153,184,153);
  	lt(219,153);
  	qct(222,154,223,157);
  	lt(223,244);
  	qct(222,247,219,248);
  	lt(4,248);
  	qct(1,247,0,244);
  	lt(0,157);
  	qct(1,154,4,153);
  	lt(39,153);
  	qct(40,153,40,152);
  	lt(40,129);
  	qct(40,128,39,128);
  	lt(0,128);

  	PACMAN.ctx.stroke();

  	PACMAN.ctx.strokeStyle="blue";
  	PACMAN.ctx.beginPath();
  	mt(20,23);
  	qct(21,22,22,21);
  	lt(41,21);
  	qct(42,22,43,23);
  	lt(43,34);
  	qct(42,35,41,36);
  	lt(22,36);
  	qct(21,35,20,34);
  	lt(20,23);

  	mt(60,23);
  	qct(61,22,62,21);
  	lt(89,21);
  	qct(90,22,91,23);
  	lt(91,34);
  	qct(90,35,89,36);
  	lt(62,36);
  	qct(61,35,60,34);
  	lt(60,23);

  	mt(132,23);
  	qct(133,22,134,21);
  	lt(161,21);
  	qct(162,22,163,23);
  	lt(163,34);
  	qct(162,35,161,36);
  	lt(134,36);
  	qct(133,35,132,34);
  	lt(132,23);

  	mt(180,23);
  	qct(181,22,182,21);
  	lt(201,21);
  	qct(202,22,203,23);
  	lt(203,34);
  	qct(202,35,201,36);
  	lt(182,36);
  	qct(181,35,180,34);
  	lt(180,23);

  	mt(20,55);
  	qct(21,54,22,53);
  	lt(41,53);
  	qct(42,54,43,55);
  	lt(43,58);
  	qct(42,59,41,60);
  	lt(22,60);
  	qct(21,59,20,58);
  	lt(20,55);

  	mt(180,55);
  	qct(181,54,182,53);
  	lt(201,53);
  	qct(202,54,203,55);
  	lt(203,58);
  	qct(202,59,201,60);
  	lt(182,60);
  	qct(181,59,180,58);
  	lt(180,55);

  	mt(84,101);
  	lt(103,101);
  	lt(103,104);
  	lt(87,104);
  	lt(87,129);
  	lt(136,129);
  	lt(136,104);
  	lt(120,104);
  	lt(120,101);
  	lt(139,101);
  	lt(139,132);
  	lt(84,132);
  	lt(84,101);

  	mt(60,55);
  	lt(62,53);
  	lt(65,53);
  	lt(67,55);
  	lt(67,75);
  	lt(69,77);
  	lt(89,77);
  	lt(91,79);
  	lt(91,82);
  	lt(89,84);
  	lt(69,84);
  	lt(67,86);
  	lt(67,106);
  	lt(65,108);
  	lt(62,108);
  	lt(60,106);
  	lt(60,55);

  	mt(84,55);
  	lt(86,53);
  	lt(137,53);
  	lt(139,55);
  	lt(139,58);
  	lt(137,60);
  	lt(117,60);
  	lt(115,62);
  	lt(115,82);
  	lt(113,84);
  	lt(110,84);
  	lt(108,82);
  	lt(108,62);
  	lt(106,60);
  	lt(86,60);
  	lt(84,58);
  	lt(84,55);

  	mt(60,127);
  	lt(62,125);
  	lt(65,125);
  	lt(67,127);
  	lt(67,154);
  	lt(65,156);
  	lt(62,156);
  	lt(60,154);
  	lt(60,127);

  	mt(156,127);
  	lt(158,125);
  	lt(161,125);
  	lt(163,127);
  	lt(163,154);
  	lt(161,156);
  	lt(158,156);
  	lt(156,154);
  	lt(156,127);

  	mt(156,55);
  	lt(158,53);
  	lt(161,53);
  	lt(163,55);
  	lt(163,106);
  	lt(161,108);
  	lt(158,108);
  	lt(156,106);
  	lt(156,86);
  	lt(154,84);
  	lt(134,84);
  	lt(132,82);
  	lt(132,79);
  	lt(134,77);
  	lt(154,77);
  	lt(156,75);
  	lt(156,55);

  	mt(86,149);
  	lt(84,151);
  	lt(84,154);
  	lt(86,156);
  	lt(106,156);
  	lt(108,158);
  	lt(108,178);
  	lt(110,180);
  	lt(113,180);
  	lt(115,178);
  	lt(115,158);
  	lt(117,156);
  	lt(137,156);
  	lt(139,154);
  	lt(139,151);
  	lt(137,149);
  	lt(86,149);

  	mt(86,197);
  	lt(84,199);
  	lt(84,202);
  	lt(86,204);
  	lt(106,204);
  	lt(108,206);
  	lt(108,226);
  	lt(110,228);
  	lt(113,228);
  	lt(115,226);
  	lt(115,206);
  	lt(117,204);
  	lt(137,204);
  	lt(139,202);
  	lt(139,199);
  	lt(137,197);
  	lt(86,197);


  	mt(62,173);
  	p = [[89,173],[91,175],[91,178],[89,180],[62,180],[60,178],[60,175],[62,173]];
  	for (i=0;i<p.length;i++)
  		lt(p[i][0],p[i][1]);

  	mt(134,173);
  	for (i=0;i<p.length;i++)
  		lt(p[i][0] + 134 - 62,p[i][1]);

  	mt(22,173);
  	p = [[41,173],[43,175],[43,202],[41,204],[38,204],[36,202],[36,182],[34,180],
        [22,180],[20,178],[20,175],[22,173]];
  	for (i=0;i<p.length;i++)
  		lt(p[i][0],p[i][1]);

  	mt(201,173);
  	for (i=0;i<p.length;i++)
  		lt(223 - p[i][0],p[i][1]);

  	mt(22,221);
  	p = [[58,221],[60,219],[60,199],[62,197],[65,197],[67,199],[67,219],[69,221],[89,221],
        [91,223],[91,226],[89,228],[22,228],[20,226],[20,223],[22,221]];
  	for (i=0;i<p.length;i++)
  		lt(p[i][0],p[i][1]);

  	mt(201,221);
  	for (i=0;i<p.length;i++)
  		lt(223 - p[i][0],p[i][1]);
    
      // selesai menggambar sekat
    
      PACMAN.ctx.stroke();
    PACMAN.ctx.scale(0.5,0.5);
    
  };

  var keyStroke = function (e) {
    USER.keyStroke(e);
  };

  // looping game
  var  gameLoop = function () {
    //timer++
    drawBoard();
    USER.move();
    BLINKY.move();
    PINKY.move();
    INKY.move();
    CLYDE.move();
  };

  var generatePacmanBoardMap = function () {
    for (i=0;i<=450;i+=16)
    {
        for (j=0;j<=500;j+=16)
        {

          isEmptySquare = 1;
          var data = PACMAN.ctx.getImageData(i,j,16,16).data;
          for (m=0;m<data.length;m+=4)
            if (data[m] != 0 || data[m+1] != 0 || data[m+2] != 0 )
            {
              isEmptySquare = 0;
              break;
            }

          if (isEmptySquare==1)
            pacmanBoardMap.push([i + 8, j + 8 ]);

        }
    }
  };

  // ketika index.html di load maka function init() akan di panggil, dan memanggil seluruh komponen seperti board berserta sekat
  // load pacman, load semua ghost (bisa disable salah satu atau beberapa ghost)

  var init = function () {
    window.onload = function () {
      //menempatkan pacman pada elemen html
      PACMAN.ctx = document.getElementById("mainCanvas").getContext("2d");
      drawBoard();
      generatePacmanBoardMap();
      //load pacman(required to start the game)
      USER.loadPacmanImages();
      //load ghost blinky
      // BLINKY.loadGhostImages();
      //load ghost blinky
      // PINKY.loadGhostImages();
      //load ghost inky
      // INKY.loadGhostImages();
      //load ghost clyde
      CLYDE.loadGhostImages();
      window.onkeydown = keyStroke;
      window.setInterval(gameLoop,1000/60);
    }
  };

return {
    init : init,
    pacmanBoardMap : pacmanBoardMap,
    ctx : ctx,
    getTilesCenterCoordinates : getTilesCenterCoordinates
};

})();

var USER =  (function () {

  var x = 232;
  var y = 376;

  var currentDirection = "";
  var pendingDirection = "left";
  var animationState = 0;

  var pacmanInitialImage = new Image ();
  pacmanInitialImage.src = "./img/pacman/initial.svg";
  var pacmanMovingImages = [];

var loadPacmanImages = function () {
  pacmanMovingImages = [
    [ new Image(),new Image(),new Image(),new Image],  // left
    [ new Image(),new Image(),new Image(),new Image],  // right
    [ new Image(),new Image(),new Image(),new Image],  // up
    [ new Image(),new Image(),new Image(),new Image] ]; // down
  ['./img/pacman/direction/open-60.svg', './img/pacman/direction/open-45.svg',
   './img/pacman/direction/open-30.svg', './img/pacman/direction/open-15.svg'].forEach( function  (element , index) {
     ['left','right','up','down'].forEach( function(e,i) {
       pacmanMovingImages[i][index].src = element.replace("direction",e);
     } );
   });
}

  var move = function () {

    // memunculkan log pacman melewati jumlah titik
// console.log(PACMAN.pacmanBoardMap.containPoint([24,24]));
    if (PACMAN.pacmanBoardMap.containPoint([x,y])!=-1)
   	{
   		switch(currentDirection) {
   			case "left":
   				if (PACMAN.pacmanBoardMap.containPoint([x - 16 ,y])==-1) {
   					currentDirection = "";
   				}
   				break;
   			case "right":
   				if (PACMAN.pacmanBoardMap.containPoint([x + 16 ,y])==-1) {
   						currentDirection = "";
   				}
   				break;
   			case "up":
   				if (PACMAN.pacmanBoardMap.containPoint([x,y - 16])==-1) {
   					currentDirection = "";
   				}
   				break;
   			case "down":
   				if (PACMAN.pacmanBoardMap.containPoint([x,y + 16])==-1) {
   					currentDirection = "";
   				}
   		}
   		switch(pendingDirection) {
   			case "left":
   				if (PACMAN.pacmanBoardMap.containPoint([x - 16 ,y])!=-1) {
   					currentDirection = pendingDirection;
   					pendingDirection = "";
   				}
   				break;
   			case "right":
   				if (PACMAN.pacmanBoardMap.containPoint([x + 16 ,y])!=-1) {
   					currentDirection = pendingDirection;
   					pendingDirection = "";
   				}
   				break;
   			case "up":
   				if (PACMAN.pacmanBoardMap.containPoint([x,y - 16])!=-1) {
   					currentDirection = pendingDirection;
   					pendingDirection = "";
   				}
   				break;
   			case "down":
   				if (PACMAN.pacmanBoardMap.containPoint([x,y + 16])!=-1) {
   					currentDirection = pendingDirection;
   					pendingDirection = "";
   				}
   		}
     }
     //cek kemana pacman sedang bergerak dan kemana pacman akan bergerak
  	//  console.log(" currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);
   	switch(currentDirection) {
   		case "left":
        x += -2;
   			break;
   		case "right":
        x += 2;
   			break;
   		case "up":
        y += -2;
   			break;
   		case "down":
        y += 2;
   	}
  //  console.log(x,y);
    renderPacmanCharacter();

  };

  var renderPacmanCharacter = function () {
    var r;
    switch (currentDirection) {
      case "left" : r=0; break;
      case "right" : r=1; break;
      case "up" : r=2; break;
      case "down" : r=3; break;
      case "":
        PACMAN.ctx.drawImage(pacmanInitialImage,x-12,y-12,24,24);
        return;
    }

    PACMAN.ctx.drawImage(pacmanMovingImages[r][Math.floor(animationState)],x-12,y-12,24,24);
    animationState = (animationState + 0.5) % 4;
  };

  var keyStroke = function (e) {
    if (!e.repeat && ( ["ArrowLeft", "ArrowRight", "ArrowUp" , "ArrowDown"].indexOf(e.key)!=-1) ) {
      var direction = e.key.slice(5,e.key.length).toLowerCase();
      if (currentDirection==="") {
        currentDirection = direction;
      //  console.log(" currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);
        return;
      }

      [["up","down"],["down","up"],["left","right"],["right","left"]].forEach ( function (e) {
        if (e[0]==direction && e[1]==currentDirection) {
          currentDirection = direction;
        //  console.log(" currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);
          return;
        }
      });

    //  console.log(" currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);
      pendingDirection = direction;
    }
 };

function getCurrentDirection() {
  return currentDirection;
}

function getX(){
  return x;
}

function getY(){
  return y;
}

return {
  getX : getX,
  getY : getY,
  move : move,
  keyStroke : keyStroke,
  loadPacmanImages : loadPacmanImages,
  getCurrentDirection : getCurrentDirection
};

})();

var BLINKY = (function () {
  var x = 24;
  var y = 24;
  var currentDirection = "";
  var pendingDirection = "right";

  var targetTileX;
  var targetTileY;

  // simpan init image dalam array
  var ghostImages =
  [ new Image(),  // left
    new Image(),  // right
    new Image(), // up
    new Image() ]; // down

    //lokasi direktori image, lalu tiap image di foreach ke new Image()
  var loadGhostImages = function () {
    ['./img/ghosts/red/left.svg','./img/ghosts/red/right.svg',
    './img/ghosts/red/up.svg','./img/ghosts/red/down.svg'].forEach( function (e,i) {
      ghostImages[i].src = e;
    });
  };

  var getX = function () { return x; }
  var getY = function () { return y; }

  var renderGhost = function () {
    var i;
    
  //  PACMAN.ctx = document.getElementById("mainCanvas").getContext("2d");
    switch (currentDirection) {
      case "left" : i=0; break;
      case "right" : i=1; break;
      case "up" : i=2; break;
      case "down" : i=3; break;
    }
   PACMAN.ctx.drawImage(ghostImages[i],x-12,y-12,24,24);
  };

  var move = function () {
    var nextTile = [];
    targetTileX = USER.getX();
    targetTileY = USER.getY();

    if (PACMAN.pacmanBoardMap.containPoint([x,y])!=-1)
    {
      // cek arah ghost sekarang dan arah yang akan datang
      //console.log(currentDirection,pendingDirection);
      currentDirection = pendingDirection;

      switch(currentDirection) {
        case "left":
          nextTile = [x - 16 ,y];
          break;
        case "right":
          nextTile = [x + 16 ,y];
          break;
        case "up":
          nextTile = [x,y - 16];
          break;
        case "down":
          nextTile = [x,y + 16];
      }

      var distances =
      [Infinity,  //up
        Infinity, //left
        Infinity, //down
        Infinity];  //right

      //left
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] - 16, nextTile[1]])!=-1) && currentDirection!="right" ) {
          distances[1] = Math.sqrt( Math.pow( (nextTile[0] - 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // up
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] - 16])!=-1) && currentDirection!="down" ) {
          distances[0] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] - 16 - targetTileY ),2) );
      }
      // right
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] + 16, nextTile[1]])!=-1) && currentDirection!="left") {
          distances[3] = Math.sqrt( Math.pow( (nextTile[0] + 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // down
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] + 16])!=-1) && currentDirection!="up" ) {
          distances[2] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] + 16 - targetTileY ),2) );
      }

      var min_index = 0;
      for (let i=1;i<4;i++) {
        if (distances[i]<distances[min_index])
          min_index = i;
      }

      switch(min_index) {
        case 0: pendingDirection = "up"; break;
        case 1: pendingDirection = "left"; break;
        case 2: pendingDirection = "down"; break;
        case 3: pendingDirection = "right"; break;
      }
  }
    // cek log arah sekarang dan arah yang akan datang
    // console.log(" GHOST : currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);

    switch(currentDirection) {
      case "left":
        x += -2;
        break;
      case "right":
        x += 2;
        break;
      case "up":
        y += -2;
        break;
      case "down":
        y += 2;
    }

    renderGhost();
    // posisi ghost
  //  console.log(x,y);
  };

return {
  loadGhostImages : loadGhostImages,
  move : move,
  getX : getX,
  getY : getY
};

})();

var PINKY = (function () {
  var x = 72;
  var y = 88;
  var currentDirection = "";
  var pendingDirection = "right";

  var targetTileX;
  var targetTileY;

  var ghostImages =
  [ new Image(),  // left
    new Image(),  // right
    new Image(), // up
    new Image() ]; // down

  var loadGhostImages = function () {
    ['./img/ghosts/pink/left.svg','./img/ghosts/pink/right.svg',
    './img/ghosts/pink/up.svg','./img/ghosts/pink/down.svg'].forEach( function (e,i) {
      ghostImages[i].src = e;
    });
  };

  var renderGhost = function () {
    var i;
  //  PACMAN.ctx = getElementById("mainCanvas").getContext("2d");
    switch (currentDirection) {
      case "left" : i=0; break;
      case "right" : i=1; break;
      case "up" : i=2; break;
      case "down" : i=3; break;
    }
   PACMAN.ctx.drawImage(ghostImages[i],x-12,y-12,24,24);
  };

  var move = function () {
    var nextTile = [];
    targetTileX = USER.getX();
    targetTileY = USER.getY();
    switch(USER.getCurrentDirection())
    {
      case "left" : targetTileX -= 16 * 4; break;
      case "right" : targetTileX += 16 * 4; break;
      case "down" : targetTileY += 16 * 4; break;
      case "up" : targetTileY -= 16 * 4; targetTileX -= 16 * 4; break; // just replicating the same bug as in the original PACMAN
    }
    if (PACMAN.pacmanBoardMap.containPoint([x,y])!=-1)
    {
      currentDirection = pendingDirection;

      switch(currentDirection) {
        case "left":
          nextTile = [x - 16 ,y];
          break;
        case "right":
          nextTile = [x + 16 ,y];
          break;
        case "up":
          nextTile = [x,y - 16];
          break;
        case "down":
          nextTile = [x,y + 16];
      }

      var distances =
      [Infinity,  //up
        Infinity, //left
        Infinity, //down
        Infinity];  //right

      //left
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] - 16, nextTile[1]])!=-1) && currentDirection!="right" ) {
          distances[1] = Math.sqrt( Math.pow( (nextTile[0] - 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // up
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] - 16])!=-1) && currentDirection!="down" ) {
          distances[0] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] - 16 - targetTileY ),2) );
      }
      // right
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] + 16, nextTile[1]])!=-1) && currentDirection!="left") {
          distances[3] = Math.sqrt( Math.pow( (nextTile[0] + 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // down
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] + 16])!=-1) && currentDirection!="up" ) {
          distances[2] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] + 16 - targetTileY ),2) );
      }

      var min_index = 0;
      for (let i=1;i<4;i++) {
        if (distances[i]<distances[min_index])
          min_index = i;
      }

      switch(min_index) {
        case 0: pendingDirection = "up"; break;
        case 1: pendingDirection = "left"; break;
        case 2: pendingDirection = "down"; break;
        case 3: pendingDirection = "right"; break;
      }
  }

  //  console.log(" GHOST : currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);

    switch(currentDirection) {
      case "left":
        x += -2;
        break;
      case "right":
        x += 2;
        break;
      case "up":
        y += -2;
        break;
      case "down":
        y += 2;
    }

    renderGhost();
  //  console.log(x,y);
  };

return {
  loadGhostImages : loadGhostImages,
  move : move
};

})();

var INKY = (function () {
  var x = 104;
  var y = 312;
  var currentDirection = "";
  var pendingDirection = "right";

  var targetTileX;
  var targetTileY;

  var ghostImages =
  [ new Image(),  // left
    new Image(),  // right
    new Image(), // up
    new Image() ]; // down

  var loadGhostImages = function () {
    ['./img/ghosts/blue/left.svg','./img/ghosts/blue/right.svg',
    './img/ghosts/blue/up.svg','./img/ghosts/blue/down.svg'].forEach( function (e,i) {
      ghostImages[i].src = e;
    });
  };

  var renderGhost = function () {
    var i;
  //  PACMAN.ctx = getElementById("mainCanvas").getContext("2d");
    switch (currentDirection) {
      case "left" : i=0; break;
      case "right" : i=1; break;
      case "up" : i=2; break;
      case "down" : i=3; break;
    }
   PACMAN.ctx.drawImage(ghostImages[i],x-12,y-12,24,24);
  };

  var move = function () {
    if (PACMAN.pacmanBoardMap.containPoint([x,y])!=-1)
    {
      var nextTile = [];
      //[ pacmanX, pacmanY ] = PACMAN.getTilesCenterCoordinates(USER.getX(),USER.getY());
      [ blinkyX, blinkyY  ] = PACMAN.getTilesCenterCoordinates(BLINKY.getX(),BLINKY.getY());

      [ tempX, tempY ] = PACMAN.getTilesCenterCoordinates(USER.getX(),USER.getY());
      switch(USER.getCurrentDirection())
      {
        case "left" : tempX -= 16 * 2; break;
        case "right" : tempX += 16 * 2; break;
        case "down" : tempY += 16 * 2; break;
        case "up" : tempY -= 16 * 2; tempX -= 16 * 2; break; // just replicating the same bug as in the original PACMAN
      }

      targetTileX = 2 * tempX - blinkyX;
      targetTileY = 2 * tempY - blinkyY;

      currentDirection = pendingDirection;

      switch(currentDirection) {
        case "left":
          nextTile = [x - 16 ,y];
          break;
        case "right":
          nextTile = [x + 16 ,y];
          break;
        case "up":
          nextTile = [x,y - 16];
          break;
        case "down":
          nextTile = [x,y + 16];
      }

      var distances =
      [Infinity,  //up
        Infinity, //left
        Infinity, //down
        Infinity];  //right

      //left
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] - 16, nextTile[1]])!=-1) && currentDirection!="right" ) {
          distances[1] = Math.sqrt( Math.pow( (nextTile[0] - 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // up
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] - 16])!=-1) && currentDirection!="down" ) {
          distances[0] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] - 16 - targetTileY ),2) );
      }
      // right
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] + 16, nextTile[1]])!=-1) && currentDirection!="left") {
          distances[3] = Math.sqrt( Math.pow( (nextTile[0] + 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // down
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] + 16])!=-1) && currentDirection!="up" ) {
          distances[2] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] + 16 - targetTileY ),2) );
      }

      var min_index = 0;
      for (let i=1;i<4;i++) {
        if (distances[i]<distances[min_index])
          min_index = i;
      }

      switch(min_index) {
        case 0: pendingDirection = "up"; break;
        case 1: pendingDirection = "left"; break;
        case 2: pendingDirection = "down"; break;
        case 3: pendingDirection = "right"; break;
      }
  }

//    console.log(" GHOST : currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);

    switch(currentDirection) {
      case "left":
        x += -2;
        break;
      case "right":
        x += 2;
        break;
      case "up":
        y += -2;
        break;
      case "down":
        y += 2;
    }

    renderGhost();
  //  console.log(x,y);
  };

return {
  loadGhostImages : loadGhostImages,
  move : move
};

})();


var CLYDE= (function () {
  var x = 104;
  var y = 24;
  var currentDirection = "";
  var pendingDirection = "right";

  var targetTileX;
  var targetTileY;

  var ghostImages =
  [ new Image(),  // left
    new Image(),  // right
    new Image(), // up
    new Image() ]; // down

  var loadGhostImages = function () {
    ['./img/ghosts/yellow/left.svg','./img/ghosts/yellow/right.svg',
    './img/ghosts/yellow/up.svg','./img/ghosts/yellow/down.svg'].forEach( function (e,i) {
      ghostImages[i].src = e;
    });
  };

  var renderGhost = function () {
    var i;
  //  PACMAN.ctx = document.getElementById("mainCanvas").getContext("2d");
    switch (currentDirection) {
      case "left" : i=0; break;
      case "right" : i=1; break;
      case "up" : i=2; break;
      case "down" : i=3; break;
    }
   PACMAN.ctx.drawImage(ghostImages[i],x-12,y-12,24,24);
  };

  var move = function () {

    /*switch(USER.getCurrentDirection())
    {
      case "left" : targetTileX -= 16 * 4; break;
      case "right" : targetTileX += 16 * 4; break;
      case "down" : targetTileY += 16 * 4; break;
      case "up" : targetTileY -= 16 * 4; targetTileX -= 16 * 4; break; // just replicating the same bug as in the original PACMAN
    }*/

    if (PACMAN.pacmanBoardMap.containPoint([x,y])!=-1)
    {
      // yang membuat berbeda pergerakan ghost satu dengan yang lain ada di bagian line ini, 
      // next tile nya beda2 meski sama2 ngejar pacman 
      var nextTile = [];
      [ pacmanX, pacmanY ] = PACMAN.getTilesCenterCoordinates(USER.getX(),USER.getY());
      dist = Math.sqrt(Math.pow( (x - pacmanX),2) + Math.pow((y - pacmanY),2));
      if (dist<(16*8))
      {    targetTileX = 0;
           targetTileY = 500;
      }
      else
      {
          targetTileX = pacmanX;
          targetTileY = pacmanY;
      }
      currentDirection = pendingDirection;

      switch(currentDirection) {
        case "left":
          nextTile = [x - 16 ,y];
          break;
        case "right":
          nextTile = [x + 16 ,y];
          break;
        case "up":
          nextTile = [x,y - 16];
          break;
        case "down":
          nextTile = [x,y + 16];
      }

      var distances =
      [Infinity,  //up
        Infinity, //left
        Infinity, //down
        Infinity];  //right

      //left
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] - 16, nextTile[1]])!=-1) && currentDirection!="right" ) {
          distances[1] = Math.sqrt( Math.pow( (nextTile[0] - 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // up
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] - 16])!=-1) && currentDirection!="down" ) {
          distances[0] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] - 16 - targetTileY ),2) );
      }
      // right
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0] + 16, nextTile[1]])!=-1) && currentDirection!="left") {
          distances[3] = Math.sqrt( Math.pow( (nextTile[0] + 16 - targetTileX ),2) + Math.pow( (nextTile[1] - targetTileY ),2) );
      }
      // down
      if ((PACMAN.pacmanBoardMap.containPoint([nextTile[0], nextTile[1] + 16])!=-1) && currentDirection!="up" ) {
          distances[2] = Math.sqrt( Math.pow( (nextTile[0] - targetTileX ),2) + Math.pow( (nextTile[1] + 16 - targetTileY ),2) );
      }

      var min_index = 0;
      for (let i=1;i<4;i++) {
        if (distances[i]<distances[min_index])
          min_index = i;
      }

      switch(min_index) {
        case 0: pendingDirection = "up"; break;
        case 1: pendingDirection = "left"; break;
        case 2: pendingDirection = "down"; break;
        case 3: pendingDirection = "right"; break;
      }
  }

    //console.log(" GHOST : currentDirection = " + currentDirection + " pendingDirection = " + pendingDirection);

    //pergerakan ghost naik turn kanan kiri, mengatur kecepatan
    switch(currentDirection) {
      case "left":
        x += -2;
        break;
      case "right":
        x += 2;
        break;
      case "up":
        y += -2;
        break;
      case "down":
        y += 2;
    }

    renderGhost();
    //console.log(x,y);
  };

return {
  loadGhostImages : loadGhostImages,
  move : move
};

})();
