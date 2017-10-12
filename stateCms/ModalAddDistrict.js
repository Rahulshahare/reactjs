windows.ModalAddDistrict = React.createClass({
    render:function(){
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
                                ? <AlertBox  AlertType={"danger"} AlertText={this.state.Error} AlertDismiss={this.Reset}/>
                                :null
                            }
                            {this.state.Success
                                ? <AlertBox  AlertType={"success"} AlertText={this.state.Success} AlertDismiss={this.Reset}/>
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
                        <CommomButton BtnType={"primary"} onClick={this.Save} BtnState={this.state.BtnState} BtnName={this.state.BtnName}/>
    
                        <CommomButton BtnType={"default"} onClick={this.Close} BtnState={null} BtnName={"Cancel"}/> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});