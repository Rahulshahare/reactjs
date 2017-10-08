window.ReadState = React.createClass({
            getInitialState:function(){
                return({
                    States:[],
                    ButtonState:false,
                    isOpen:false,
                })
            },
            componentDidMount(){
                this.GetData()
               
            },
            GetData:function(){
                $.ajax({
                    url: "http://localhost/oceangreen/admin/api/readState.php?Key=Authority",
                    type : "GET",
                    cache: false,
                    success: function(html)
                        {
                            this.setState({States:JSON.parse(html)});
                            //alert("first"+this.state.States);
                        }.bind(this),
                });
            },
            NewData:function(){
                alert("hello");
                this.GetData()
            },
            toggle:function(){
               // alert(this.state.isOpen);
                this.setState({
                    isOpen:!this.state.isOpen,
                })
            },
           
            

            render:function(){
                return(
                    <div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Showing States
                            <button onClick={this.toggle}  type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                            </div>
                        <div className="panel-body">
                            <ShowAllState AllState={this.state.States} ChangeAppMode={this.props.ChangeAppMode}/>
                        </div>
                    </div>
                    {
                        <AddStateModel 
                            ChangeAppMode={this.props.ChangeAppMode}
                            Refresh={this.GetData}
                            ShowModel={this.state.isOpen}
                            toggle={this.toggle}
                        />
                    }
                    </div>
                );
            },


        });