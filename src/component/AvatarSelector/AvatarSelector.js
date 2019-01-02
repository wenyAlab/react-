import React from 'react';
import { Grid, WhiteSpace, List} from 'antd-mobile';
import PropsTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { avatarSelector } from '../../redux/user.redux';

const imgArr = ['girl', 'man', 'pic', 'red', 'green', 'sunke'];
const data = imgArr.map((_val, i) => ({
    icon: require(`./img/${_val}.jpg`),
    text: `${_val}`,
  }));

class AvatarSelector extends React.Component{
    static propsTypes = {
        avatarSelectFn: PropsTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.state={
            // avatarImg: '',
        }
    }
    render() {
        const  avatarHeader = this.state.e ?
                <div>
                    <span>已选头像：<img width={16} src={this.state.e.icon}/></span>
                </div>
                : '请选择头像'
        return (
            <React.Fragment>
                <List renderHeader={() => avatarHeader}>
                <Grid
                    data={data}
                    activeStyle={false}
                    onClick={(e, i) => {
                        this.setState({
                            e,
                        })
                        this.props.avatarSelectFn(e.text)
                    }}
                 />
                </List>
                <WhiteSpace/>
            </React.Fragment>

        )
    }
}
// const mapStateToProps = (state) => ({

// })
// const mapDispatchToProps = (dispatch) => ({
//     avatarSelectFn(text) {
//         dispatch(avatarSelector(text))
//     }
// })
export default AvatarSelector;