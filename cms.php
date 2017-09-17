<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CMS System</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/react.js"></script>
    <script src="js/react-dom.min.js"></script>
    <script src="js/browser.min.js"></script>
    <style type="text/css">
        .btn{
            margin-right:2px;
        }
    </style>
  </head>
    <body>
        <div id="CmsApp"></div>
    </body>
    <script type="text/babel">
    var TableData = React.createClass({
        
        Click:function(){
            //alert("hello");
            this.props.EditFunction();
        },
        
        render:function(){
            return(
                <tbody>
                {  
                    this.props.Newstate.map(function(text,i){
                    return(
                        <tr key={i}>
                        <th>{text.id}</th>
                        <td>{text.location_name}</td>
                        <td>{text.active==1?'Active':'Deactive'}</td>
                        <td >
                            <button onClick={this.props.EditFunction} type="button" className="btn btn-xs btn-warning">Edit</button>
                            <button  type="button" className="btn btn-xs btn-danger">Delete</button>
                        </td>
                        </tr> 
                    );
                },this)
                    
                   
                }
                </tbody>
            )
        }
    }); 
        var Cms = React.createClass({
            
            getInitialState:function(){
                return({
                    Istate:[], 
                    id:'',
                    active:'',
                    stateName:'',
                    Edit:false,
                })
            },
                

           
            componentDidMount(){
                       $.ajax({
                            url: "http://localhost/oceangreen/admin/api/readState.php",
                            type : "GET",
                            cache: false,
                            success: function(html)
                                {
                                    this.setState({Istate:JSON.parse(html)});
                                    //alert("first"+this.state.Istate);
                                }.bind(this),
                        });
            },

            
            Edit:function(){
                alert("Edit Click");
                //this.setState({Edit:true})
            },
            Save:function(){
                this.setState({Edit:false})
            },
            Cancel:function(){
                this.setState({Edit:false})
            },
            Delete:function(){
                alert("Delete Click");
            },
            
            
            
            render:function(){
                return(
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <h1 className="text-center">Manage States</h1>
                                <hr/>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#id</th>
                                                <th>State Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        
                                        {   var Children = this.state.Istate.map(function(text, i) {
                                                    return (
                                                        <TableData2 
                                                        AppState={this.state.Edit}
                                                        Edit={this.Edit} 
                                                        Save={this.Save}
                                                        key={text.id}
                                                        Sname={text.location_name}
                                                        active={text.active}
                                                        />
                                                    );
                                                },this);
                                            <TableData 
                                            EditState={this.state.Edit} 
                                            Newstate={this.state.Istate}
                                            EditFunction={this.Edit}/>
                                        }
                                      
                                    </table>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        
        var TableData2 = React.createClass({
            NormalData:function(id,Sname,active,edit){
                
                    return(
                        <tr className={active==1?'info':'warning'} >
                        <th scopr="row">{id}</th>
                        <td>{Sname}</td>
                        <td>{active==1?'Active':'De-active'}</td>
                        <td>
                            <button onClick={edit} type="button" className="btn btn-xs btn-warning">Edit</button>
                            <button  type="button" className="btn btn-xs btn-danger">Delete</button>
                        </td>
                        </tr>
                    )
                
            },
            EditionData:function(id,Sname,active,save,cancel){
                

                return(
                    <tr className={active==1?'info':'warning'} >
                    <th scopr="row">{id}</th>
                    <td><input type="email" className="form-control" value={location_name} placeholder="Enter email"/></td>
                    <td>
                
                        {active==1
                        ?   <select className="form-control"> 
                                <option value="1" selected="selected">Active</option>
                                <option value="0">De-active</option>
                            </select>
                        :<select className="form-control"> 
                            <option value="1" >Active</option>
                            <option value="0" selected="selected">De-active</option>
                            </select>
                         
                         }   
                        
                    </td>
                    
                    <td>
                        <button onClick={save} type="button" className="btn btn-xs btn-success">Save</button>
                        <button  type="button" className="btn btn-xs btn-default">cancel</button>
                    </td>
                </tr>
                )
            
            },
            render:function(){
                                                        
                if(this.props.AppState){
                    return EditionData(this.props.key,this.props.Sname,this.props.active,this.props.Save);
                }else{
                    return NormalData(this.props.key,this.props.Sname,this.props.active,this.props.Edit);
                    return ();
                }
                    
               
            }
        });       

        ReactDOM.render(<Cms/>,document.getElementById('CmsApp'));

        
    </script>
</html>