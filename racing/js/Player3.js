//如果当前文档中拥有特定canvas1的元素不存在则返回null
//產生一個固定大小的繪圖畫布
var canvas1 = document.getElementById("canvas1");
//不同環境context.canvas1 2d
var context = canvas1.getContext('2d');
//调用convasbig
var canvasbig = document.getElementsByClassName("canvasbig")[0];

//背景图片
var bg = new Image();
    bg.src = "img/testroad.png";
//titel
var starthead = new Image();
starthead.src = "img/titel.png";
//我方战斗机
var myplane = new Image();
　　myplane.src = "img/mycar.png";
//移动范围
var myplaneX = canvas1.width / 2,
    myplaneY = 730;

//敌机
var enemytime = 0,
    enemyarr = [];
var enemy1 = new Image();
enemy1.src = `img/xiangjiao.png`;
var enemy2 = new Image();
enemy2.src = `img/guaiwu.png`;
var enemy3 = new Image();
enemy3.src = `img/zhangai.png`;
var enemy4 = new Image();
enemy4.src = `img/zhangai.png`;
var enemyall = [enemy1, enemy2, enemy3, enemy4];
//爆炸之后新的开始？
var myplane1boom = new Image();
//我的炸弹
var myboomnum = 1,
    myboomtime = 0;

