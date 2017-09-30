window.ReadState = React.createClass({
            getInitialState:function(){
                return({
                    States:[],
                    ButtonState:false,
                })
            },
            componentDidMount(){
                $.ajax({
                    url: "http://localhost/oceangreen/admin/api/readState.php",
                    type : "GET",
                    cache: false,
                    success: function(html)
                        {
                            this.setState({States:JSON.parse(html)});
                            //alert("first"+this.state.States);
                        }.bind(this),
                });
            },
            button:function(){
                return(
                    <button onClick={()=> this.props.ChangeAppMode('Create',null)} type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                )
            },
            AddForm:function(){
                return(
                    <form className="form-inline pull-right">
                        <div className="form-group">
                        <input type="text" className="form-control input-sm" name="skillname" placeholder="Enter skill Name" required="required"/>
                        </div>
                        <button  className="btn btn-success btn-sm addState">Add New Skill</button>
                        <button  className="btn btn-sm btn-danger"><span className="glyphicon glyphicon-remove"></span></button>
                        </form>

                )
            },

            render:function(){
                return(
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Showing States
                            <button onClick={()=> this.props.ChangeAppMode('Create',null)} type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                            </div>
                        <div className="panel-body">
                            <ShowAllState AllState={this.state.States} ChangeAppMode={this.props.ChangeAppMode}/>
                        </div>
                    </div>
                );
            },


        });