window.DeleteState = React.createClass({
                getInitialState:function(){
                    return({
                        StateId:this.props.StateId,
                        Error:'',
                    })
                },
                componentDidMount(){
                   /* alert("Are you sure want to delete state of id "+this.state.StateId);
                    if(confirm("Are you sure want to delete state of id "+this.state.StateId)){

                    }else{
                        return this.Goback();
                    }*/
                },
                Goback:function(){
                    this.props.ChangeAppMode('Read',null);
                },
                DeleteState:function(){
                    //alert("Deleting State");
                    var dataString = 'StateId='+ this.state.StateId;

                    $.ajax({
                        url: "http://localhost/oceangreen/admin/api/DeleteState.php",
                        type : "POST",
                        data:dataString,
                        cache: false,
                        success: function(html)
                            {
                                //alert(html);
                                this.setState({
                                    Error:html
                                })
                                
                                

                            }.bind(this),
                    });
                },
                LandingOption:function(){
                    return(
                        <div className="form-group">
                            Are you sure want to delete State?
                            <button onClick={this.DeleteState}type="button" className="btn btn-danger btn-sm">Yes</button>
                            <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-info btn-sm">No</button>
                        </div>
                    )
                },
                DeletedState:function(){
                    return(
                        <div className="form-group">
                            State is Deleted.
                            <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-info btn-sm">Back to States</button>
                        </div>
                    )
                },
                CanNotDelete:function(){
                    return(
                        <div className="form-group">
                            States have Districts so, We are unable to delete state now
                            <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-info btn-sm">Back to States</button>
                        </div>
                    )
                },
                SomeError:function(){
                    return(
                        <div className="form-group">
                            Some internal Server Error Occured.
                            <button onClick={()=>this.props.ChangeAppMode('Read',null)} type="button" className="btn btn-info btn-sm">Back to States</button>
                        </div>
                    )
                },

                render:function(){
                    var Operations;
                    switch(this.state.Error){
                        case '': Operations = this.LandingOption();
                        break;
                        case 'Deleted' : Operations = this.DeletedState();
                        break;
                        case 'CanNotDelete' : Operations = this.CanNotDelete();
                        break;
                        case 'Contact Administrator' :Operations = this.SomeError();
                        break;
                    }
                   return(
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Delete State
                        </div>
                        <div className="panel-body">
                            <div className="col-md-6">
                                {Operations}
                            </div>
                        </div>
                    </div>
                   )
                }
            });