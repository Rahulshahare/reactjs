window.ShowAllDistrict = React.createClass({
    
                    
                    render:function(){
                        
                        var AllDistrict = this.props.AllDistrict.map(function(text,i){
                            return(
                                <tr key={i} index={i} className={text.active==1?"info":"warning"}>
                                    <th>{text.id}</th>
                                    <td>{text.location_name}</td>
                                    <td>{text.active==1?'Active':'De-active'}</td>
                                    <td>
                                        <CommomButton 
                                            BtnType={"warning"} 
                                            onClick={() => this.props.Editing(text.id,text.location_name,text.active)}  
                                            BtnName={"Edit"}
                                        />

                                        <CommomButton 
                                            BtnType={"danger"} 
                                            onClick={() => this.props.Deleting(text.id,text.location_name)} 
                                            BtnName={"Delete"}
                                        />
                                    </td>
                                </tr>
                            )
                        }.bind(this));
                        return(
                            !AllDistrict.length
                            ? <div className='alert alert-danger'>No District Found</div>
                            :
                            <table id="dashbordTable" className="table table-bordered dashbordTable">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>District Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {AllDistrict}
                                </tbody>
                            </table>
                        )
                    }
                });