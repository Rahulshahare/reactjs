window.DeleteStateModel = React.createClass({
    getInitialState:function(){
        return({
            StateName: this.props.StateName,
            StateId:this.props.StateId,
            Error:'',
            BtnName:'Delete',
            BtnState:'',
        })
    },
    Close:function(){
        this.setState({
            StateName:'',
            StateId:'',
            Error:'',
        })

        this.props.Hidemodal()
    },
    DeleteStateNow:function(){
        var dataString = 'StateId='+ this.props.StateId;
        //alert(dataString);
        this.setState({
            BtnName:'Deleting',
            BtnState:'',
        })
        
           $.ajax({
                url: "http://localhost/oceangreen/admin/api/DeleteState.php",
                type : "POST",
                data:dataString,
                cache: false,
                success: function(html)
                {
                    //alert(html);
                    this.setState({
                                    Error:html,
                                    BtnName:'Delete',
                                    BtnState:'',
                    })
                    if(html=='Deleted'){
                       // this.props.Refresh();
                       this.props.DeletingState(this.props.StateId,this.props.StateName,this.props.index)
                    }
                                        
                }.bind(this),
            });
    },
    LandingOption:function(){
        return(
            <div>
                <div className="modal-body">
                <p>Are you sure want to delete <strong>{this.props.StateName}</strong> State?</p>
                </div>
                <div className="modal-footer">
                    <CommomButton BtnType={"danger"} onClick={this.DeleteStateNow} BtnState={this.state.BtnState} BtnName={this.state.BtnName}/>
                    <CommomButton BtnType={"default"} onClick={this.Close} BtnState={null} BtnName={"Cancel"}/>
                </div>
            </div>
        )
    },
    OnDelete:function(){
        return(
                <div>
                    <div className="modal-body">
                    <p><strong>{this.props.StateName}</strong> is Deleted Successfully.</p>
                    </div>
                    <div className="modal-footer">
                    <CommomButton BtnType={"primary"} onClick={this.Close} BtnState={null} BtnName={"Done"}/>
                    </div>
                </div>
            )
    },
    CanNotDelete:function(){
        return(
            <div>
                <div className="modal-body">
                <p>You can't Delete <strong>{this.props.StateName}</strong> State as it haves Districts in it.</p>
                </div>
                <div className="modal-footer">
                    <CommomButton BtnType={"primary"} onClick={this.Close} BtnName={"ok"}/>
                </div>
            </div>
        )
    },
    AnyError:function(){
        return(
            <div>
                <div className="modal-body">
                <p><strong>Internal Server Error Occured.</strong></p>
                </div>
                <div className="modal-footer">
                    <CommomButton BtnType={"primary"} onClick={this.Close} BtnState={null} BtnName={"ok"}/>
                </div>
            </div>
        )
    },
    render:function(){
        if(!this.props.ShowModel){
            return null;
        }
        var Operations;
        switch(this.state.Error){
            case '': Operations = this.LandingOption();
            break;
            case 'Deleted' : Operations = this.OnDelete();
            break;
            case 'CanNotDelete' : Operations = this.CanNotDelete();
            break;
            case 'Contact Administrator' :Operations = this.AnyError();
            break;
        }


        return(
            <div className="modal draggable show"  id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                                    <button type="button" onClick={this.Close} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <span className="modal-title" id="myModalLabel">Delete State</span>
                        </div>
                        {Operations}
                    </div>
                </div>
            </div>
            )
    }
});