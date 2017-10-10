window.EditStateModal = React.createClass({
    getInitialState:function(){
        return({
            StateName:this.props.StateName,
            StateId:this.props.StateId,
            Status:this.props.Status,
            BtnStatus:'disabled',
            BtnName:'Save',
            Success:'',
            Error:'',
            Count:0,

        })
        
    },
    Save:function(){
        var dataString = 'StateId='+ this.state.StateId+'&statName='+this.state.StateName+'&status='+this.state.Status;
        this.setState({
            BtnStatus:'disabled',
            BtnName:'Saving',
        })
            $.ajax({
                url: "http://localhost/oceangreen/admin/api/UpdateState.php",
                type : "POST",
                data:dataString,
                cache: false,
                success: function(html)
                    {
                        //alert(html);
                        if(html){
                            this.setState({
                                BtnStatus:'disabled',
                                BtnName:'Save',
                                Success:'',
                                Error:'',
                                Count:this.state.count+1,
                            })

                            this.props.Refresh();
                        }
                        if(html=='Success'){
                            this.setState({
                                Success: this.state.StateName +' is Edited',
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
    
    Close:function(){
        this.setState({
            StateName:'',
            StateId:'',
            Status:'',
        })
        this.props.Hidemodal();
    },
    StateNameChange:function(e){
        this.EditStateNow()
        this.setState({
            StateName:e.target.value,
            BtnStatus:'',
        })
    },
    OnStatusChange:function(e){
        this.EditStateNow()
        this.setState({
            Status:e.target.value,
            BtnStatus:'',
        })
    },
    EditStateNow:function(){
        if(this.state.Count==0){
            this.setState({
                StateName:this.props.StateName,
                Status:this.props.Status,
                StateId:this.props.StateId,
            })
        }
    },
    Reset:function(){
        this.setState({
            BtnStatus:'disabled',
            BtnName:'Save',
            Success:'',
            Error:'',
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
                            <span className="modal-title" id="myModalLabel">Editing State</span>
                        </div>
                        <div className="modal-body">
                            {this.state.Error
                                ?<div className="alert alert-danger alert-dismissible" role="alert">
                                    <button onClick={this.Reset} type="button" className="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    {this.state.Error}
                                </div>
                                :null
                            }
                            {this.state.Success
                                ?<div className="alert alert-success alert-dismissible" role="alert">
                                    <button onClick={this.Reset} type="button" className="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    {this.state.Success}
                                </div>
                                :null
                            }
                            <form>
                                <div className="form-group">
                                        <input  onChange={this.StateNameChange} type="text" 
                                            defaultValue={this.props.StateName} className="form-control" 
                                            placeholder="Enter State Name" />
                                </div>
                                <div className="form-group">
                                    <select onChange={this.OnStatusChange} defaultValue={this.props.Status} className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Deactive</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button type="button" onClick={this.Save} className="btn btn-primary btn-xs" disabled={this.state.BtnStatus}>{this.state.BtnName}</button>
                        <button type="button" onClick={this.Close} className="btn btn-default btn-xs">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});