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
    selectNewScout,
} from 'containers/App/selectors';

import {
    selectUsername,
} from './selectors';

import {
    changeUsername
} from './actions';

import { loadRepos } from '../App/actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

var types = ["Small Undecorated", "Small Decorated", "Medium Undecorated", "Medium Decorated", "Large"];

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

export class NewUsernameField extends React.Component {
    render () {
        return (
            <div>
                <form className={styles.usernameForm}>
                    <label htmlFor="New scout name: ">
                        <input
                            id="new_scout_form"
                            className={styles.input}
                            type="text"
                            placeholder="A new scout..."
                            value={this.props.new_scout.name}
                            onChange={this.props.onAddUsername}
                        />
                    </label>
                </form>
            </div>
        )
    }
}

export class SubmitButton extends React.Component {
    render() {
        return (
            <div>
                <form className={styles.sbuttonForm}>
                    <input
                        id="submit_button"
                        className={styles.sbutton}
                        type="button"
                        value="Submit new scout"
                        onClick={this.props.onSubmitButton}
                    />
                </form>
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
                                <span className={styles.atPrefix}></span>
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
                    <section>
                        <br/><br/>
                        <NewUsernameField new_scout={this.props.new_scout} onAddUsername={this.props.onAddUsername}></NewUsernameField>
                        <br/>
                        <SubmitButton onSubmitButton={this.props.onSubmitButton}></SubmitButton>
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
    new_scout: React.PropTypes.object,
    onSubmitForm: React.PropTypes.func,
    username: React.PropTypes.string,
    onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        changeRoute: (url) => dispatch(push(url)),
        onAddUsername: (evt) => dispatch(changeNewUsername(evt.target.value)),
        onSubmitButton: (evt) => dispatch(submitButton()),
        onSubmitForm: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        },

        dispatch,
    };
}

const mapStateToProps = createStructuredSelector({
    repos: selectRepos(),
    username: selectUsername(),
    loading: selectLoading(),
    scouts2: selectScouts2(),
    new_scout: selectNewScout(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
