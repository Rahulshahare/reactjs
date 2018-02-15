window.ShowAllState = React.createClass({
    
                    
                    render:function(){
                        
                        var AllState = this.props.AllState.map(function(text,i){
                            return(
                                <tr key={i} index={i} className={text.active==1?"info":"warning"}>
                                    <th>{text.id}</th>
                                    <td>{text.location_name}</td>
                                    <td>{text.active==1?'Active':'De-active'}</td>
                                    <td>
                                        <CommomButton 
                                            BtnType={"warning"} 
                                            onClick={() => this.props.Editing(text.id,text.location_name,text.active,i)}  
                                            BtnName={"Edit"}
                                        />

                                        <CommomButton 
                                            BtnType={"danger"} 
                                            onClick={() => this.props.Deleting(text.id,text.location_name,i)} 
                                            BtnName={"Delete"}
                                        />
                                        {text.active==1
                                        ?<CommomButton 
                                            BtnType={"danger"} 
                                            onClick={() => this.props.Save(text.id,text.location_name,0,i)} 
                                            BtnName={"Deactive"}
                                        />
                                        :<CommomButton 
                                            BtnType={"primary"} 
                                            onClick={() => this.props.Save(text.id,text.location_name,1,i)} 
                                            BtnName={"active"}
                                        />
                                        }
                                    </td>
                                </tr>
                            )
                        }.bind(this));
                        return(
                            !AllState.length
                            ? <div className='alert alert-danger'>No State Found</div>
                            :
                            <table id="dashbordTable" className="table table-bordered dashbordTable">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>State Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {AllState}
                                </tbody>
                            </table>
                        )
                    }
                });