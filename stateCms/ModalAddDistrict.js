window.ModalAddDistrict = React.createClass({
    getInitialState:function(){
        return({
            States:[],
            BtnName:'Add District',
            BtnState:'disabled',
            StateId:'',
            DistrictName:'',
            Error:'',
            Success:''
        })
    },
    componentDidMount:function(){
        $.ajax({
            url: "http://localhost/oceangreen/admin/api/readState.php?Key=Authority",
            type : "GET",
            cache: false,
            success: function(html)
                {
                    this.setState({States:JSON.parse(html)});
                    //alert("first"+this.state.Districts);
                }.bind(this),
        });
    },  
    Statechange:function(e){
        this.setState({
            StateId:e.target.value
        })
        //alert(this.state.StateId)
    },
    DistrictNameChange:function(e){
        this.setState({
            DistrictName:e.target.value,
            BtnState:'',
        })
    },
    Save:function(){
        
         if(this.state.DistrictName && this.state.StateId){
             this.setState({Error:'',
                             BtnState:'disabled',
                             BtnName:'Adding District',
                         });
         }else{
             this.setState({Error:'You must enter a #District Name',
                             Success:''});
             return false;
         }

        
 
         //alert("Statename is "+this.state.StateName );
        
         //Ajax call
         var dataString = 'DistrictName='+ this.state.DistrictName+'&StateId='+this.state.StateId;
         //alert(dataString);
            
            $.ajax
                 ({
                 type: "POST",
                 url: "http://localhost/oceangreen/admin/api/AddNewDistrict.php",
                 data: dataString,
                 cache: false,
                 success: function(html)
                     {
                         //alert(html);
                         if(html=='Success'){
                             this.setState({Success: this.state.DistrictName+' is Added Successfully',
                                             Error:'',
                                             DistrictName:'',
                                             StateId:'',
                                             BtnState:'disabled',
                                             BtnName:'Add District',})
                                             this.props.Refresh();
                                         
                         }
                         if(html=='Available'){
                             this.setState({Error:this.state.DistrictName+' is already Available',
                                             Success:'',
                                             BtnState:'',
                                             BtnName:'Add District',})
                         }
                         if(html=='SystemDead'){
                             this.setState({Error:'Something Went Wrong'})
                         }
                         
                     }.bind(this),
                 });
     },
    Close:function(){
        this.setState({
            Error:'',
            Success:'',
            DistrictName:'',
            StateId:'',
            BtnState:'disabled',
        })
        this.props.Close()
    },
    Reset:function(){
        this.setState({
            Error:'',
            Success:'',
            DistrictName:'',
            StateId:'',
            BtnState:'disabled',
        })
    },
    
    
    render:function(){
        if(!this.props.ShowModal){
            return null;
        }
            var StateNames = this.state.States.map(function(text,i){
                return(<option key={i} value={text.id}>{text.location_name}</option>)
            })
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
                                    <div className="form-group">
                                        <select onChange={this.Statechange} DefaultValue={this.state.StateId} className="form-control" >
                                            <option value="">Select State</option>
                                            {StateNames}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            onChange={this.DistrictNameChange}
                                            type="text" 
                                            value={this.state.DistrictName} 
                                            className="form-control" 
                                            autocomplete="off" 
                                            autoFocus="true"
                                            required="required"
                                            placeholder="Enter State Name"
                                        />
                                    </div>
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