window.AddStateModel = React.createClass({
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
            this.setState({Error:'You must enter a #state Name',
                            Success:''});
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
                                        this.props.Refresh();
                                    
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
    Reset:function(){
        this.setState({
            StateName:'',
            Error:'',
            Success:'',
        })
    },
    
    render:function(){
    
    return(
        <div className="modal " data-backdrop="false" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
            <div className="modal-content">
            <div className="modal-header">
                <button onClick={this.Reset} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h6 className="modal-title" id="myModalLabel">Add New State</h6>
            </div>
            <div className="modal-body">
                    
                        {this.state.Error
                            ?<div className='alert alert-danger'>{this.state.Error}</div>
                            :null
                        }
                        {this.state.Success
                            ?<div className='alert alert-success'>{this.state.Success}</div>
                            :null
                        }
                        <form>
                                
                                    <label for="Statename">State Name</label>
                                    <input onChange={this.StateNameChange}type="text" value={this.state.StateName} className="form-control" id="StateName" placeholder="State Name"/>
                                
                                
                        </form>
                    
            </div>
            <div className="modal-footer">
                <button onClick={this.Save} type="button" className="btn btn-primary">Create New State</button>
                <button onClick={this.Reset} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    )
    }
});
