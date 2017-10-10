window.AddStateModel = React.createClass({
    getInitialState:function(){
        return({
            StateName:'',
            Status:'',
            Error:'',
            Success:'',
            show:'',
            BtnState:'',
            BtnName:'Add State',
            
        })
    },
    
    StateNameChange:function(e){
        this.setState({StateName:e.target.value,
            Error:'',
            Success:'',
           })
    },
    
    Save:function(){
       
        if(this.state.StateName ){
            this.setState({Error:'',
                            BtnState:'disabled',
                            BtnName:'Adding State',
                        });
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
                                            StateName:'',
                                            BtnState:'',
                                            BtnName:'Add State',})
                                            this.props.Refresh();
                                        
                        }
                        if(html=='Available'){
                            this.setState({Error:this.state.StateName+' is already Available',
                                            Success:'',
                                            BtnState:'',
                                            BtnName:'Add State',})
                        }
                        if(html=='SystemDead'){
                            this.setState({Error:'Something Went Wrong'})
                        }
                        
                    }.bind(this),
                });
    },
    Close:function(){
        this.setState({
            StateName:'',
            Error:'',
            Success:'',
        })
        this.props.toggle()
    },
    Reset:function(){
        this.setState({
            Error:'',
            Success:'',
            StateName:'',
        })
    },
    
    
    render:function(){
        if(!this.props.ShowModel){
            return null;
        }
       
    return(
        <div className="modal draggable show"  id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
        <div className="modal-dialog modal-sm">
            <div className="modal-content">
            <div className="modal-header">
                <button onClick={this.Close} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <span className="modal-title" id="myModalLabel">Add New State</span>
            </div>
            <div className="modal-body">
                    
                        {this.state.Error
                            ?
                            <div className="alert alert-danger alert-dismissible" role="alert">
                                <button onClick={this.Reset} type="button" className="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                {this.state.Error}
                            </div>
                            :null
                        }
                        {this.state.Success
                            ?
                            <div className="alert alert-success alert-dismissible" role="alert">
                                <button onClick={this.Reset} type="button" className="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                {this.state.Success}
                            </div>
                            :null
                        }
                        <form>
                                    <input 
                                        onChange={this.StateNameChange}
                                        type="text" 
                                        value={this.state.StateName} 
                                        className="form-control" 
                                        autocomplete="off" 
                                        autoFocus="true"
                                        required="required"
                                        placeholder="Enter State Name"
                                    />
                        </form>
                    
            </div>
            <div className="modal-footer">
                <button 
                    onClick={this.Save} 
                    type="button" 
                    className="btn btn-primary btn-xs" 
                    disabled={this.state.BtnState}
                    >
                    {this.state.BtnName}
                    </button>
                <button onClick={this.Close} type="button" className="btn btn-default btn-xs" data-dismiss="modal">Cancel</button>
            </div>
            </div>
        </div>
        </div>
    )
    }
});
