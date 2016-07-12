/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createStructuredSelector } from 'reselect';

import {
    selectRepos,
    selectLoading,
    selectError,
    selectScouts2,
} from 'containers/App/selectors';

import {
    selectUsername,
} from './selectors';

import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class WreathSaleCategory extends React.Component {
    render() {
        return (
            <div className={styles.table}>
                <table>
                    <tr><th>Product</th><th>Number Sold</th></tr>
                    {this.props.scout.get("sales").map(function (item) {return <tr><td>{item.get('type')}</td><td>{item.get('num')}</td></tr>})}
                </table>
            </div>
        )
    }
}

export class HomePage extends React.Component {
    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {
        if (this.props.username && this.props.username.trim().length > 0) {
            this.props.onSubmitForm();
        }
    }
    /**
     * Changes the route
     *
     * @param  {string} route The route we want to go to
     */
    openRoute = (route) => {
        this.props.changeRoute(route);
    };

    /**
     * Changed route to '/features'
     */
    openFeaturesPage = () => {
        this.openRoute('/features');
    };

    render() {
        let mainContent = null;

        // Show a loading indicator when we're loading
        if (this.props.loading) {
            mainContent = (<List component={LoadingIndicator} />);

            // Show an error if there is one
            // If we're not loading, show scout info
        } else {
            mainContent = (<div>asdas</div>);
        }


        var str = this.props.username.replace(/\s+/g, '');
        switch(this.props.scouts2.get(str)){
            case undefined:
                str = 'default';
                break;
            default:
                break;
        }

        return (
            <article>
                <div>
                    <section className={`${styles.textSection} ${styles.centered}`}>
                        <H2>Troop 125 Wreath Manager</H2>
                    </section>
                    <section className={styles.textSection}>
                        <H2>Scout Viewer</H2>
                        <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
                            <label htmlFor="username">Show wreath sales by
                                <span className={styles.atPrefix}>@</span>
                                <input
                                    id="username"
                                    className={styles.input}
                                    type="text"
                                    placeholder="A Scout..."
                                    value={this.props.username}
                                    onChange={this.props.onChangeUsername}
                                />
                            </label>
                        </form>
                        <div><WreathSaleCategory scout={this.props.scouts2.get(str)}></WreathSaleCategory></div>
                    </section>
                </div>
            </article>
        );
    }
}

HomePage.propTypes = {
    changeRoute: React.PropTypes.func,
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool,
    ]),
    repos: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.bool,
    ]),
    scouts2: React.PropTypes.object,
    onSubmitForm: React.PropTypes.func,
    username: React.PropTypes.string,
    onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        changeRoute: (url) => dispatch(push(url)),
        onSubmitForm: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadRepos());
        },

        dispatch,
    };
}

const mapStateToProps = createStructuredSelector({
    repos: selectRepos(),
    username: selectUsername(),
    loading: selectLoading(),
    scouts2: selectScouts2(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
