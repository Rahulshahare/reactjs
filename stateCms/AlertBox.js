window.AlertBox = React.createClass({
    
    render:function(){
        var AlertClass
        switch (this.props.AlertType) {
            case 'danger': AlertClass = "alert alert-danger alert-dismissible";
                break;
            case 'success': AlertClass = "alert alert-success alert-dismissible";
                break;
            case 'info': AlertClass = "alert alert-info alert-dismissible";
                break;
             case 'warning': AlertClass = "alert alert-warning alert-dismissible";
                break;
        }
        return(
            <div className={AlertClass} role="alert">
                <button onClick={this.props.AlertDismiss} type="button" className="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {this.props.AlertText}
            </div>
        )
    }
});

//<AlertBox  AlertType={} AlertText={} AlertDismiss={}/>