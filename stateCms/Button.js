window.CommomButton = React.createClass({
    getInitialState:function(){
        return({
            BtnState:null,
            Align:null,
            onClick:null,
            title:null,
        })
    },
    render:function(){
        var BtnClass
        switch (this.props.BtnType) {
            case 'default': BtnClass = "btn btn-default btn-xs" 
                break;
            case 'primary': BtnClass = "btn btn-primary btn-xs" 
                break;
            case 'success': BtnClass = "btn btn-success btn-xs" 
                break;
            case 'info': BtnClass = "btn btn-info btn-xs" 
                break;
            case 'warning': BtnClass = "btn btn-warning btn-xs" 
                break;
            case 'danger': BtnClass = "btn btn-danger btn-xs" 
                break;
            case 'link': BtnClass = "btn btn-link btn-xs" 
                break;

        }

        
        switch(this.props.Align){
            case 'right': BtnClass = BtnClass +' pull-right'; 
                break;
            case 'left': BtnClass = BtnClass +' pull-left';
                break;
            
        }
        return(
            <button 
                type="button" 
                onClick={this.props.onClick} 
                className={BtnClass}
                disabled={this.props.BtnState}
                title={this.props.title}
            >
            {this.props.BtnName}
            </button>            
        )
    }
});
/*
<CommomButton BtnType={} onClick={} BtnState={} BtnName={} Align={} title={}/>
*/