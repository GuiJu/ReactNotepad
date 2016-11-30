/**
 * Created by jutal on 16-11-8.
 */
/*var INFOS = [
 {id: '1', date: '2016-11-8', content: 'content1'},
 {id: '2', date: '2016-11-9', content: 'content2'}
 ];*/

/*整个App*/
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      INFOS: []
    };
    //不要忘记bind()方法对函数的this进行绑定
    this.handleContentSubmit = this.handleContentSubmit.bind(this);
    this.handleContentDelete = this.handleContentDelete.bind(this);
    this.handleContentEdit = this.handleContentEdit.bind(this);
    this.handleContentSelect = this.handleContentEdit.bind(this);
  }

  handleContentSubmit(content) {
    var xmlhttp = new XMLHttpRequest();
    var DataGet;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        DataGet = xmlhttp.responseText;
        DataGet = eval(DataGet);
        for (var i = 0; i < DataGet.length; i++) {
          DataGet[i].date = (new Date(DataGet[i].date)).toDateString();
        }
      }
    }
    content = encodeURI(encodeURI(content));
    xmlhttp.open("GET", "http://10.108.112.67:8080/addData?content=" + content, false);
    xmlhttp.send();
    this.setState({
      INFOS: DataGet
    });
  }

  handleContentDelete(id) {
    var xmlhttp = new XMLHttpRequest();
    var DataGet;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        DataGet = xmlhttp.responseText;
        DataGet = eval(DataGet);
        for (var i = 0; i < DataGet.length; i++) {
          DataGet[i].date = (new Date(DataGet[i].date)).toDateString();
        }
      }
    }
    xmlhttp.open("GET", "http://10.108.112.67:8080/deleteData?id=" + id, false);
    xmlhttp.send();
    this.setState({
      INFOS: DataGet
    });
  }

  handleContentEdit(id, content) {
    var xmlhttp = new XMLHttpRequest();
    var DataGet;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        DataGet = xmlhttp.responseText;
        DataGet = eval(DataGet);
        for (var i = 0; i < DataGet.length; i++) {
          DataGet[i].date = (new Date(DataGet[i].date)).toDateString();
        }
      }
    }
    content = encodeURI(encodeURI(content));
    xmlhttp.open("GET", "http://10.108.112.67:8080/editData?id=" + id + "&content=" + content, false);
    xmlhttp.send();
    this.setState({
      INFOS: DataGet
    });
  }

  handleContentSelect(content) {
    var xmlhttp = new XMLHttpRequest();
    var DataGet;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        DataGet = xmlhttp.responseText;
        DataGet = eval(DataGet);
        for (var i = 0; i < DataGet.length; i++) {
          DataGet[i].date = (new Date(DataGet[i].date)).toDateString();
        }
      }
    }
    content = encodeURI(encodeURI(content));
    xmlhttp.open("GET", "http://10.108.112.67:8080/selectData?content=" + content, false);
    xmlhttp.send();
    this.setState({
      INFOS: DataGet
    });
  }

  componentDidMount() {
    //alert("DidMount");
    var xmlhttp = new XMLHttpRequest();
    var DataGet;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        DataGet = xmlhttp.responseText;
        DataGet = eval(DataGet);
        for (var i = 0; i < DataGet.length; i++) {
          DataGet[i].date = (new Date(DataGet[i].date)).toDateString();
        }
      }
    }
    xmlhttp.open("GET", "http://10.108.112.67:8080/getData", false);
    xmlhttp.send();
    this.setState({
      INFOS: DataGet
    });
  }

  render() {
    //alert("render");
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <NavBar onContentSelect={this.handleContentSelect}/>
            <AddModal onContentSubmit={this.handleContentSubmit}/>
            <PanelList infos={this.state.INFOS} onContentDelete={this.handleContentDelete}
                       onContentEdit={this.handleContentEdit}/>
          </div>
        </div>
      </div>
    );
  }
}

/*单个面板组件——包含其附属模态框*/
class Panel extends React.Component {
  constructor(props){
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.props.onContentDelete(this.props.contentId);
  }

  render() {
    var modalId = "modal" + this.props.contentId;
    var dataTarget = "#" + modalId;
    var onContentEdit = this.props.onContentEdit;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-success">
            <div className="panel-heading">{this.props.heading}</div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-10"><h4>{this.props.content}</h4></div>
                <div className="col-md-2">
                  <center>
                    <button type="button" className="btn btn-default btn-sm" data-toggle="modal"
                            data-target={dataTarget}>Edit
                    </button>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.handleDeleteClick}>Delete
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <EditModal contentId={this.props.contentId} content={this.props.content} onContentEdit={onContentEdit}/>
        </div>
      </div>
    );
  }
}

/*面板列表组*/
class PanelList extends React.Component {
  render() {
    var panels = [];
    var onContentDelete = this.props.onContentDelete;
    var onContentEdit = this.props.onContentEdit;
    this.props.infos.forEach(function (info) {
      panels.push(
        <Panel heading={info.date} content={info.content} contentId={info.id}
               onContentDelete={onContentDelete} onContentEdit={onContentEdit}/>)
    })
    return (
      <div id="panelList">
        {panels}
      </div>
    );
  }
}

/*导航条主体*/
class NavBar extends React.Component {
  render() {
    var onContentSelect = this.props.onContentSelect;
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <NavBarHeader/>
          <NavBarCollapse onContentSelect={onContentSelect}/>
        </div>
      </nav>
    );
  }
}

/*导航条头部*/
class NavBarHeader extends React.Component {
  render() {
    return (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#navbar-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Summery</a>
      </div>
    );
  }
}

/*导航条内容*/
class NavBarCollapse extends React.Component {
  constructor(props){
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.props.onContentSelect(e.target.value);
  }

  render() {
    return (
      <div className="collapse navbar-collapse" id="navbar-collapse">
        <form className="navbar-form navbar-right" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" onChange={this.handleTextChange}/>
          </div>
          <a className="btn btn-default" data-toggle="modal" data-target="#addModal">Add</a>
        </form>
      </div>
    );
  }
}

/*Add模态框*/
class AddModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: " "
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({content: e.target.value});
  }

  //点击submit后的处理函数,其中content来自模态框的state
  handleClick(e) {
    this.props.onContentSubmit(this.state.content);
  }

  render() {
    return (
      <div className="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                className="sr-only">Close</span></button>
              <h4 className="modal-title">Today's summary</h4>
            </div>

            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <label for="inputContent">Today's summary：</label>
                  <textarea type="text" className="form-control" placeholder="Enter today's summary"
                            onChange={this.handleTextChange}/>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleClick} data-dismiss="modal">Submit
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


/*Edit模态框*/
class EditModal extends React.Component{
  /*getInitialState() {
    var defaultContent = this.props.content;
    return {content: defaultContent};
  }*/
  constructor(props){
    super(props);
    this.state = {
      content: this.props.content
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({content: e.target.value});
  }

  //点击submit后的处理函数,其中content来自模态框的state
  handleClick(e) {
    this.props.onContentEdit(this.props.contentId, this.state.content);
  }

  render() {
    var modalId = "modal" + this.props.contentId;
    return (
      <div className="modal fade" id={modalId} tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                className="sr-only">Close</span></button>
              <h4 className="modal-title">Edit today's summary - id:{this.props.contentId}</h4>
            </div>

            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <label for="inputContent">Today's summary：</label>
                  <textarea type="text" className="form-control" placeholder="Enter today's summary"
                            value={this.state.content} onChange={this.handleTextChange}/>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleClick} data-dismiss="modal">Submit
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));

