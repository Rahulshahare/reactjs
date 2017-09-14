<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Form</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/jquery-2.2.4.min.js"></script>
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
                        Name:'',
                        Email:'',
                        DOB:'',
                        Number:'',
                        Massege:'',
                        ServerResponce:[],
                        NewName:'',
                        NewEmail:'',
                        locations:''
                    }
                },
                HandleNameChange:function(e){
                    this.setState({Name: e.target.value})
                },
                HandleEmailChange:function(e){
                    this.setState({Email: e.target.value})
                },
                CheckEmail:function(){
                    var regex = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;

                        if (regex.test(this.state.Email) == false) 
                        {
                        alert("Invalid E-mail address!");
                        }
                },
                DOB:function(e){
                    this.setState({DOB: e.target.value})
                },
                Number:function(e){
                    this.setState({Number: e.target.value});
                },
                FormDataShow:function(){
                    
                    
                    console.log('Email is :'+this.state.Email);
                    console.log('DOB is :'+this.state.DOB);
                    console.log('Numner is :'+this.state.Number);
                    if(this.state.Number.length > 10 || this.state.Number.length < 10){
                        alert("Mobile number is Incorrect")
                    }
                     // data in the form
                     var dataString = 'Name='+ this.state.Name
                                     +'&Email='+ this.state.Email
                                     +'&DOB='+ this.state.DOB +'&Mobile= '+ this.state.Number;
                        var form_data={
                            
                            Name: this.state.Name,
                            Email: this.state.Email,
                            DOB: this.state.DOB,
                            Mobile: this.state.Number,
                            
                        };
                        console.log("DataString = "+ dataString );
                    
                        // submit form data to api
                        $.ajax({
                            url: "http://localhost/reactjs/api/ReadFormData.php",
                            type : "POST",
                            data : dataString,
                            cache: false,
                            success: function(html)
                                {
                                    //$('.load-content').html(html);
                                    alert(JSON.parse(html));
                                    this.setState({ServerResponce: JSON.parse(html)});
                                    console.log("set state is"+this.state.ServerResponce);
                                    console.log("length of array is "+ this.state.ServerResponce.length);
                                    alert(this.state.ServerResponce["Name"]);
                                    alert(this.state.ServerResponce.Mobile);
                                   // var iterator = this.state.ServerResponce.values();

                                    
                                    
                                    
                                    
                                   
                                    
                                }.bind(this),
                        });
                        /*
                        this.serverRequestProd = $.post("http://localhost/reactjs/api/ReadFormData.php?Name=TGOD",
                            function (html) {
                                alert(html);
                            }.bind(this));*/
                           // console.log(this.state.ServerResonce);
                           //console.log(promise['var']);


                
                },
                    render:function(){
                       /* var arr = this.state.ServerResponce;
                        var sss = arr.map(function(text,i){
                            return (<h4 key={i}>{text}</h4>);
                        })*/
                        return(
                            <div>
                                <h3>Fill the Form</h3>
                               
                                        {  
                                            
                                            this.state.ServerResponce == "" ? null: (
                                                this.state.ServerResponce == "Error"?
                                            
                                                <div className='alert alert-danger'>
                                                    Unable to update product. Please try again.
                                                </div>
                                            : <div className='alert alert-danger'>
                                                {
                                                    <div>
                                                        <h2>Name: {this.state.ServerResponce.Name}</h2>
                                                        <h2>Email: {this.state.ServerResponce["Email"]}</h2>
                                                        <h2>Mobile: {this.state.ServerResponce.Mobile}</h2>
                                                        <h2>Date of birth: {this.state.ServerResponce.dob}</h2>
                                                    </div>
                                                }
                                                  
                                                </div>
                                                )
                                            
                                        }
                                        
                                   
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputName2">Name</label>
                                        <input onChange={this.HandleNameChange} type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input onChange={this.HandleEmailChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputName2">DOB</label>
                                        <input onChange={this.DOB} type="date" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputName2">Mobile</label>
                                        <input onChange={this.Number} type="number" maxlength="10" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
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