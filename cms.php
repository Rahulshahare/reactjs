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

        TrowData:function(text,i){
                        return(
                            
                            <tr>
                            <th>{text.id}</th>
                            <td>{text.location_name}</td>
                            <td>{text.active}</td>
                            <td>Edit</td>
                            </tr> 
                        );
                    },
        render:function(){
            return(
                <tbody>
                {  this.props.EditState?alert("Conditional"):
                    
                    this.props.Newstate.map(this.TrowData)
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
                    Edit:true,
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
                this.setState({Edit:true})
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
                                        
                                        {   <TableData EditState={this.state.Edit} Newstate={this.state.Istate}/>}
                                      
                                    </table>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        
        var TableData2 = React.createClass({
            NormalData:function(Slist,edit,delet){
                Slist.map(function(text,i){
                    return(
                        <tr className={text.active==1?'info':'warning'} >
                        <th scopr="row">{text.id}</th>
                        <td>{text.location_name}</td>
                        <td>{text.active==1?'Active':'De-active'}</td>
                        <td>
                            <button onClick={edit} type="button" className="btn btn-xs btn-warning">Edit</button>
                            <button onClick={delet} type="button" className="btn btn-xs btn-danger">Delete</button>
                        </td>
                        </tr>
                    )
                })
            },
            EditionData:function(Slist,save,cancel){
                Slist.map(function(text,i){

                return(
                    <tr className={text.active==1?'info':'warning'} >
                    <th scopr="row">{text.id}</th>
                    <td><input type="email" className="form-control" value={text.location_name} placeholder="Enter email"/></td>
                    <td>
                
                        {text.active==1
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
                        <button onClick={cancel} type="button" className="btn btn-xs btn-default">cancel</button>
                    </td>
                </tr>
                )
            })
            },
            render:function(){
                
                this.props.Istate.map(function(text,i){
                    return(
                        <tr>
                        <th>{text.id}</th>
                        <td>{text.location_name}</td>
                        <td>{text.active}</td>
                        <td>Edit</td>
                        </tr> 
                    );
                })
                    
               
            }
        });       

        ReactDOM.render(<Cms/>,document.getElementById('CmsApp'));

        
    </script>
</html>