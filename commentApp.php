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
                return({editing:false})
            },
            Edit:function(){
                alert("you click #Edit button");
            },
            Remove:function(){
                alert("you click #Remove button");
            },
            Save:function(){
                alert("you click #save Button");
            },
            Cancel:function(){
                alert("you click #Cancel Button");
            },
            Comment:function(){
                <div className="well">
                        <h4>{this.props.CommentText}</h4>
                        <br/>
                        <button onClick={this.Edit} className="btn btn-primary MarginRight">Edit</button>
                        <button onClick={this.Remove}className="btn btn-danger">Remove</button>
                </div>
            },
            render:function(){
                return(
                    <div className="well">
                        <input type="text" className="form-control" value={this.props.CommentText} placeholer="Add your comment"/>
                        <h4></h4>
                        <br/>
                        <button onClick={this.Save} className="btn btn-success MarginRight">Save</button>
                        <button onClick={this.Cancel}className="btn btn-warning">Cancel</button>
                    </div>
                )
            }
        });
        ReactDOM.render(<Comment CommentText="Hey this is new text" />, document.getElementById('App'));
        </script>
    </body>
    </html>