window.CreateState = React.createClass({
    getInitialState:function(){
        return({
            StateName:'',
            Status:'',
            Error:'',
            Success:'',
        })
    },
    StateNameChange:function(e){
        this.setState({StateName:e.target.value,
            Error:'',
            Success:'',})
    },
    
    Save:function(){
       
        if(this.state.StateName ){
            this.setState({Error:''});
        }else{
            this.setState({Error:'You must enter a #state Name'});
            return false;
        }

        //alert("Statename is "+this.state.StateName );
       
        //Ajax call
        var dataString = 'StateName='+ this.state.StateName;
        //alert(dataString);
           
           $.ajax
                ({
                type: "POST",
                url: "http://localhost/oceangreen/admin/api/AddNewState.php",
                data: dataString,
                cache: false,
                success: function(html)
                {
                    //alert(html);
                    if(html=='Success'){
                        this.setState({Success: this.state.StateName+' is Added Successfully',
                                        Error:'',
                                        StateName:'',
                                        StateName:''})
                                    
                    }
                    if(html=='Available'){
                        this.setState({Error:this.state.StateName+' is already Available',
                                        Success:'',})
                    }
                    if(html=='SystemDead'){
                        this.setState({Error:'Something Went Wrong'})
                    }
                    
                   
                
                }.bind(this),
                });
    },
    render:function(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Create New State
                </div>
                <div className="panel-body">
                    <div className="col-md-6">
                        {this.state.Error
                            ?<div className='alert alert-danger'>{this.state.Error}</div>
                            :null
                        }
                        {this.state.Success
                            ?<div className='alert alert-success'>{this.state.Success}</div>
                            :null
                        }
                        <form>
                                <div className="form-group">
                                    <label for="Statename">State Name</label>
                                    <input onChange={this.StateNameChange}type="text" className="form-control" id="StateName" placeholder="State Name"/>
                                </div>
                                
                                <div className="form-group">
                                        <button onClick={this.Save}type="button" className="btn btn-primary btn-sm">Create New State</button>
                                        <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-default btn-sm">Cancel</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});