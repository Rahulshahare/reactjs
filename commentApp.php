<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ATM Machine</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/react.min.js"></script>
        <script src="js/react-dom.min.js"></script>
        <script src="js/react-with-addons.js"></script>
        <script src="js/browser.min.js"></script>

        <style type="text/css">
        .MarginRight{
            margin-right:10px;
        }
        
        </style>

    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <h1>Comments</h1>
                    <div id="App"></div>
                </div>
            </div>
        </div>
                                    
        <script type="text/babel">
        var Comment = React.createClass({

            getInitialState:function(){
                return({Editing:false})
            },

            Edit:function(){
                //alert("you click #Edit button");
                this.setState({Editing:true})
            },
            Remove:function(){
                alert("you click #Remove button");
            },
            Save:function(){
                alert("saving here");
                this.setState({Editing:false})
            },
            Cancel:function(){
                //alert("you click #Cancel Button");
                this.setState({Editing:false})
            },
            CommentNormal:function(){
                return(<div className="well">
                            <h4>{this.props.children}</h4>
                            <br/>
                            <button onClick={this.Edit} className="btn btn-primary btn-sm MarginRight">Edit</button>
                            <button onClick={this.Remove}className="btn btn-danger btn-sm">Remove</button>
                       </div>)
            },
            CommentForm:function(){
              return ( <div className="well">
                        <textarea ref="newText" className="form-control" defaultValue={this.props.children}/>
                        <br/>
                        <button onClick={this.Save} className="btn btn-success btn-sm MarginRight">Save</button>
                        <button onClick={this.Cancel}className="btn btn-warning btn-sm">Cancel</button>
                     </div>
                     )
            },
            render:function(){
                
                if(this.state.Editing){
                    return this.CommentForm();
                }else{
                    return this.CommentNormal();
                }
                     
            }
        });
        
        ReactDOM.render(
                        <div>
                        <Comment>hello</Comment>
                        <Comment>wiz kumar</Comment>
                        </div>, document.getElementById('App'));
       
        </script>
    </body>
    </html>