window.ReadDistrict = React.createClass({
    getInitialState:function(){
        return({
            Districts:[],
            isOpenAdd:false,
        })
    },
    componentDidMount(){
        this.GetDistrictData()
    },
    GetDistrictData:function(){
        $.ajax({
            url: "http://localhost/oceangreen/admin/api/readDistrict.php?Key=Authority",
            type : "GET",
            cache: false,
            success: function(html)
                {
                    this.setState({Districts:JSON.parse(html)});
                    //alert("first"+this.state.Districts);
                }.bind(this),
        });
    },
    toggleAddModel:function(){
        this.setState({
            isOpenAdd:!this.state.isOpenAdd
        })
    },
    render:function(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Showing States
                    <CommomButton 
                        BtnType={"primary"} 
                        onClick={this.toggleAddModel}  
                        BtnName={"Add New District"}
                        Align={"right"}
                    />
                    </div>
                <div className="panel-body">
                    <ShowAllDistrict 
                        AllDistrict={this.state.Districts}  
                        ChangeAppMode={this.props.ChangeAppMode}
                        Deleting={this.Deleting}
                        Editing={this.Editing}
                    />
                </div>
            </div>
        )
    }
});