window.ShowAllState = React.createClass({
    
                    
                    render:function(){
                        
                        var AllState = this.props.AllState.map(function(text,i){
                            return(
                                <tr key={i} index={i} className={text.active==1?"info":"warning"}>
                                    <th>{text.id}</th>
                                    <td>{text.location_name}</td>
                                    <td>{text.active==1?'Active':'De-active'}</td>
                                    <td>
                                        <button onClick={() => this.props.ChangeAppMode('Edit',text.id)} className="btn btn-xs btn-warning">Edit</button>
                                        <button onClick={() => this.props.ChangeAppMode('Delete',text.id)} className="btn btn-xs btn-danger">Delete</button>
                                        
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