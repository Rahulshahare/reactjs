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
        </style>

    </head>
    <body>
        <div id="App">
            
        </div>
       



        
        

        <script type="text/babel">
           var TestingReact =  React.createClass({

                getInitialState:function(){
                    return{AppMode:'home'}
                },
                one:function(){
                    this.setState({AppMode:'home'})
                },
                two:function(){
                    this.setState({AppMode:'profile'})
                },
          
            render:function(){
                
                    var Msg;
                    switch(this.state.AppMode){
                        case 'home': Msg = "Welcome to Youngs bank";
                        break;
                        case 'profile': Msg = "this is password baby";
                    }
                    return(
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <h1>PageMode Test</h1>
                                <button type="button" onClick={this.one} className="btn btn-primary btn-lg btn-block">Home</button>
                                <button type="button" onClick={this.two} className="btn btn-primary btn-lg btn-block">Profile</button>
                                <button type="button" onClick={this.three} className="btn btn-primary btn-lg btn-block">Setting</button>
                                <button type="button" onClick={this.four} className="btn btn-primary btn-lg btn-block">System</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 text-center">
                                <h1>{Msg}</h1>
                            </div>
                        </div>
                    </div>
                )
            }
       });

       ReactDOM.render(<TestingReact/>,document.getElementById('App'));
        </script>



     
    </body>

</html>