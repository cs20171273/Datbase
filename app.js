const db = require("./test.js"); //DB 실행 js 로드
const http = require('http'); //http 모듈 로드
const xlsx = require('xlsx'); //엑셀 모듈 로드
const multiparty = require('multiparty');

var conn = db.getConnection;

// excel 파일 불러오기
var WeatherDB = xlsx.readFile('teamproject.xlsx');
var FirstSheetName = WeatherDB.SheetNames[0];
var FirstSheet = WeatherDB.Sheets[FirstSheetName];

//Create 쿼리문 모음
CreateTableQ_1_1 = "execute immediate 'drop table location';";
CreateTableQ_1_2 = "exception when others then if sqlcode <> -942 then raise; end if;";

CreateTableQ_2_1 = "execute immediate 'drop table weather';";
CreateTableQ_2_2 = "exception when others then if sqlcode <> -942 then raise; end if;";

CreateTableQ_3 = "create table location(location_ID integer not null, location_name varchar(30), primary key (location_ID))";

// CreateTableQ_4 = "create table weather(location_ID	integer not null, time varchar(15) not null, temperature float , rainfall float , wind float , humidity float , snow float , primary key (location_ID, time))";
CreateTableQ_4_1= "create table temperature(location_ID	integer not null, time varchar(15) not null, temperature float, primary key (location_ID, time))";
CreateTableQ_4_2= "create table rainfall(location_ID integer not null, time varchar(15) not null, rainfall float, primary key (location_ID, time))";
CreateTableQ_4_3= "create table wind(location_ID integer not null, time varchar(15) not null, wind float, primary key (location_ID, time))";
CreateTableQ_4_4= "create table humidity(location_ID integer not null, time varchar(15) not null, humidity float, primary key (location_ID, time))";
CreateTableQ_4_5= "create table snow(location_ID integer not null, time varchar(15) not null, snow float, primary key (location_ID, time))";

CreateTableQ_5 = "create table user(user_ID varchar(10) not null, password varchar(10) not null, userlevel integer not null, primary key (user_ID))";

//Insert 쿼리문 모음
InsertValueQ_1_1 = "insert into temperature values (?, ?, ?)";
InsertValueQ_1_2 = "insert into rainfall values (?, ?, ?)";
InsertValueQ_1_3 = "insert into wind values (?, ?, ?)";
InsertValueQ_1_4 = "insert into humidity values (?, ?, ?)";
InsertValueQ_1_5 = "insert into snow values (?, ?, ?)";

InsertValueQ_2 = "insert into user values (?, ?, ?)";

//Drop 쿼리문 모음
DropTableQ_1 = "drop table location";

DropTableQ_2_1 = "drop table temperature";
DropTableQ_2_2 = "drop table rainfall";
DropTableQ_2_3 = "drop table wind";
DropTableQ_2_4 = "drop table humidity";
DropTableQ_2_5 = "drop table snow";

DropTableQ_3 = "drop table user";

//Select 쿼리문 모음
SelectQ_1 = "select location_ID, time, temperature, rainfall, wind velocity, humidity, snow from weather ancestor";

// conn.query(DropTableQ_1, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop loation complete");
// });

// conn.query(DropTableQ_2_1, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop temperature complete");
// });

// conn.query(DropTableQ_2_2, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop rainfall complete");
// });

// conn.query(DropTableQ_2_3, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop wind complete");
// });

// conn.query(DropTableQ_2_4, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop humidity complete");
// });

// conn.query(DropTableQ_2_5, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop snow complete");
// });

// conn.query(DropTableQ_3, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Drop weather complete");
// });

// conn.query(CreateTableQ_3, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create loation complete");
// });

// conn.query(CreateTableQ_4_1, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create temperature complete");
// });

// conn.query(CreateTableQ_4_2, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create rainfall complete");
// });

// conn.query(CreateTableQ_4_3, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create wind complete");
// });

// conn.query(CreateTableQ_4_4, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create humidity complete");
// });

// conn.query(CreateTableQ_4_5, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create snow complete");
// });

// conn.query(CreateTableQ_5, function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create weather complete");
// });

// conn.query("insert into user values('taeyeong','20171273',1)", function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Create weather complete");
// });

