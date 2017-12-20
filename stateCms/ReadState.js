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
                    index:'',
                    
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
            Deleting:function(id,Name,i){
                
                //alert("iam working"+ id);
                this.setState({
                    StateId:id,
                    StateName:Name,
                    isOpenDelete:!this.state.isOpenDelete,
                    index:i
                })
            },
            DeletingState:function(id,Name,i){
                var arr = this.state.States;
                arr.splice(i,1);
                this.setState({States: arr});
            },
            toggleDeleteModal:function(){
                this.setState({
                    isOpenDelete:!this.state.isOpenDelete
                })
            },
            Editing:function(id,Name,status,i){
                //alert(id+Name+status);
                
                this.setState({
                    StateId:id,
                    StateName:Name,
                    Status:status,
                    index:i,
                    isOpenEdit:!this.state.isOpenEdit,
                })
                
            },
            EditingYes:function(id,text,i){
                var arr = this.state.States;
                arr[i]['location_name'] = text;
                this.setState({States: arr});
                //alert("its a local array"+arr['id']==45);
                function findCherries(fruit) { 
                    return fruit.id === id;
                }
                
                var NewData = (arr.find(findCherries)); 
               // alert(NewData['location_name']);

            },
            toggleEditModal:function(){
                this.setState({
                    isOpenEdit:!this.state.isOpenEdit
                })
            },
            Save:function(id,text,status,i){
                var arr = this.state.States;
                arr[i]['location_name'] = text;
                arr[i]['active']=status;
                this.setState({States: arr});
                //alert(JSON.stringify(arr));
                var dataString = 'StateId='+ id+'&statName='+text+'&status='+status;
                
                    $.ajax({
                        url: "http://localhost/oceangreen/admin/api/UpdateState.php",
                        type : "POST",
                        data:dataString,
                        cache: false,
                        success: function(html)
                            {
                                    //alert(html);
                                
                
                            }.bind(this),
                    });

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
                                    Save={this.Save}
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
                                index={this.state.index}
                                DeletingState={this.DeletingState}
                                Hidemodal={this.toggleDeleteModal}
                                Refresh={this.GetData}
                                States={this.state.States}
                            />
                        }
                        {
                            <EditStateModal
                                ShowModel={this.state.isOpenEdit}
                                StateName={this.state.StateName}
                                StateId={this.state.StateId}
                                Status={this.state.Status}
                                index={this.state.index}
                                EditingYes={this.EditingYes}
                                Hidemodal={this.toggleEditModal}
                                Refresh={this.GetData}
                            />
                        }
                    </div>
                );
            },


        });