import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined,

    AppstoreOutlined,
    ContainerOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown, Space, Tooltip, message } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import "./HomePage2.scss"
const { Header, Sider, Content } = Layout;

const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items2 = [
    {
        label: 'My Profile',
        key: '1',
        // icon: <UserOutlined />,
    },
    {
        label: 'My CVs',
        key: '2',
        // icon: <UserOutlined />,
    },
    {
        label: 'My Applications',
        key: '3',
        // icon: <UserOutlined />,
    },
    {
        label: 'My Interviews',
        key: '4',
        // icon: <UserOutlined />,
    },
    {
        label: 'My Events',
        key: '4',
        // icon: <UserOutlined />,
    },
    {
        label: 'Log out',
        key: '4',
        // icon: <UserOutlined />,
    },
];
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Account', 'sub1', <MailOutlined />, [
        getItem('View all acounts', '1'),
        getItem('View blacklist', '2')
    ]),
    getItem('Recruitment', 'sub2', <AppstoreOutlined />, [
        getItem('View all positions', '3'),
        getItem('Create new position', '4')
    ]),
    getItem('Interview', 'sub3', <AppstoreOutlined />, [
        getItem('View all interviews', '5'),
        getItem('Create new interview', '6')
    ]),
    getItem('Question', 'sub4', <AppstoreOutlined />, [
        getItem('View all questions', '7'),
        getItem('Create new question', '8')
    ]),
    getItem('Event', 'sub5', <AppstoreOutlined />, [
        getItem('View all events', '9'),
        getItem('Create new event', '10')
    ]),
];
const menuProps = {
    items: items2,
    onClick: handleMenuClick,
};

const DropdownAvatar = () => (
    <div style={{ marginRight: "10px" }}>
        <Space wrap>
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                User Name
            </Dropdown.Button>
        </Space>
    </div>
);

const HomePage2 = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    let company = searchParams.get("company")
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const flag80 = collapsed == true || company == "false"
    console.log("flag80: ", flag80)
    const bonusStyle = flag80 ? {
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        border: "1px solid black",
        borderRadius: "25px",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
    } : {
        marginTop: '24px',
        marginBottom: '24px',
        marginLeft: '16px',
        marginRight: '16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        border: "1px solid black",
        borderRadius: "25px"
    }
    return (
        <Layout>
            {company == "true" ? <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </Sider> : null}
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {company == "true" ? <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        /> : null}
                        <div style={{ width: "60%", display: "flex", justifyContent: "space-around" }}>
                            <span style={{ cursor: "pointer" }}><strong>Home</strong></span>
                            <span style={{ cursor: "pointer" }}><strong>Recruitment</strong></span>
                            <span style={{ cursor: "pointer" }}><strong>Event</strong></span>
                        </div>
                        <DropdownAvatar ></DropdownAvatar>
                    </div>
                </Header>
                <Content
                    style={bonusStyle}
                >
                    {/* <div>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat illo hic officia iure ex vitae fugit sed dolor. Consequatur, autem! Quia consectetur neque inventore. Veniam unde maxime perferendis fuga itaque.lorem
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio voluptatibus nostrum libero quis reiciendis sequi ullam labore veritatis perferendis, fugiat exercitationem, deleniti aut accusantium eaque magni molestiae cum voluptatem adipisci.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi doloribus sunt fugiat officia labore non, atque eos nam aliquid possimus dolore tempora recusandae nemo commodi! Illo consectetur ducimus eos.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In, totam obcaecati tempora nulla accusantium ut explicabo eos! Ex, alias inventore. Qui ipsum cum dolor reiciendis laborum modi exercitationem tenetur sint!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae inventore nesciunt consequuntur, itaque dignissimos sit quibusdam sapiente consequatur aspernatur, ratione illo ex ipsum autem nam praesentium incidunt maxime necessitatibus? Vitae?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nemo doloribus perferendis illo voluptatem laborum cupiditate ipsum aut cum perspiciatis? Hic sapiente ipsa laudantium facilis dicta corrupti, veritatis ullam. Ipsa?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, dicta dolor sequi architecto necessitatibus, consequuntur ab dolorum molestias vero ratione impedit cumque saepe perferendis suscipit iure sed rem excepturi eaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima natus ut impedit obcaecati perferendis nihil aperiam adipisci hic accusamus aut error a illo voluptas magni, vel optio harum mollitia? Voluptatibus?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla consequatur beatae illum distinctio accusamus consequuntur quia, commodi, odio provident doloremque assumenda id vero impedit vitae placeat, ab mollitia sint fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia saepe beatae corporis nobis quam dolorum est veritatis nihil itaque doloremque, consequatur consectetur aliquam quasi commodi harum, earum veniam amet natus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas veniam consequuntur qui eos in cum? Atque hic ex sint iure veniam, expedita assumenda quas repudiandae inventore ratione, alias suscipit molestiae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, quam quos dolorum est dicta veniam molestiae nobis. Error iure, ut saepe dicta consequuntur ipsam magnam, laudantium deleniti, libero quisquam at?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptatem deleniti fugit veritatis consequuntur voluptate tempora, amet harum ullam atque asperiores soluta suscipit cumque delectus sequi praesentium dolore aliquam et!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum delectus reprehenderit quos ad blanditiis minus, officia cupiditate doloribus, quod voluptatem beatae, maiores voluptate similique reiciendis? Labore quibusdam nostrum officia ipsum?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae quas, doloremque tempore consequatur maiores quos, nulla quod incidunt ut est nam debitis facere sint, similique dicta libero! Exercitationem, voluptatum cum!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, non perspiciatis minus voluptatum adipisci, eum mollitia corporis quibusdam eius qui animi velit repudiandae debitis, repellendus dolore et totam tenetur eligendi!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi distinctio dolore ad voluptatem hic fuga minus modi debitis ut cupiditate nisi molestiae totam, facilis consectetur, velit quos dolorem nobis nihil.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque eligendi quo quia eius recusandae. Error, ad voluptas corrupti adipisci molestias, dolores culpa quo rerum esse recusandae corporis sit animi reiciendis.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa architecto animi quam itaque voluptas adipisci aspernatur ratione ipsum? Asperiores qui aliquam quod exercitationem ducimus! Doloribus non assumenda vel sit ducimus.

                    </div> */}
                </Content>
            </Layout>
        </Layout >
    );
};
export default HomePage2;