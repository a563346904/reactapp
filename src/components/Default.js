import React, {Component} from 'react';
import logo from '../logo.svg';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Route, Switch, Link} from 'react-router-dom';
import '../styles/default.css';
import ReactBasics from '../pages/reactBasics/reactBasics'
import ReactRouter from '../pages/reactRouter/reactRouter'
import Redux from '../pages/redux/redux'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

const MENU = [
    {name: 'React基本', iconType: 'pie-chart', key: '1', routeurl: '/'},
    {name: 'React-router', iconType: 'desktop', key: '2', routeurl: '/reactrouter'},
    {
        name: 'Redux',
        iconType: 'user',
        key: '100',
        child: [
            {name: 'action', key: '3', reuteurl: '/'},
            {name: 'dispatch', key: '4', reuteurl: '/'},
            {name: 'reducer', key: '5', reuteurl: '/'},
            {name: 'store', key: '6', reuteurl: '/'}
        ]
    },
    {
        name: 'Computed',
        iconType: 'team',
        key: '101',
        child: [
            {name: 'redux-saga', key: '7', reuteurl: '/'},
            {name: 'axios&&fetch', key: '8', reuteurl: '/'},
            {name: 'reselector computed', key: '9', reuteurl: '/'},
            {name: 'rnomalizr', key: '10', reuteurl: '/'}
        ]
    },
    {name: 'React-native', iconType: 'file', key: '11', routeurl: '/redux'},
]

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            time: new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString(),
            pathName: 'React基本',
        };
        this.menuClick = this.menuClick.bind(this);
    }


    formSubmenusChild = (obj) => {
        let cHtml = <div></div>;
        let childArray = obj.child;
        if ("undefined" !== typeof(childArray) && childArray.length > 0) {
            cHtml = childArray.map((item, i) => {
                return this.formSubmenusChild(item);
            });
            return <SubMenu key={obj.key}
                            title={<span><Icon type={obj.iconType}/><span>{obj.name}</span></span>}>{cHtml}</SubMenu>
        } else {
            return <Menu.Item routername={obj.name} routeurl={obj.routeurl} key={obj.key}>{obj.name}</Menu.Item>
        }
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    menuClick = (item) => {
        this.setState({
            pathName: item.item.props.routername
        });

        this.props.history.push(item.item.props.routeurl)
    };

    tick() {
        this.setState({
            time: new Date().toLocaleDateString() + '  ' + new Date().toLocaleTimeString()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let menuPath = MENU.map((item, i) => {
            if ("undefined" !== typeof(item.child) && item.child.length > 0) {
                return this.formSubmenusChild(item)
            } else {
                return (
                    <Menu.Item routername={item.name} routeurl={item.routeurl} key={item.key}>
                        <Icon type={item.iconType}/>
                        <span> {item.name} </span>
                    </Menu.Item>
                )
            }
        });
        return (
            <div>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                            <img src={logo} className="App-logo" alt="logo"/> <br/>
                            <span style={{color: 'white', fontSize: '20px'}}>react</span>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.menuClick}>
                            {menuPath}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: ' 0 20px', textAlign: 'right', fontSize: '22px', letterSpacing: '2px'}}>
                            {this.state.time}
                        </Header>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>React</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.pathName}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                <Switch>
                                    <Route exact path="/" component={ReactBasics}/>
                                    <Route path="/reactRouter" component={ReactRouter}/>
                                    <Route path="/redux" component={Redux}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Default