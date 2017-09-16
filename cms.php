<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CMS System</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/react.min.js"></script>
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
            Edit:function(){
                alert("Edit Click");
            },
            Delete:function(){
                alert("Delete Click");
            },
            Atr:function(id,active,name){
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
                                       {
                                        this.state.Istate.map(function(text,i){
                                            this.Atr(text.id,text.active,text.location_name)
                                                        
                                        })
                                        
                                       }
                                                                
                                                           
                                        
                                            
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                )
            }
        });
        ReactDOM.render(<Cms/>,document.getElementById('CmsApp'));
    </script>
</html>