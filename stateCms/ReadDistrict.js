window.ReadDistrict = React.createClass({
    getInitialState:function(){
        return({
            Districts:[],
            isOpenAdd:false,
            SlicedDistricts:[],
            CurrentPage:1,
            PreState:'disabled',
            NextState:'disabled',
            TotalPage:'',
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
                        //alert(html);
                    this.setState({Districts:JSON.parse(html)});
                    //alert("first"+this.state.Districts);
                    this.Pagination();
                }.bind(this),
        });
    },
    IdByAsc:function(){
        var arr = this.state.Districts;
        var sort = arr.sort(function (a, b) {
            return a.id - b.id;
          });
          var sliced = sort.slice(0, 5); 

          this.setState({
            SlicedDistricts:sliced,
            CurrentPage:1
        })
    },
    IdByDesc:function(){
        var arr = this.state.Districts;
        var sort = arr.sort(function (a, b) {
            return b.id - a.id;
          });
          var sliced = sort.slice(0, 5); 

          this.setState({
            SlicedDistricts:sliced,
            CurrentPage:1
        })
    },
    NameByAsc:function(){
        var arr = this.state.Districts;
        var sort = arr.sort(function (a, b) {
                var nameA = a.location_name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.location_name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                return -1;
                }
                if (nameA > nameB) {
                return 1;
                }
            
                // names must be equal
                return 0;
          });
          var sliced = sort.slice(0, 5); 

          this.setState({
            SlicedDistricts:sliced,
            CurrentPage:1
        })
    },
    NameByDesc:function(){
        var arr = this.state.Districts;
        var sort = arr.sort(function (a, b) {
            var nameA = a.location_name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.location_name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
            return -1;
            }
            if (nameA < nameB) {
            return 1;
            }
        
            // names must be equal
            return 0;
          });
          var sliced = sort.slice(0, 5); 

          this.setState({
            SlicedDistricts:sliced,
            CurrentPage:1
        })
    },
    Search:function(e){
        var query = e.target.value;
        var arr = this.state.Districts;
        arr.forEach(function(element) {
            console.log('id ='+element['id']);
            console.log('Name ='+element['location_name']);
        });
        
        /*function filterItems(query) {
            return arr.filter(function(el) {
                return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
          }
          
          console.log(filterItems(query)); */
    },
    Pagination:function(){
        var arr = this.state.Districts;
        var total = arr.length;
        var perpage=5;
        var pages = Math.ceil(total/perpage); 
            this.setState({
                TotalPage:pages,
            })
        //console.log(sort);
            if(pages>1){
                this.setState({
                    NextState:'',
                })
            }

            if(this.state.CurrentPage==1){
                var sliced = arr.slice(0, 5);   
            }

           this.setState({
            SlicedDistricts:sliced,
        })

    },
    Previous:function(){
        this.StateFunction(),
        this.setState({
            CurrentPage:this.state.CurrentPage-1,
            NextState:'',
        })

        
    },
    Next:function(){
        this.StateFunction();
        this.setState({
            CurrentPage:this.state.CurrentPage+1,
            PreState:'',
        })

        
    },
    Slicing:function(){
        var arr = this.state.Districts;
            if(this.state.CurrentPage==1){
                var sliced = arr.slice(0, 5);
            }
            if(this.state.CurrentPage==2){
                var sliced = arr.slice(5, 10);
            }
            
            this.setState({
                SlicedDistricts:sliced,
            })
         
    },
    StateFunction:function(){

        this.Slicing();
        if(this.state.CurrentPage===1){
            this.setState({
                PreState:'disabled',
            })
        }

        if(this.state.CurrentPage===this.state.TotalPage){
            this.setState({
                NextState:'disabled',
            })
        }
    },
    toggleAddModel:function(){
        var arr = this.state.Districts;
        var sliced = arr.slice(5, 10);
        

        //alert(L);
        
        this.setState({
            isOpenAdd:!this.state.isOpenAdd,
            CurrentPage:this.state.CurrentPage+1,
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
                        <div className="text-right">
                            <input onChange={this.Search} type="text" class="form-control"  placeholder="Search here"/>
                            <div className="btn-group">
                                <button type="button" className="btn btn-default btn-xs dropdown-toggle"  data-toggle="dropdown" aria-expanded="false">Sort</button>
                                   
                                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                    <li><a onClick={this.IdByAsc}>Id by Asc</a></li>
                                    <li><a onClick={this.IdByDesc}>Id by Desc</a></li>
                                    <li className="divider"></li>
                                    <li><a onClick={this.NameByAsc}>Name by Asc</a></li>
                                    <li><a onClick={this.NameByDesc}>Name by Desc</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </div>
                        </div>
                        <ShowAllDistrict 
                            AllDistrict={this.state.SlicedDistricts}  
                            ChangeAppMode={this.props.ChangeAppMode}
                            Deleting={this.Deleting}
                            Editing={this.Editing}
                        />
                        <div className="text-center">
                            <button type="button" onClick={this.Previous} className="btn btn-info btn-xs" disabled={this.state.PreState}><span className="glyphicon glyphicon-chevron-left"></span></button>
                            <button type="button" className="btn btn-primary btn-xs">{this.state.CurrentPage}</button>
                            <button type="button" onClick={this.Next}  className="btn btn-info btn-xs" disabled={this.state.NextState}><span className="glyphicon glyphicon-chevron-right"></span></button>
                        
                        </div>
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