// for(i=2;i<16385;i++)
// {
//     var Input = {
//         A:"A"+(i).toString() ,
//         B:"B"+(i).toString() ,
//         C:"C"+(i).toString() ,
//         D:"D"+(i).toString() ,
//         E:"E"+(i).toString() ,
//         F:"F"+(i).toString() ,
//         G:"G"+(i).toString()
//     };
//     var Value = {
//         A :FirstSheet[Input.A].w ,
//         B :FirstSheet[Input.B].w ,
//         C :null ,
//         D :null ,
//         E :null ,
//         F :null ,
//         G :null
//     };
//     if(FirstSheet[Input.C]!=undefined){
//         Value.C=FirstSheet[Input.C].w
//     }
//     if(FirstSheet[Input.D]!=undefined){
//         Value.D=FirstSheet[Input.D].w
//     }
//     if(FirstSheet[Input.E]!=undefined){
//         Value.E=FirstSheet[Input.E].w
//     }
//     if(FirstSheet[Input.F]!=undefined){
//         Value.F=FirstSheet[Input.F].w
//     }
//     if(FirstSheet[Input.G]!=undefined){
//         Value.G=FirstSheet[Input.G].w
//     }
//     conn.query(InsertValueQ_1_1, [Value.A, Value.B, Value.C], function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     conn.query(InsertValueQ_1_2, [Value.A, Value.B, Value.D], function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     conn.query(InsertValueQ_1_3, [Value.A, Value.B, Value.E], function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     conn.query(InsertValueQ_1_4, [Value.A, Value.B, Value.F], function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     conn.query(InsertValueQ_1_5, [Value.A, Value.B, Value.G], function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/',function(req,res){
    res.render("login_page");
});

app.get('/search_page', function(req,res){
    res.render("search_table");
});

app.post('/login', function(req,res){
    var userID;
    var password;
    var CheckQ = "select count(*) from user where user_ID = ? and password = ?"
    var LevelQ = "select userlevel from user where user_ID = ? and password = ?"

    userID = req.body.userID;
    password = req.body.password;

    conn.query(CheckQ, [userID, password], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        Islogin = JSON.stringify(results);
        IsloginCount=(((Islogin.split(":"))[1]).split("}"))[0];
        if(IsloginCount!='0'){
            conn.query(LevelQ, [userID, password], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                FindString = JSON.stringify(results);
                if(FindString=='[{"userlevel":1}]')
                    res.render("select_page_1");
                else
                    res.render("select_page");
            });
        }
        else{
            res.render("login_page");
        }
    });
})

app.post('/semi_register', function(req,res){
    res.render("register_page");
})

app.post('/semi_select', function(req,res){
    res.render("select_page");
})

app.post('/semi_insert', function(req,res){
    res.render("insert_LT_page");
})

app.post('/semi_us', function(req,res){
    res.render("us_page");
})

app.post('/semi_max', function(req,res){
    res.render("max_page");
})

app.post('/semi_min', function(req,res){
    res.render("min_page");
})

app.post('/semi_avg', function(req,res){
    res.render("avg_page");
})

app.post('/not_semi_select', function(req,res){
    res.render("select_page_1");
})

app.post('/not_request', function(req,res){
    res.render("request_page_1");
})

app.post('/not_semi_us', function(req,res){
    res.render("us_page_1");
})

app.post('/not_semi_max', function(req,res){
    res.render("max_page_1");
})

app.post('/not_semi_min', function(req,res){
    res.render("min_page_1");
})

app.post('/not_semi_avg', function(req,res){
    res.render("avg_page_1");
})


app.post('/register', function(req,res){
    var userID;
    var password;

    userID = req.body.username;
    password = req.body.password;

    if(req.body.password!=req.body.password_conform)
        res.render("register_page");
    else{
        conn.query(InsertValueQ_2, [userID, password, 2], function (err, results, fields) {
            if (err) {
                console.log(err);
            }   
            res.render("login_page");
        });
    }
    
})

app.post('/select', function(req, res){
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
        Date_Time : req.body.time
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year;
    var Sum_Time = Sum_Date + ' ' + Time.Date_Time + ":00";
    var FindQ_1 = "select temperature from temperature where location_ID = ? and time = ?";
    var FindQ_2 = "select rainfall from rainfall where location_ID = ? and time = ?";
    var FindQ_3 = "select wind from wind where location_ID = ? and time = ?";
    var FindQ_4 = "select humidity from humidity where location_ID = ? and time = ?";
    var FindQ_5 = "select snow from snow where location_ID = ? and time = ?";
    var FindString;
    var FindResult = {
        Local : 0 ,
        Time : 'a' ,
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(FindQ_1, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Temperature=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_2, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Rainfall=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_3, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Wind=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_4, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Humidity=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_5, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Local=Local;
        FindResult.Time=Sum_Time;
        FindResult.Snow=((((FindString).split(":"))[1]).split("}"))[0];
        res.render('select_result_page', { Local: FindResult.Local, Time: FindResult.Time, Temperature: FindResult.Temperature, Rainfall: FindResult.Rainfall, Wind: FindResult.Wind, Humidity: FindResult.Humidity, Snow: FindResult.Snow });
    });
});

