var ReadState = React.createClass({
    getInitialState:function(){
        return({
            States:[],
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
                     alert("first"+this.state.States);
                 }.bind(this),
         });
    },

    render:function(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">SHowing States</div>
                <div className="panel-body">
                    <ShowAllState AllState={this.state.States} ChangeAppMode={this.props.ChangeAppMode}/>
                </div>
            </div>
        );
    },


});