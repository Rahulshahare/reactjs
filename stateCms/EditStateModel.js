window.EditStateModal = React.createClass({
    getInitialState:function(){
        return({
            StateName:'',
            StateId:'',
            Status:'',
        })
    },
    Close:function(){
        this.props.Hidemodal();
    },
    StateNameChange:function(e){
        this.setState({
            StateName:e.target.value
        })
    },
    OnStatusChange:function(e){
        this.setState({
            Status:e.target.value
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
                            <form>
                                <div className="form-group">
                                        <input  onChange={this.StateNameChange} type="text" 
                                            value={this.props.StateName} className="form-control" 
                                            placeholder="Enter State Name" />
                                </div>
                                <div className="form-group">
                                    <select onChange={this.OnStatusChange} value={this.props.Status} className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Deactive</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});