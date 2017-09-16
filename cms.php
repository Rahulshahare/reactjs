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
  </head>
    <body>
        <div id="CmsApp"></div>
    </body>
    <script type="text/babel">
        var Cms = React.createClass({
            getInitialState:function(){
                return{
                    Istate:[], 
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
            CheckActiveState:function(active){
                if(active==1){
                    return(<span className="label label-info">Active</span>);
                }else{
                    return(<span className="label label-warning">De-active</span>);
                }
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
                                                        return(
                                                                <tr className={text.active==1?'info':'warning'} key={i}>
                                                                <th scopr="row">{text.id}</th>
                                                                <td>{text.location_name}</td>
                                                                <td>{text.active==1?'Active':'De-active'}</td>
                                                                <td>On go</td>
                                                                </tr>
                                                                );
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