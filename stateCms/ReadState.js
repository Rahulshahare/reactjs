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
        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Add New State</h4>
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
                                <div className="form-group">
                                    <label for="Statename"></label>
                                    <input onChange={this.StateNameChange}type="text" value={this.state.StateName} className="form-control" id="StateName" placeholder="State Name"/>
                                </div>
                                
                                <div className="form-group">
                                        <button type="button" className="btn btn-primary btn-sm"></button>
                                        <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-warning btn-sm">Cancel</button>
                                        <button onClick={this.Reset} type="button" className="btn btn-default btn-sm">Reset</button>
                                </div>
                        </form>
                    
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button onClick={this.Save} type="button" className="btn btn-primary">Create New State</button>
                <button  onClick={()=>this.props.ChangeAppMode('1',null)} type="button" className="btn btn-warning btn-sm">Cancel</button>
                                        <button onClick={this.Reset} type="button" className="btn btn-default btn-sm">Reset</button>
            </div>
            </div>
        </div>
        </div>
    )
    }
});

window.ReadState = React.createClass({
            getInitialState:function(){
                return({
                    States:[],
                    ButtonState:false,
                    isOpen:"YES",
                })
            },
            componentDidMount(){
                this.GetData()
               
            },
            GetData:function(){
                $.ajax({
                    url: "http://localhost/oceangreen/admin/api/readState.php?Key=Authority",
                    type : "GET",
                    cache: false,
                    success: function(html)
                        {
                            this.setState({States:JSON.parse(html)});
                            alert("first"+this.state.States);
                        }.bind(this),
                });
            },
            button:function(){
                return(
                    <button onClick={()=> this.props.ChangeAppMode('Create',null)} type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                )
            },
            AddForm:function(){
                return(
                    <form className="form-inline pull-right">
                        <div className="form-group">
                        <input type="text" className="form-control input-sm" name="skillname" placeholder="Enter skill Name" required="required"/>
                        </div>
                        <button  className="btn btn-success btn-sm addState">Add New Skill</button>
                        <button  className="btn btn-sm btn-danger"><span className="glyphicon glyphicon-remove"></span></button>
                        </form>

                )
            },

            render:function(){
                return(
                    <div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Showing States
                            <button data-toggle="modal" data-target="#myModal" onClick={this.ToggleModel} type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                            </div>
                        <div className="panel-body">
                            <ShowAllState AllState={this.state.States} ChangeAppMode={this.props.ChangeAppMode}/>
                        </div>
                    </div>
                    {<AddStateModel ChangeAppMode={this.props.ChangeAppMode} />}
                    </div>
                );
            },


        });