app.post('/select_1', function(req, res){
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
        Date_Time : req.body.time
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year;
    var Sum_Time = Sum_Date + ' ' + Time.Date_Time + ":00";
    var FindQ_1 = "select temperature from temperature where location_ID = ? and time = ?";
    var FindQ_2 = "select rainfall from rainfall where location_ID = ? and time = ?";
    var FindQ_3 = "select wind from wind where location_ID = ? and time = ?";
    var FindQ_4 = "select humidity from humidity where location_ID = ? and time = ?";
    var FindQ_5 = "select snow from snow where location_ID = ? and time = ?";
    var FindString;
    var FindResult = {
        Local : 0 ,
        Time : 'a' ,
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(FindQ_1, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Temperature=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_2, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Rainfall=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_3, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Wind=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_4, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Humidity=((((FindString).split(":"))[1]).split("}"))[0];
    });
    conn.query(FindQ_5, [Local, Sum_Time], function (err, results, fields) { 
        if (err) {
            console.log(err);
        }
        FindString = JSON.stringify(results);

        FindResult.Local=Local;
        FindResult.Time=Sum_Time;
        FindResult.Snow=((((FindString).split(":"))[1]).split("}"))[0];
        res.render('select_result_page_1', { Local: FindResult.Local, Time: FindResult.Time, Temperature: FindResult.Temperature, Rainfall: FindResult.Rainfall, Wind: FindResult.Wind, Humidity: FindResult.Humidity, Snow: FindResult.Snow });
    });
});

app.post('/insert', function(req, res){
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
        Date_Time : req.body.time
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year;
    var Sum_Time = Sum_Date + ' ' + Time.Date_Time + ":00";
    if(req.body.temp=="null")
        req.body.temp=null;
    if(req.body.rain=="null")
        req.body.rain=null;
    if(req.body.wind=="null")
        req.body.wind=null;
    if(req.body.humi=="null")
        req.body.humi=null;
    if(req.body.snow=="null")
        req.body.snow=null;
    conn.query(InsertValueQ_1_1, [req.body.local,Sum_Time,req.body.temp], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    conn.query(InsertValueQ_1_2, [req.body.local,Sum_Time,req.body.rain], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    conn.query(InsertValueQ_1_3, [req.body.local,Sum_Time,req.body.wind], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    conn.query(InsertValueQ_1_4, [req.body.local,Sum_Time,req.body.humi], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    conn.query(InsertValueQ_1_5, [req.body.local,Sum_Time,req.body.snow], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    res.render('insult_result_page', { Time: Sum_Time, Temperature: req.body.temp, Rainfall: req.body.rain, Wind: req.body.wind, Humidity: req.body.humi, Snow: req.body.snow });
});

app.post('/max',function(req,res){
    var MaxTemQuery_1 = "select max(temperature) from temperature where location_ID = ? and time like ?"
    var MaxTemQuery_2 = "select max(rainfall) from rainfall where location_ID = ? and time like ?"
    var MaxTemQuery_3 = "select max(wind) from wind where location_ID = ? and time like ?"
    var MaxTemQuery_4 = "select max(humidity) from humidity where location_ID = ? and time like ?"
    var MaxTemQuery_5 = "select max(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Max = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(MaxTemQuery_1, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Temperature=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_2, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Rainfall=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_3, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Wind=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_4, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Humidity=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_5, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Snow=((((max_string).split(":"))[1]).split("}"))[0];
        res.render('max_result_page',{max_temp: Max.Temperature, max_rain: Max.Rainfall, max_wind: Max.Wind, max_humi: Max.Humidity, max_snow: Max.Snow});
    });
});

app.post('/max_1',function(req,res){
    var MaxTemQuery_1 = "select max(temperature) from temperature where location_ID = ? and time like ?"
    var MaxTemQuery_2 = "select max(rainfall) from rainfall where location_ID = ? and time like ?"
    var MaxTemQuery_3 = "select max(wind) from wind where location_ID = ? and time like ?"
    var MaxTemQuery_4 = "select max(humidity) from humidity where location_ID = ? and time like ?"
    var MaxTemQuery_5 = "select max(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Max = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(MaxTemQuery_1, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Temperature=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_2, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Rainfall=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_3, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Wind=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_4, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Humidity=((((max_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MaxTemQuery_5, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        max_string = JSON.stringify(results);
        Max.Snow=((((max_string).split(":"))[1]).split("}"))[0];
        res.render('max_result_page_1',{max_temp: Max.Temperature, max_rain: Max.Rainfall, max_wind: Max.Wind, max_humi: Max.Humidity, max_snow: Max.Snow});
    }); 
});

