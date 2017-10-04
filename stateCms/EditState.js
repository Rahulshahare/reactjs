window.EditState = React.createClass({
    getInitialState:function(){
        return({
            StateId:this.props.StateId,
            StateInfo:[],
            StateName:'',
            Status:'',
            Error:'',
            Success:'',

        })
    },
    componentDidMount(){
        var dataString = 'StateId='+ this.state.StateId;

    $.ajax({
        url: "http://localhost/oceangreen/admin/api/readOneState.php",
        type : "POST",
        data:dataString,
        cache: false,
        success: function(html)
            {
                //alert(html);
                this.setState({StateInfo:JSON.parse(html)});
                if(this.state.StateInfo){
                        this.setState({
                            StateName:this.state.StateInfo.location_name,
                            Status:this.state.StateInfo.active,
                        })
                    }
                //alert(this.state.StateName);

                    
                
                //this.setState({StateInfo:html});
                //alert("first"+this.state.StateInfo);

            }.bind(this),
    });

    

},
OnStateNameChange:function(e){
    //alert(e.target.value);
    this.setState({
        StateName: e.target.value,
    })
},
OnStatusChange:function(e){
    //alert(e.target.value);
    this.setState({
        Status: e.target.value,
    })
},
Updating:function(){
    if(this.state.StateName==''){
        this.setState({
            Error:'State Name is Empty',
        })
    }else{
        this.UpdateState();
    }
},
UpdateState:function(){
    //alert("State Name : "+this.state.StateName+
         // "Status is:"+this.state.Status);
         
         this.setState({
             Success:'',
             Error:'',
         })
          var dataString = 'StateId='+ this.state.StateId+'&statName='+this.state.StateName+'&status='+this.state.Status;

    $.ajax({
        url: "http://localhost/oceangreen/admin/api/UpdateState.php",
        type : "POST",
        data:dataString,
        cache: false,
        success: function(html)
            {
                //alert(html);
                if(html=='Success'){
                    this.setState({
                        Success: this.state.StateName+' is Edited',
                    })
                }
                if(html=='NoNeed'){
                    this.setState({
                        Error:'No Need to Edit',
                    })
                }
                if(html=='SomethingWentWrong'){
                    this.setState({
                        Error:'Something Went Wrong. Contact developer',
                    })
                }
                

            }.bind(this),
    });
},
    render:function(){
        //alert(StateInfo);
        
       
        
        
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Edit {this.state.StateName} 
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
                                
                                <div  className="form-group">
                                    <label for="Statename">State Name</label>
                                    <input onChange={this.OnStateNameChange} value={this.state.StateName} type="text" className="form-control" id="StateName" placeholder="State Name"/>
                                </div>
                                <div className="form-group">
                                    <label for="status">status</label>
                                    {
                                           <select onChange={this.OnStatusChange} value={this.state.Status} className="form-control">
                                            <option value="1">Active</option>
                                            <option value="0">De-active</option>
                                            </select>
                                            
                                        
                                    }
                                    
                                </div>
                                
                                <div className="form-group">
                                        <button onClick={this.Updating}type="button" className="btn btn-primary btn-sm">Update {this.state.StateName}</button>
                                        <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-warning btn-sm">Back to State</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
});