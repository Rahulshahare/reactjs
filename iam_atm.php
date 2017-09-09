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
                            name:null}
                },
                HomeMode:function(){
                    this.setState({AppMode:'home'})
                },
                NextPassMode:function(){
                    this.setState({AppMode:'password'})
                },
                PasswordAdded:function(){
                    var pin = this.refs.Pin.value;
                    alert("you have enter "+ pin);
                },
                three:function(){
                    this.setState({AppMode:'setting'})
                },
                four:function(){
                    this.setState({AppMode:'system'})
                },
                Home:function(){
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center decorate">
                                    <h4>Welcome to Youngs Bank</h4>
                                    <br/><br/><br/><br/><br/>
                                    <button type="button" onClick={this.NextPassMode} className="btn btn-primary btn-lg btn-block">Swipe Your Card</button>
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
                                    <h4>Enter Your Pin</h4>
                                    <br/><br/><br/><br/><br/>
                                    <input ref="Pin" type="password" autofocus className="form-control" placeholder="Pin"/>
                                    <br/>
                                    <button type="button" onClick={this.PasswordAdded} className="btn btn-primary btn-lg btn-block">Home</button>
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
                        case 'setting': return"Setup your profile here";
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