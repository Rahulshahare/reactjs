<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ATM Machine</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/react.min.js"></script>
        <script src="js/react-dom.min.js"></script>
        <script src="js/react-with-addons.js"></script>
        <script src="js/browser.min.js"></script>

        <style type="text/css">
        .decorate {
            background: #fff;
            margin-top: 50px;
            padding: 50px;
            border: 1px solid #dcebfa;
            border-radius: 100px;
        }
        body {
           
            background-color: rgba(20, 113, 195, 0.07);
        }
        .form-control {
           
            height: 44px
        }
        </style>

    </head>
    <body>
        <div id="App">
            
        </div>
       



        
        

        <script type="text/babel">
        var Home = React.createClass({
            render:function(){
                return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center">
                                    <h1>Welcome to Youngs Bank</h1>
                                    <button type="button" className="btn btn-primary btn-lg btn-block">Block level button</button>
                                </div>
                            </div>
                        </div>
                )
            }
        });
        var Password = React.createClass({
            render:function(){
                return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center">
                                    <h1>Enter Your Password</h1>
                                </div>
                            </div>
                        </div>
                )
            }
        });
           var TestingReact =  React.createClass({

                getInitialState:function(){
                    return{AppMode:'home',
                            password:'',
                            count:1,
                            disable:'disabled'
                            }
                },
                HomeMode:function(){
                    this.setState({AppMode:'home'})
                },
                NextPassMode:function(){
                    this.setState({AppMode:'password'})
                },
                
                PassChange:function(e){
                    
                    this.setState({password: e.target.value});
                    //var pin = this.state.password;
                    //console.log('Password is :'+pin);
                    this.setState({count: this.state.count+1});
                    //console.log('Count :'+ this.state.count);
                    if(this.state.count == 4){
                        this.setState({disable:''})
                    }
                    if(this.state.count>=5){
                        alert("Pin must be #Four digit long");
                        this.setState({count: 1,
                                     password:''});
                        
                        
                    }
                },
                PasswordAdded:function(e){
                    this.setState({password: e.target.value});
                    var pin = this.state.password;
                    //alert(pin);
                    //console.log('Mozilla is ' + pin.length + ' code units long');
                    if(pin == 1234){
                        this.setState({AppMode:'MainMenu'})
                    }else{
                        alert("You have enter #Incorrect Pin");
                        this.setState({AppMode:'home',
                                        count: 1,
                                        password:''
                                     })
                        
                    }
                    //alert("you have enter NEXT "+ pin);
                },
                OptionSelected:function(e){
                    var option = e.target.value;
                    alert("You have selected:" +option);
                },
                
                KnwE:function(e){
                     alert( event.type );
                },
                Home:function(){
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center decorate">
                                    <h3>Welcome to Youngs Bank</h3>
                                    <br/><br/><br/><br/><br/>
                                    <button type="button" onClick={this.NextPassMode} className="btn btn-primary btn-lg btn-block">Swipe Your #Balaji here</button>
                                </div>
                            </div>
                        </div>
                    )
                },
                Password:function(){
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center decorate">
                                    <h3>Enter Your Pin</h3>
                                    <br/><br/><br/><br/><br/>
                                    <input type="password"  value={this.state.password} onChange={this.PassChange}  autofocus className="form-control" placeholder="Pin" autofocus/>
                                    <br/>
                                    <button type="button" onClick={this.PasswordAdded} className="btn btn-primary btn-lg btn-block" disabled={this.state.disable}>Submit</button>
                                </div>
                            </div>
                        </div>
                    )
                },
                MainMenu:function(){
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4  decorate">
                                    <h3 className="text-center">Welcome to Youngs Bank</h3>
                                    <br/><br/>
                                    <select value="" onChange={this.OptionSelected} className="form-control">
                                        <option value="">Select Option Here</option>
                                        <option value="BalanceCheck">Check Balance</option>
                                        <option value="Withdrow">Withdrow</option>
                                        <option value="ChangePass">Change Password</option>
                                        
                                    </select>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    )
                },
                

          
            render:function(){
                
                    var Msg;
                    switch(this.state.AppMode){
                        case 'home': return this.Home();
                        break;
                        case 'password': return this.Password();
                        break;
                        case 'MainMenu': return this.MainMenu();
                        break;
                        case 'system' : return"System is up to date";
                        break;
                        default : return this.Home();
                    }
                    
            }
       });

       ReactDOM.render(<TestingReact/>,document.getElementById('App'));
        </script>



     
    </body>

</html>