var obj = {
    
    
    gamestart: 1,//游戏开始
    gameload: 0,//游戏加载
    gamerun: 0,//游戏开始
    gameover: 0,//游戏结束
    dead: 0,//死亡
 
    life: 3,//生命
    time:0,

    bgy1: -854,//背景范围
    bgy2: 0,//背景范围
    warnon: 0,//警告
    bosstime: 0,//boss出现
    bossattack: 0,//boss攻击
    //小背景
    bgon: function () {
        //绘制图像
		//小框
        context.drawImage(bg, 0, this.bgy1, 520, 854);
        context.drawImage(bg, 0, this.bgy2, 520, 854);
    },
    //背景变换
    bgchange: function () {
        //背景向下移动
        this.bgy1++;
        this.bgy2++;
        if (this.bgy1 == 0) {
            this.bgy1 = -854;
            this.bgy2 = 0;
        }
    },

    //三个生命
    lifeing: function () {
        //字体
        context.font = '60px  sans-serif';
        //颜色
        context.fillStyle = "#FFFF00";
        //显示
        context.fillText("LIFE:" + this.life, 300, 50);
        //如果死了一次and我的炸弹序号等于9and生命大于0
        if (obj.dead == 1 && myboomnum == 9 && obj.life > 0) {
            obj.dead = 0;//dead等于0
            enemytime = 0;//敌人时间等于0
            enemyarr = [];//敌人
            myboomnum = 1;//我的炸弹
            myboomtime = 0;//我的炸弹时间
            enemychangearr = [];//敌人的改变
        //如果死了1次and 生命等于0
        } else if (obj.dead == 1 && obj.life == 0) {
            obj.gameover = 1;//游戏结束
        }
    },
    //得分
    scoring: function () {
        context.font = '60px  sans-serif';
        context.fillStyle = "#FFFF00";
        context.fillText("TIME:" + this.time, 10, 50);

    },
    //游戏结束
    gameovering: function () {
        if (obj.gameover == 1) {
            obj.gamestart = 1; 
            obj.gameover=0;     
            obj.dead = 0;
            obj.gamerun = 0;
        }
    },
    //游戏开始
    starting: function () {
        canvasdiv.className = "canvasdiv";//html的开始图片
        obj.life = 3;//生命3
        obj.time=0;//时间0
        loadtime = 0;//加载时间
        loadrect = 1;//加载矩形
        myplaneX = canvas1.width / 2;//移动范围
        myplaneY = 730;


        enemytime = 0;//敌人时间++
        enemyarr = [];//敌人记录存储库

        bossattacktime = 0;//boss攻击时间
        bossattacknum = 1;//boss攻击次数


        myboomnum = 1;//我的轰炸
        myboomtime = 0;//我的轰炸时间
  
        context.drawImage(starthead, 60, 200);//titel
    },
    //加载
    loading: function () {
        loadtime++;//加载时间++
        loadrect++;//加载矩形++
        if (loadtime == 5) {//如果加载时间等于5
            loadtime = 0;//加载时间等于0
        }
        //填充样式 颜色
        context.fillStyle = 'white';
        //填充矩形 背景大小
        context.fillRect(0, 0, 520, 800);
        //坡度=创建线性渐变
        var gradient = context.createLinearGradient(20, 500, 397, 30);
        //加载颜色
        gradient.addColorStop(0, '#276ace');
        //样式
        context.fillStyle = gradient;
        //矩形大小
        context.fillRect(20, 500, loadrect, 30);
    },
    //我的飞机
    myplane: function (e) {
		//MouseEvent.offsetX
		//鼠标精准度
        myplaneX = e.offsetX;
        myplaneY = e.offsetY;
        //鼠标移动范围
        context.drawImage(myplane, myplaneX - myplane.width / 2, myplaneY - myplane.height / 2);
    },

    //敌人
    enemy: function () {
        enemytime++;//敌人时间++
        //敌人序号=解析整数 随机1-4个敌人
        var enemynum = parseInt(Math.random() * 4);
        if (obj.bossattack == 1) {//boss攻击等于1
            num = 20 //攻击次数20
        }else{
            num = 30//攻击次数50  数值越小越难
        }
        if (enemytime >= num) {//敌人时间大于等于次数
            //如果敌人序号等于3 乱数小于0.9
            if (enemynum == 3 && Math.random() < 0.9) {
                return;//返回
            } else {
                var enemylife = 1 //敌人的生命等于1

                var changearr = [Math.random() * 520 - enemyall[enemynum].width / 2, -enemyall[enemynum].height, 0, enemynum, enemylife];
                enemyarr.push(changearr);
                
                enemytime = 0;//敌人时间等于0
            }
        }
    },
    //敌人改变
    enemychange: function () {
        var result = [];
        for (let i = 0; i < enemyarr.length; i++) {
            if (enemyarr[i][1] + enemyarr[i][2] <= canvas1.height) {
                context.drawImage(enemyall[enemyarr[i][3]], enemyarr[i][0], enemyarr[i][1] + enemyarr[i][2]);
                if (enemyall[enemyarr[i][3]] == enemy4) {
                    enemyarr[i][2] += 1.5;
                } else {
                    enemyarr[i][2] += 2;
                }
                result.push(enemyarr[i]);
            }
        }
        enemyarr = result;
    },
    //我的飞机炸弹
    myplaneboom: function () {
        //如果死了一次
        obj.dead = 1;

        myboomtime++;
        if (myboomtime >= 10) {
           
            myboomnum++;
            myboomtime = 0;
        }
     
        if (myboomnum == 9) {
            //初始化
            obj.life -= 1;
            enemyarr = [];
            myplaneX = canvas1.width / 2;
            myplaneY = 750;
        }
    },
    //我的飞机毁坏
    myplaneisbroke: function () {

        for (let i = 0; i < enemyarr.length; i++) {
            //毁坏条件
            if (enemyarr[i][0] < myplaneX - myplane.width / 2 && enemyarr[i][1] + enemyarr[i][2] < myplaneY - myplane.height / 2 + myplane.height) {
                if (enemyarr[i][0] + enemyall[enemyarr[i][3]].width > myplaneX - myplane.width / 2 && enemyarr[i][1] + enemyarr[i][2] + enemyall[enemyarr[i][3]].height > myplaneY - myplane.height / 2) {
                    obj.myplaneboom();
                }
            } else if (enemyarr[i][0] > myplaneX - myplane.width / 2 && enemyarr[i][1] + enemyarr[i][2] < myplaneY - myplane.height / 2 + myplane.height) {
                if (enemyarr[i][0] < myplaneX - myplane.width / 2 + myplane.width && enemyarr[i][1] + enemyarr[i][2] + enemyall[enemyarr[i][3]].height > myplaneY - myplane.height / 2) {
                    obj.myplaneboom();
                }
            }
        }
    },
}
//设置间隔
setInterval(function () {
    obj.bgon();//运行背景
    obj.bgchange();//运行背景移动
    if (obj.gamestart == 1) {//如果开始等于1
        obj.starting();//开始游戏
    }
    if (obj.gameload == 1) {//如果游戏加载等于1
        if (loadrect >= 397) {//加载矩形大于等于397
            obj.gameload = 0;//游戏加载再次等于0 
            obj.gamerun = 1;//游戏开始等于1
        }
        obj.loading();//运行加载
    }
    if (obj.gamerun == 1) {//如果游戏开始等于1

        if (obj.dead == 0) {//如果死亡等于0
            //移动范围
            context.drawImage(myplane, myplaneX - myplane.width / 2, myplaneY - myplane.height / 2);
            if (obj.bosstime == 0 ) {
                obj.enemy();//敌人出现
                obj.enemychange();//敌人变换
            }
        }
        obj.myplaneisbroke();  //毁坏     
        obj.lifeing();//生命值
        obj.gameovering();//游戏结束
        obj.scoring();//得点
    }

}, 10)


var canvasdiv = document.getElementsByClassName("canvasdiv")[0];
//点击
canvasdiv.onclick = function () {
    //开始图片
    canvasdiv.className = "canvasdiv none";
    //重新等于0 1
    obj.gamestart = 0;
    obj.gameload = 1;
}
//鼠标
canvas1.onmousemove = function (e) {
    //如果开始等于1and没死
    if (obj.gamerun == 1 && obj.dead == 0) {
        obj.myplane(e);//运行车车
        this.style.cursor = "none";//无指针被渲染
    } else {
        this.style.cursor = "";//显示指针
    }
}
