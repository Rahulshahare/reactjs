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
        var arr = this.state.Districts;
        var L =arr[1]['id'];
        var NewArr;
        var obj = {
            length: 0,
        
            addElem: function addElem(elem) {
                // obj.length is automatically incremented 
                // every time an element is added.
                [].push.call(this, elem);
            }
        };
        
       
        console.log(obj.length);

        for (var index = 0; index < 4; index++) {
            obj.addElem(arr[index]);
            
            
        }

        alert(L);
        console.log(obj);
        this.setState({
            isOpenAdd:!this.state.isOpenAdd
        })
    },
    render:function(){
        return(
            <div>
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
                <ModalAddDistrict
                ShowModal = {this.state.isOpenAdd}
                Close={this.toggleAddModel}
                Refresh = {this.GetDistrictData}
                DistrictArray={this.state.Districts}
                />
            </div>
        )
    }
});