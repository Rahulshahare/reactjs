window.LoginBox = React.createClass({
    getInitialState:function(){
        return({
            Email:'',
            Password:'',
        })
    },
    EmailChange:function(e){
       this.setState({
           Email: e.target.value,
       })
    },
    PasswordChange:function(e){
        this.setState({
           Password: e.target.value,
       })
    },
    OnSubmit:function(){
        if(this.state.Email=='rahulshahare@gmail.com' && this.state.Password=='9021455150rahul'){
            this.props.ChangeAppMode('UserPass',null)
        }else{
            alert('Invalid Email or Password');
        }
    },
    render:function(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <h4 className="text-center">Login</h4>
                        <div className="well">
                                <form>
                                    <div className="form-group">
                                        <label for="Email">Email address</label>
                                        <input onChange={this.EmailChange} type="email" className="form-control" id="Email" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="Email">Password</label>
                                        <input onChange={this.PasswordChange} type="password" className="form-control" id="password" placeholder="Enter password" />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={this.OnSubmit} type="button" className="btn btn-primary btn-lg btn-block">Login</button>
                                    </div>
                                </form>
                        </div>
                    </div>
            </div>
        </div>
        )
    }
});