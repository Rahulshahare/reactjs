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
        var Cms = React.createClass({
            getInitialState:function(){
                return{
                    Istate:[], 
                    id:'',
                    active:'',
                    stateName:'',
                    Edit:false,
                }
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
            NormalData:function(id,active,name){
                return(
                <tr className={active==1?'info':'warning'} >
                    <th scopr="row">{id}</th>
                    <td>{name}</td>
                    <td>{active==1?'Active':'De-active'}</td>
                    <td>
                        <button onClick={this.Edit} type="button" className="btn btn-xs btn-warning">Edit</button>
                        <button onClick={this.Delete} type="button" className="btn btn-xs btn-danger">Delete</button>
                    </td>
                </tr>
                )
            },
            
            EditionData:function(id,active,name){
                return(
                    <tr className={active==1?'info':'warning'} >
                    <th scopr="row">{id}</th>
                    <td><input type="email" className="form-control" value={name} placeholder="Enter email"/></td>
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
                        <button onClick={this.Save} type="button" className="btn btn-xs btn-success">Save</button>
                        <button onClick={this.Cancel} type="button" className="btn btn-xs btn-default">cancel</button>
                    </td>
                </tr>
                )
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
                                        <tbody>
                                       {this.state.Edit
                                        ?this.EditionData(this.props.id,this.props.active,this.props.Name)
                                        :this.NormalData(this.props.id,this.props.active,this.props.Name)
                                        }
                                                                
                                                           
                                        
                                            
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        
        var PlayingWithData = React.createClass({
            getInitialState:function(){
                return{
                    Istate:[]
                }
            },
            componentDidMount(){
                       $.ajax({
                            url: "http://localhost/oceangreen/admin/api/readState.php",
                            type : "GET",
                            cache: false,
                            success: function(html)
                                {
                                    this.setState({Istate:JSON.parse(html)});
                                }.bind(this),
                        });
            },

            render:function(){
                
                    this.state.Istate.map(function(text,i){
                        return(<div><Cms  key={i} id={text.id} active={text.active} Name={text.location_name}/></div>);
                    })
            
            }
        });
        

        ReactDOM.render(<PlayingWithData/>,document.getElementById('CmsApp'));

        
    </script>
</html>