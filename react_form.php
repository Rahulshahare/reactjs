<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Form</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/react.min.js"></script>
        <script src="js/react-dom.min.js"></script>
        <script src="js/react-with-addons.js"></script>
        <script src="js/browser.min.js"></script>

        <style type="text/css">
        form {
                border: 1px solid #f6f6f6;
                padding: 10px;
            }
        </style>

    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div id="FormApp"></div>
                </div>
            </div>
        </div>

        <script type="text/babel">
            var FormElement = React.createClass({
                getInitialState:function(){
                    return{
                        Email:'',
                    }
                },
                HandleEmailChange:function(e){
                    this.setState({Email: e.target.value})
                },
                FormDataShow:function(){
                    console.log('Email is :'+this.state.Email);
                },
                    render:function(){
                        return(
                            <div>
                                <h3>Fill the Form</h3>
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputName2">Name</label>
                                        <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input onChange={this.HandleEmailChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                                    </div>
                                    <button onClick={this.FormDataShow} type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
                                </form>
                            </div>
                        )
                    }
            });
            ReactDOM.render(<FormElement/>,document.getElementById('FormApp'));
        </script>
    </body>
</html>