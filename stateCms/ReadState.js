window.ReadState = React.createClass({
            getInitialState:function(){
                return({
                    States:[],
                    ButtonState:false,
                    show:"ok",
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
           
            

            render:function(){
                return(
                    <div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Showing States
                            <button data-toggle="modal" data-target="#myModal"  type="button" className="btn btn-info btn-xs pull-right">Add New State</button>                    
                            </div>
                        <div className="panel-body">
                            <ShowAllState AllState={this.state.States} ChangeAppMode={this.props.ChangeAppMode}/>
                        </div>
                    </div>
                    {<AddStateModel 
                        
                        ChangeAppMode={this.props.ChangeAppMode}
                        Refresh={this.GetData}/>}
                    </div>
                );
            },


        });