app.post('/min',function(req,res){
    var MinTemQuery_1 = "select min(temperature) from temperature where location_ID = ? and time like ?"
    var MinTemQuery_2 = "select min(rainfall) from rainfall where location_ID = ? and time like ?"
    var MinTemQuery_3 = "select min(wind) from wind where location_ID = ? and time like ?"
    var MinTemQuery_4 = "select min(humidity) from humidity where location_ID = ? and time like ?"
    var MinTemQuery_5 = "select min(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Min = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    
    conn.query(MinTemQuery_1, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Temperature=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_2, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Rainfall=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_3, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Wind=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_4, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Humidity=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_5, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Snow=((((min_string).split(":"))[1]).split("}"))[0];
        res.render('min_result_page',{min_temp: Min.Temperature, min_rain: Min.Rainfall, min_wind: Min.Wind, min_humi: Min.Humidity, min_snow: Min.Snow});
    });
});

app.post('/min_1',function(req,res){
    var MinTemQuery_1 = "select min(temperature) from temperature where location_ID = ? and time like ?"
    var MinTemQuery_2 = "select min(rainfall) from rainfall where location_ID = ? and time like ?"
    var MinTemQuery_3 = "select min(wind) from wind where location_ID = ? and time like ?"
    var MinTemQuery_4 = "select min(humidity) from humidity where location_ID = ? and time like ?"
    var MinTemQuery_5 = "select min(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Min = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    
    conn.query(MinTemQuery_1, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Temperature=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_2, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Rainfall=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_3, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Wind=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_4, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Humidity=((((min_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(MinTemQuery_5, [Local, Sum_Date], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        min_string = JSON.stringify(results);
        Min.Snow=((((min_string).split(":"))[1]).split("}"))[0];
        res.render('min_result_page_1',{min_temp: Min.Temperature, min_rain: Min.Rainfall, min_wind: Min.Wind, min_humi: Min.Humidity, min_snow: Min.Snow});
    });
});

app.post('/avg',function(req,res){
    var AvgTemQuery_1 = "select avg(temperature) from temperature where location_ID = ? and time like ?"
    var AvgTemQuery_2 = "select avg(rainfall) from rainfall where location_ID = ? and time like ?"
    var AvgTemQuery_3 = "select avg(wind) from wind where location_ID = ? and time like ?"
    var AvgTemQuery_4 = "select avg(humidity) from humidity where location_ID = ? and time like ?"
    var AvgTemQuery_5 = "select avg(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Avg = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(AvgTemQuery_1, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Temperature=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_2, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Rainfall=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_3, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Wind=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_4, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Humidity=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_5, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Snow=((((avg_string).split(":"))[1]).split("}"))[0];
        res.render('avg_result_page',{avg_temp: Avg.Temperature, avg_rain: Avg.Rainfall, avg_wind: Avg.Wind, avg_humi: Avg.Humidity, avg_snow: Avg.Snow});
    });
});

app.post('/avg_1',function(req,res){
    var AvgTemQuery_1 = "select avg(temperature) from temperature where location_ID = ? and time like ?"
    var AvgTemQuery_2 = "select avg(rainfall) from rainfall where location_ID = ? and time like ?"
    var AvgTemQuery_3 = "select avg(wind) from wind where location_ID = ? and time like ?"
    var AvgTemQuery_4 = "select avg(humidity) from humidity where location_ID = ? and time like ?"
    var AvgTemQuery_5 = "select avg(snow) from snow where location_ID = ? and time like ?"
    var Local = req.body.local;
    var Time = {
        Year : req.body.year ,
        Month : req.body.month ,
        Day : req.body.day ,
    };
    var Sum_Date = Time.Month + '/' + Time.Day + '/' + Time.Year + '%';
    var Avg = {
        Temperature : 0 ,
        Rainfall : 0 ,
        Wind : 0 ,
        Humidity : 0 ,
        Snow : 0
    };
    conn.query(AvgTemQuery_1, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Temperature=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_2, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Rainfall=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_3, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Wind=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_4, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Humidity=((((avg_string).split(":"))[1]).split("}"))[0];
    });
    conn.query(AvgTemQuery_5, [Local, Sum_Date], function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        avg_string = JSON.stringify(results);
        Avg.Snow=((((avg_string).split(":"))[1]).split("}"))[0];
        res.render('avg_result_page_1',{avg_temp: Avg.Temperature, avg_rain: Avg.Rainfall, avg_wind: Avg.Wind, avg_humi: Avg.Humidity, avg_snow: Avg.Snow});
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});