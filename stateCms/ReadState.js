window.ReadState = React.createClass({
            getInitialState:function(){
                return({
                    States:[],
                    isOpenAdd:false,
                    StateId:'',
                    StateName:'',
                    Status:'',
                    isOpenDelete:false,
                    isOpenEdit:false,
                    
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
                            //alert("first"+this.state.States);
                        }.bind(this),
                });
            },
            NewData:function(){
                alert("hello");
                this.GetData()
            },
            toggle:function(){
               // alert(this.state.isOpenAdd);
                this.setState({
                    isOpenAdd:!this.state.isOpenAdd,
                })
            },
            Deleting:function(id,Name){
                //alert("iam working"+ id);
                this.setState({
                    StateId:id,
                    StateName:Name,
                    isOpenDelete:!this.state.isOpenDelete,
                })
            },
            toggleDeleteModal:function(){
                this.setState({
                    isOpenDelete:!this.state.isOpenDelete
                })
            },
            Editing:function(id,Name,status){
                //alert(id+Name+status);
                
                this.setState({
                    StateId:id,
                    StateName:Name,
                    Status:status,
                    isOpenEdit:!this.state.isOpenEdit,
                })
                
            },
            toggleEditModal:function(){
                this.setState({
                    isOpenEdit:!this.state.isOpenEdit
                })
            },
           
            render:function(){
                return(
                    <div>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                Showing States
                                <CommomButton 
                                    BtnType={"primary"} 
                                    onClick={this.toggle}  
                                    BtnName={"Add New State"}
                                    Align={"right"}/>
                    
                            </div>
                            <div className="panel-body">
                                <ShowAllState 
                                    AllState={this.state.States}  
                                    ChangeAppMode={this.props.ChangeAppMode}
                                    Deleting={this.Deleting}
                                    Editing={this.Editing}
                                />
                            </div>
                        </div>
                        {
                            <AddStateModel 
                                ChangeAppMode={this.props.ChangeAppMode}
                                Refresh={this.GetData}
                                ShowModel={this.state.isOpenAdd}
                                toggle={this.toggle}
                            />
                        }
                        {
                            <DeleteStateModel
                                ShowModel={this.state.isOpenDelete}
                                StateName={this.state.StateName}
                                StateId={this.state.StateId}
                                Hidemodal={this.toggleDeleteModal}
                                Refresh={this.GetData}
                            />
                        }
                        {
                            <EditStateModal
                                ShowModel={this.state.isOpenEdit}
                                StateName={this.state.StateName}
                                StateId={this.state.StateId}
                                Status={this.state.Status}
                                Hidemodal={this.toggleEditModal}
                                Refresh={this.GetData}
                            />
                        }
                    </div>
                );
            },


        });